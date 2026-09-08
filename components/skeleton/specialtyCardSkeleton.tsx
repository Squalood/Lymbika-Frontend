import { Skeleton } from "@/components/ui/skeleton";
import { REVEAL_ESPECIALIDADES, getItemClass, getButtonClass } from "@/lib/gridReveal";

const MAX_VISIBLES = REVEAL_ESPECIALIDADES[REVEAL_ESPECIALIDADES.length - 1].visibles;

/** Calca el markup de SpecialtyCard: circulo w-12, texto y chevron dentro de p-3. */
export const SpecialtyCardSkeleton = () => (
  <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
    <Skeleton className="w-12 h-12 shrink-0 rounded-full" />
    <Skeleton className="flex-1 h-4" />
    <Skeleton className="w-4 h-4 shrink-0 rounded-sm" />
  </div>
);

type Props = {
  /** Cuantas tarjetas se esperan del fetch. Es una estimacion del contenido
   *  actual; solo decide cuantos huecos pintar mientras carga. */
  total: number;
};

/**
 * Grid de especialidades. Reparte los huecos con las mismas clases de reveal
 * que el grid real, para que el conteo coincida por breakpoint y no se colapsen
 * filas al cargar. El boton solo se reserva donde el grid real lo mostraria.
 */
const SpecialtiesGridSkeleton = ({ total }: Props) => {
  const buttonClass = getButtonClass(REVEAL_ESPECIALIDADES, total);

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3 px-4">
        {Array.from({ length: Math.min(total, MAX_VISIBLES) }).map((_, idx) => (
          <div key={idx} className={getItemClass(REVEAL_ESPECIALIDADES, idx)}>
            <SpecialtyCardSkeleton />
          </div>
        ))}
      </div>
      {buttonClass && (
        <div className={`mt-4 px-4 ${buttonClass}`}>
          {/* ShowMoreButton usa Button size="sm" -> h-9 */}
          <Skeleton className="h-9 w-36 rounded-md" />
        </div>
      )}
    </>
  );
};

export default SpecialtiesGridSkeleton;
