import { RichTextChild, ListItemNode, RichTextNode } from "@/types/rich-text";

/**
 * Convierte el rich text de Strapi (campo `blocks`) en texto plano.
 *
 * Hace falta donde el formato no cabe: el `<meta name="description">` y los
 * datos estructurados de la ficha de producto. Para pintarlo en pantalla usa
 * `components/rich-text-renderer.tsx`, que sí respeta negritas, listas y
 * encabezados; esta función recorre la misma estructura y se queda solo con el
 * texto.
 */
export function textoPlano(nodos: RichTextNode[] | undefined | null): string {
  if (!Array.isArray(nodos)) return "";

  const deHijo = (hijo: RichTextChild | ListItemNode): string => {
    // Los items de lista anidan otra capa de hijos; el resto ya trae `text`.
    if ("children" in hijo && Array.isArray(hijo.children)) {
      return hijo.children.map(deHijo).join("");
    }
    return (hijo as RichTextChild).text ?? "";
  };

  return nodos
    .map((nodo) => nodo.children?.map(deHijo).join("") ?? "")
    .map((linea) => linea.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Texto plano recortado para un `<meta description>`. Google muestra unos
 * 155-160 caracteres; se corta en el último espacio para no partir palabras.
 */
export function resumen(nodos: RichTextNode[] | undefined | null, limite = 155): string {
  const texto = textoPlano(nodos);
  if (texto.length <= limite) return texto;

  const recorte = texto.slice(0, limite);
  const ultimoEspacio = recorte.lastIndexOf(" ");
  return (ultimoEspacio > 0 ? recorte.slice(0, ultimoEspacio) : recorte).trimEnd() + "…";
}
