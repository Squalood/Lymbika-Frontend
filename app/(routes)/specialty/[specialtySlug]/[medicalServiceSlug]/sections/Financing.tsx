import { CreditCard } from "lucide-react";
import { MedicalServiceType } from "@/types/medicalService";
import { WhatsAppCtaButton } from "@/components/whatsapp-cta-button";
import { getPackageItems } from "@/lib/packageItems";
import {
  COMISION_TERMINAL,
  FINANCIAMIENTO_MIN_PRICE,
  MAX_MESES,
  SOBRETASAS_TEXTO,
  planesFinanciamiento,
} from "@/lib/financiamiento";
import { formatPrice } from "@/lib/formatPrice";
import { getWhatsAppUrl } from "@/lib/medicalServiceTypes";
import { useSiteConfig } from "@/components/site-config-provider";

export default function Financing({ service }: { service: MedicalServiceType }) {
  const { whatsappNumber } = useSiteConfig();
  const hero = service.landingHero;
  const serviceRates = service.service_rates ?? [];
  const packageRates = serviceRates.filter((r) => getPackageItems(r).length > 0);
  const source = packageRates.length > 0 ? packageRates : serviceRates;
  // Se toma el precio más bajo para que el encabezado "Desde $X/mes" sea verdadero
  // cuando hay varios paquetes con precios distintos.
  const prices = source.map((r) => r.price).filter((v) => v > 0);
  const price = prices.length > 0 ? Math.min(...prices) : 0;

  // Solo procedimientos con precio suficiente. Consultas y estudios no muestran financiamiento.
  if (service.type !== "procedure" || price < FINANCIAMIENTO_MIN_PRICE) return null;

  const rows = planesFinanciamiento(price);
  const cheapest = rows.reduce((min, r) => (r.monthly < min.monthly ? r : min), rows[0]);

  return (
    <section id="financiamiento" className="w-full py-4 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      <div className="space-y-3 text-center">
        <span className="text-xs font-bold tracking-widest uppercase text-primary">
          Financiamiento
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
          Págalo a plazos con tu tarjeta
        </h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Difiere tu procedimiento hasta en {MAX_MESES} meses con tu tarjeta de crédito.
          Sin trámites de buró: se procesa en tu valoración.
        </p>
      </div>

      <div className="rounded-2xl border overflow-hidden max-w-3xl mx-auto">
        <div className="bg-[#0b1630] px-6 py-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base">Desde {formatPrice(cheapest.monthly, 0)}/mes</h3>
            <p className="text-white/60 text-sm">a {cheapest.meses} meses</p>
          </div>
        </div>

        {/* Contado: no pasa por terminal, asi que no lleva sobretasa. */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 bg-green-50 border-b border-green-100">
          <span className="text-sm font-semibold text-green-800">
            Contado, transferencia o débito
          </span>
          <span className="text-lg font-bold text-green-800 shrink-0">{formatPrice(price, 0)}</span>
        </div>

        {/* Tabla real: con grids separados por fila las columnas auto se
            dimensionan por su propio contenido y no coinciden con el encabezado. */}
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/30">
              <th scope="col" className="w-full pl-6 pr-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Plazo
              </th>
              <th scope="col" className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                Total
              </th>
              <th scope="col" className="pl-3 pr-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                Mensualidad
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y">
            {rows.map((r) => {
              const destacado = r.meses === cheapest.meses;
              return (
                <tr key={r.meses} className={destacado ? "bg-primary/5" : ""}>
                  <th scope="row" className={`w-full pl-6 pr-3 py-4 text-left text-sm font-semibold ${destacado ? "text-primary" : "text-foreground"}`}>
                    {r.meses} meses
                  </th>
                  <td className="px-3 py-4 text-right text-sm text-muted-foreground tabular-nums whitespace-nowrap">
                    {formatPrice(r.total, 0)}
                  </td>
                  <td className={`pl-3 pr-6 py-4 text-right text-base font-bold tabular-nums whitespace-nowrap ${destacado ? "text-primary" : "text-foreground"}`}>
                    {formatPrice(r.monthly, 0)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="px-6 py-4 bg-muted/40 space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Pagando de contado, por transferencia o con tarjeta de débito el precio es
            {formatPrice(price, 0)} MXN sin cargo adicional. Los pagos a plazos con tarjeta de
            crédito incluyen la sobretasa del banco ({SOBRETASAS_TEXTO}), más
            {" "}{(COMISION_TERMINAL * 100).toFixed(0)}% de terminal y el IVA correspondiente.
            Sujeto a aprobación de tu banco. Montos ilustrativos sobre {formatPrice(price, 0)} MXN;
            el monto final se confirma en tu valoración.
          </p>
          <WhatsAppCtaButton
            url={getWhatsAppUrl(whatsappNumber, {
              type: service.type,
              name: service.name,
              priceDisplay: hero?.price_display,
            })}
            label="Quiero financiar mi procedimiento"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
