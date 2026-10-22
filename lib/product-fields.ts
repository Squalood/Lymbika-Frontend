/**
 * Campos mínimos para pintar una tarjeta de producto (ProductCard) y para que
 * ese objeto siga sirviendo en el carrito y en favoritos.
 *
 * Una lista con `populate=*` arrastra `descriptionPro` (rich text), reseñas,
 * lotes de inventario, stock por farmacia y los metadatos completos de cada
 * imagen. En la categoría más grande eso eran 395 KB y 5,8 s; con estos campos
 * baja a 114 KB y 1,9 s.
 *
 * Esta lista es la única fuente de verdad: si una vista necesita un campo más,
 * añádelo aquí o pásalo en `extra`, pero no vuelvas a `populate=*`.
 *
 * La ficha individual (`/product/[slug]`) sí usa `populate=*` a propósito:
 * necesita el objeto completo y es un solo registro de 1,4 KB.
 */
const ESCALARES = [
  "productName",
  "slug",
  "sal",
  "price",
  "priceMember",
  "conReceta",
] as const;

const RELACIONES = [
  "populate[images][fields][0]=url",
  "populate[category][fields][0]=categoryName",
  "populate[category][fields][1]=slug",
];

/**
 * Devuelve el fragmento de query con los campos de tarjeta.
 *
 * @param extra Campos escalares adicionales que necesite la vista (p. ej.
 *   `tipo` para el filtro de la página de categoría). Los índices de `fields[]`
 *   se renumeran para que queden contiguos.
 */
export function camposDeProducto(extra: readonly string[] = []): string {
  const campos = [...ESCALARES, ...extra];
  return [...campos.map((campo, i) => `fields[${i}]=${campo}`), ...RELACIONES].join("&");
}
