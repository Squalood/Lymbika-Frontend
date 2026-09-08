import { Skeleton } from "@/components/ui/skeleton";
import { MedicalServiceCardsGridSkeleton } from "./medicalServiceCardSkeleton";
import { REVEAL_SERVICIOS, getButtonClass } from "@/lib/gridReveal";

/** Servicios esperados por grupo de TYPE_ORDER (consultas, procedimientos,
 *  estudios). Estimacion del contenido actual: solo decide cuantos huecos
 *  pintar mientras carga. */
const DEFAULT_ITEM_COUNTS = [8, 8, 1];

/**
 * Imita el catalogo agrupado por tipo: cada bloque lleva su encabezado, su grid
 * y el hueco del boton de expandir. Los encabezados van como barras y no con los
 * TYPE_LABELS reales porque no sabemos que tipos traera la respuesta.
 */
const MedicalServicesCatalogSkeleton = ({
  itemCounts = DEFAULT_ITEM_COUNTS,
}: {
  itemCounts?: number[];
}) => (
  <>
    {itemCounts.map((count, idx) => {
      const buttonClass = getButtonClass(REVEAL_SERVICIOS, count);

      return (
        <section key={idx}>
          {/* h4 real: px-6 pb-4 text-xl -> line-height 28px */}
          <div className="px-6 pb-4">
            <Skeleton className="h-7 w-40" />
          </div>
          <MedicalServiceCardsGridSkeleton total={count} />
          {buttonClass && (
            <div className={`mt-4 px-4 ${buttonClass}`}>
              <Skeleton className="h-9 w-36 rounded-md" />
            </div>
          )}
        </section>
      );
    })}
  </>
);

export default MedicalServicesCatalogSkeleton;
