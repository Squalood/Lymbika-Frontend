import type { ReactNode } from "react";
import { FileText, Info, Moon, Snowflake, ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatPrice } from "@/lib/format-price";
import { imgUrl } from "@/lib/media";
import { cn } from "@/lib/utils";
import {
  SEGURIDAD,
  etiquetaForma,
  etiquetaVia,
  fichaRevisada,
  peorCaso,
  precioPorUnidad,
  principiosDe,
  renglonComposicion,
  somnolencia,
  textoContenido,
  textoEdadMinima,
  textosPorSustancia,
  tieneFicha,
} from "@/lib/ficha-clinica";
import type { ProductType, SeguridadEmbarazo } from "@/types/product";

/**
 * Ficha clínica del producto: para qué sirve, composición, presentación,
 * precauciones y el detalle por sustancia. Server component: todo llega en el
 * producto (ver POPULATE_FICHA en lib/strapi/products.ts).
 *
 * Se muestra también cuando la ficha está pendiente de revisión (decisión de
 * Adrian, nov-2026), con un aviso distinto: muchas fichas las propuso la IA y
 * las está revisando el equipo farmacéutico.
 */
export default function FichaClinica({ product }: { product: ProductType }) {
  if (!tieneFicha(product)) return null;

  const principios = principiosDe(product);
  const revisada = fichaRevisada(product);
  const composicion = (product.composicion ?? []).map(renglonComposicion).filter(Boolean) as string[];
  const forma = [etiquetaForma(product.formaFarmaceutica), etiquetaVia(product.viaAdministracion)].filter(Boolean).join(" · ");
  const contenido = textoContenido(product);
  const unidad = precioPorUnidad(product);
  const edad = textoEdadMinima(product.edadMinimaMeses);
  const embarazo = principios.length ? peorCaso(principios.map((p) => p.embarazo)) : null;
  const lactancia = principios.length ? peorCaso(principios.map((p) => p.lactancia)) : null;
  const sueno = somnolencia(principios);
  const antibiotico = principios.some((p) => p.esAntibiotico);
  // Sin tipo capturado se asume medicamento: ante la duda, el aviso completo.
  const esMedicamento = !product.tipoProducto || ["medicamento", "suplemento"].includes(product.tipoProducto);

  const datos: { etiqueta: string; valor: ReactNode }[] = [];
  if (composicion.length) datos.push({ etiqueta: "Composición", valor: composicion.join(" + ") });
  if (forma) datos.push({ etiqueta: "Presentación", valor: forma });
  if (contenido) {
    datos.push({
      etiqueta: "Contenido",
      valor: (
        <>
          {contenido}
          {unidad && (
            <span className="text-muted-foreground"> · {formatPrice(unidad.precio)} por {unidad.unidad}</span>
          )}
        </>
      ),
    });
  }
  if (edad) datos.push({ etiqueta: "Edad", valor: edad });
  if (product.registroSanitario) datos.push({ etiqueta: "Registro sanitario", valor: product.registroSanitario });

  const secciones = [
    { id: "posologia", titulo: "Cómo se usa", textos: product.posologia ? [{ nombre: null, texto: product.posologia }] : [] },
    { id: "contraindicaciones", titulo: "Contraindicaciones", textos: textosPorSustancia(principios, "contraindicaciones") },
    {
      id: "advertencias",
      titulo: "Advertencias",
      textos: [
        ...textosPorSustancia(principios, "advertencias"),
        ...(product.advertenciasAdicionales ? [{ nombre: null, texto: product.advertenciasAdicionales }] : []),
      ],
    },
    { id: "interacciones", titulo: "Interacciones con otros medicamentos", textos: textosPorSustancia(principios, "interacciones") },
    { id: "efectos", titulo: "Efectos secundarios", textos: textosPorSustancia(principios, "efectosAdversos") },
  ].filter((s) => s.textos.length);

  return (
    <section className="px-6 sm:px-0 mt-10" aria-labelledby="ficha-titulo">
      <h2 id="ficha-titulo" className="text-xl font-semibold mb-4">Información del producto</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          {!!product.indicaciones?.length && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Para qué sirve</p>
              <div className="flex flex-wrap gap-2">
                {product.indicaciones.map((i) => (
                  <span key={i.id} className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                    {i.nombre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {datos.length > 0 && (
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              {datos.map((d) => (
                <div key={d.etiqueta} className="contents">
                  <dt className="text-muted-foreground">{d.etiqueta}</dt>
                  <dd>{d.valor}</dd>
                </div>
              ))}
            </dl>
          )}

          {(product.sinAzucar || product.requiereRefrigeracion) && (
            <div className="flex flex-wrap gap-2 text-xs">
              {product.sinAzucar && <span className="px-2 py-1 rounded-full border">Sin azúcar</span>}
              {product.requiereRefrigeracion && (
                <span className="flex items-center gap-1 px-2 py-1 rounded-full border border-sky-200 text-sky-700 bg-sky-50">
                  <Snowflake size={12} /> Requiere refrigeración
                </span>
              )}
            </div>
          )}
        </div>

        {(embarazo || lactancia || sueno !== null || antibiotico) && (
          <div className="rounded-xl border p-4 space-y-3 text-sm h-fit">
            <p className="font-medium">Precauciones</p>
            {embarazo && <Seguridad etiqueta="Embarazo" valor={embarazo} />}
            {lactancia && <Seguridad etiqueta="Lactancia" valor={lactancia} />}
            {sueno !== null && (
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5 text-muted-foreground"><Moon size={14} /> Somnolencia</span>
                <span className={cn(sueno ? "text-orange-600" : "text-green-700")}>
                  {sueno ? "Puede causar sueño" : "No suele causar sueño"}
                </span>
              </div>
            )}
            {antibiotico && (
              <p className="text-xs text-muted-foreground border-t pt-3">
                Es un antibiótico: la farmacia retiene la receta médica. Úsalo solo con indicación médica y completa el tratamiento.
              </p>
            )}
          </div>
        )}
      </div>

      {secciones.length > 0 && (
        <Accordion type="multiple" className="mt-6 border-t">
          {secciones.map((s) => (
            <AccordionItem key={s.id} value={s.id}>
              <AccordionTrigger className="text-base">{s.titulo}</AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm leading-relaxed">
                {s.textos.map((t, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {t.nombre && <span className="font-medium">{t.nombre}: </span>}
                    {t.texto}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {product.prospecto?.url && (
        <a
          href={imgUrl(product.prospecto.url)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
        >
          <FileText size={16} /> Ver instructivo (PDF)
        </a>
      )}

      <div
        className={cn(
          "flex gap-2 mt-6 rounded-lg px-4 py-3 text-xs",
          revisada ? "bg-green-50 text-green-800" : "bg-slate-50 text-slate-600"
        )}
      >
        {revisada ? <ShieldCheck size={16} className="shrink-0" /> : <Info size={16} className="shrink-0" />}
        <p>
          {revisada
            ? "Ficha revisada por nuestro equipo farmacéutico. "
            : "Ficha en revisión por nuestro equipo farmacéutico: puede contener imprecisiones. "}
          {/* El aviso médico completo solo donde aplica: en un condón o una crema
              "si es para un niño, pregunta a tu médico" sobra. */}
          {esMedicamento
            ? "Esta información es de referencia y no sustituye la consulta médica. Lee el instructivo del producto y pregunta a tu médico o farmacéutico antes de usarlo, sobre todo si estás embarazada, lactando, tomas otros medicamentos o es para un niño."
            : "Esta información es de referencia; consulta el empaque del producto."}
        </p>
      </div>
    </section>
  );
}

function Seguridad({ etiqueta, valor }: { etiqueta: string; valor: SeguridadEmbarazo }) {
  const { texto, tono } = SEGURIDAD[valor];
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{etiqueta}</span>
      <span
        className={cn(
          tono === "ok" && "text-green-700",
          tono === "aviso" && "text-orange-600",
          tono === "alto" && "text-red-600 font-medium",
          tono === "neutro" && "text-muted-foreground"
        )}
      >
        {texto}
      </span>
    </div>
  );
}
