/**
 * Campos que consumen el listado de clínicas, los menús del navbar y el
 * buscador. Las vistas de detalle de una clínica NO usan esta lista: piden por
 * slug con sus propios `populate`.
 *
 * `populate=*` sobre las clínicas devuelve 2,8 MB sin comprimir, porque arrastra
 * servicios, características, testimonios, el doctor con su rich text, galería,
 * videos y `pageTexts` entero. Eso supera el límite de 2 MB del Data Cache de
 * Next, así que un `revalidate` sobre esa consulta no cachea nada y se repite en
 * cada render. Con estos campos son 1,8 KB y sí entra en caché.
 */
export const CAMPOS_CLINICA = [
  "fields[0]=title",
  "fields[1]=slug",
  "fields[2]=icon",
  "fields[3]=featuredClinic",
  "fields[4]=heroSubtitle",
  "populate[heroImage][fields][0]=url",
].join("&");
