import { RichTextNode } from "@/types/rich-text";
import { ReviewType } from "@/types/review";

export type ProductType = {
  id: number;
  productName: string;
  slug: string;
  descriptionPro: RichTextNode[];
  active: boolean;
  price: number;
  tipo: string;
  isFeatured: boolean;
  conReceta: boolean;
  images: {
    id: number;
    url: string;
  }[];
  category: {
    id: number;
    categoryName: string;
    slug: string;
  };
  priceMember: number;
  sal: string;
  clinics: {
    id: number;
    title: string;
    slug: string;
  };
  videos: {
    id: number;
    videoID: string;
  }[];
  reviews?: ReviewType[];
} & Partial<FichaClinica>;

// ── Ficha clínica ────────────────────────────────────────────────────────────
// Campos de Strapi descritos en Lymbika-Backend/docs/ficha-clinica-productos.md.
// Solo los trae la ficha de producto (`getProduct`); las tarjetas y listas no,
// por eso van como opcionales en ProductType.

export type EstadoFicha = "pendiente" | "revisada";
export type SeguridadEmbarazo = "compatible" | "precaucion" | "contraindicado" | "sinDatos";

export type PrincipioActivoType = {
  id: number;
  nombre: string;
  sinonimos: string | null;
  codigoAtc: string | null;
  embarazo: SeguridadEmbarazo | null;
  lactancia: SeguridadEmbarazo | null;
  causaSomnolencia: boolean | null;
  esAntibiotico: boolean | null;
  contraindicaciones: string | null;
  advertencias: string | null;
  interacciones: string | null;
  efectosAdversos: string | null;
  estadoFicha: EstadoFicha | null;
};

export type ComposicionType = {
  id: number;
  cantidad: number | null;
  unidad: string | null;
  porCantidad: number | null;
  porUnidad: string | null;
  principioActivo: PrincipioActivoType | null;
};

export type IndicacionType = {
  id: number;
  nombre: string;
  slug: string | null;
};

export type FichaClinica = {
  tipoProducto: string | null;
  composicion: ComposicionType[];
  formaFarmaceutica: string | null;
  viaAdministracion: string | null;
  contenidoCantidad: number | null;
  contenidoUnidad: string | null;
  fraccion: string | null;
  edadMinimaMeses: number | null;
  indicaciones: IndicacionType[];
  posologia: string | null;
  advertenciasAdicionales: string | null;
  registroSanitario: string | null;
  prospecto: { id: number; url: string; name: string } | null;
  requiereRefrigeracion: boolean | null;
  sinAzucar: boolean | null;
  estadoFicha: EstadoFicha | null;
};
