import { MedicalServiceType, MedicalServiceCatalogItem } from "@/types/medical-service";
import { getPackageItems } from "@/lib/package-items";

export type TarifaDeCatalogo = Parameters<typeof getPackageItems>[0] & {
  price: number;
  medical_service: MedicalServiceType | null;
};

/**
 * Agrupa tarifas (service-rates) por servicio médico y se queda con la más
 * barata de cada uno, con sus conceptos de paquete. La usan el catálogo de una
 * especialidad (servidor) y el catálogo general (cliente).
 *
 * Las tarifas de servicios sin publicar llegan con medical_service null y se
 * omiten. `especialidad` filtra además por el slug de la especialidad.
 */
export function agruparCatalogo(
  tarifas: TarifaDeCatalogo[],
  especialidad?: string
): MedicalServiceCatalogItem[] {
  const map = new Map<string, MedicalServiceCatalogItem>();
  for (const tarifa of tarifas) {
    const ms = tarifa.medical_service;
    if (!ms?.slug) continue;
    if (especialidad && ms.specialty?.slug !== especialidad) continue;
    // `items` primero, `package_items` como respaldo. Ver lib/package-items.
    const conceptos = getPackageItems(tarifa);
    const packageItems = conceptos.length > 0 ? conceptos : null;

    const existente = map.get(ms.slug);
    if (!existente) {
      map.set(ms.slug, { service: ms, minPrice: tarifa.price, packageItems });
    } else if (tarifa.price < existente.minPrice) {
      existente.minPrice = tarifa.price;
      existente.packageItems = packageItems;
    }
  }
  return Array.from(map.values());
}
