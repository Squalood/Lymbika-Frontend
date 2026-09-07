import { PackageItemType } from "@/types/medicalService";

/** Forma minima que necesita el helper: sirve para un service-rate tipado
 *  o para el objeto crudo que devuelve la API. */
type ConPaquete = {
  items?: PackageItemType[] | null;
  package_items?: string[] | null;
};

/**
 * Los conceptos del paquete se leen del componente repetible `items` (plus.plus).
 * `package_items` es el campo json anterior y queda solo como respaldo mientras
 * se migra el contenido en Strapi: al ser json no valida su forma, asi que se
 * filtra por tipo para que un valor no-string no reviente el render.
 *
 * Ojo: `items` es un componente, no un escalar. No llega en la respuesta sin
 * populate explicito, y su ausencia no da error. Cualquier query que use este
 * helper tiene que pedir `populate[...][items][fields][0]=text`.
 */
export function getPackageItems(rate: ConPaquete): string[] {
  const delComponente = (rate.items ?? [])
    .map((item) => item.text?.trim())
    .filter((text): text is string => !!text);

  if (delComponente.length > 0) return delComponente;

  return (rate.package_items ?? [])
    .filter((text): text is string => typeof text === "string" && text.trim().length > 0)
    .map((text) => text.trim());
}
