"use client";
import { useSearchParams } from "next/navigation";
import { useGetProducts } from "@/api/getProducts";
import { useGetDoctors } from "@/api/getDoctor";
import { useGetServices } from "@/api/getService";
import { useGetCategories } from "@/api/getCategories";
import { useGetAllMedicalServices } from "@/api/useGetAllMedicalServices";
import { useGetClinics } from "@/api/useGetClinics";
import Image from "next/image";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Stethoscope, Hospital } from "lucide-react";
import ProductCard from "@/components/productCard";
import { ProductType } from "@/types/product";
import { MedicalServiceType } from "@/types/medicalService";

const MEDICAL_SERVICE_TYPE_LABELS: Record<MedicalServiceType["type"], string> = {
  consultation: "Consulta",
  procedure: "Procedimiento",
  study: "Estudio",
};

export default function SearchResultsPage() {
  const { products, loading: loadingProducts } = useGetProducts();
  const { doctors, loading: loadingDoctors } = useGetDoctors();
  const { result: services } = useGetServices();
  const { result: categories } = useGetCategories();
  const { medicalServices } = useGetAllMedicalServices();
  const { clinics } = useGetClinics();

  const searchParams = useSearchParams();
  const query = searchParams
    .get("query")
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") || "";

  const normalize = (text?: string) =>
    (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");

  const filterByQuery = (name?: string, sal?: string) =>
    normalize(name).includes(query) || normalize(sal).includes(query);

  const filteredProducts = products.filter((p) =>
    filterByQuery(p.productName, p.sal)
  );

  const filteredDoctors = doctors.filter((d) =>
    filterByQuery(d.doctorName, d.location)
  );
  const filteredServices = services.filter((s) => filterByQuery(s.serviceName));
  const filteredCategories = categories.filter((c) =>
    filterByQuery(c.categoryName)
  );
  const filteredMedicalServices = medicalServices.filter((m) =>
    filterByQuery(m.name)
  );
  const filteredClinics = clinics.filter((c) => filterByQuery(c.title));

  const isLoading = loadingProducts || loadingDoctors;

  const hasAnyResults =
    filteredProducts.length > 0 ||
    filteredDoctors.length > 0 ||
    filteredServices.length > 0 ||
    filteredMedicalServices.length > 0 ||
    filteredClinics.length > 0 ||
    filteredCategories.length > 0;

  if (isLoading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">
        Resultados para: &quot;
        <span className="text-blue-600">{query}</span>&quot;
      </h1>

      {!hasAnyResults && (
        <p className="text-gray-500">
          No se encontraron resultados para &quot;{query}&quot;.
        </p>
      )}

      {/* Productos */}
      <ResultSection
        title="Productos"
        items={filteredProducts}
        basePath="product"
        nameKey="productName"
        imageKey="images"
        subtitleKey="sal"
        useProductCard // ✅ propiedad especial
      />

      {/* Doctores */}
      <ResultSection
        title="Doctores"
        items={filteredDoctors}
        basePath="doctor"
        nameKey="doctorName"
        imageKey="image"
        subtitleKey="location"
      />

      {/* Atención Primaria y Especialidades Médicas */}
      <ResultSection
        title="Atención Primaria y Especialidades Médicas"
        items={filteredServices}
        basePath="service"
        nameKey="serviceName"
        imageKey="image"
      />

      {/* Servicios Médicos */}
      <ResultSection
        title="Servicios Médicos"
        items={filteredMedicalServices}
        basePath="specialty"
        nameKey="name"
        hrefBuilder={(item) =>
          item.specialty?.slug
            ? `/specialty/${item.specialty.slug}/${item.slug}`
            : `/specialty/${item.slug}`
        }
        renderVisual={() => (
          <div className="w-full h-full flex items-center justify-center bg-blue-50">
            <Stethoscope className="w-10 h-10 text-blue-400" />
          </div>
        )}
        renderSubtitle={(item) =>
          `Servicio médico${
            item.type ? ` · ${MEDICAL_SERVICE_TYPE_LABELS[item.type]}` : ""
          }`
        }
      />

      {/* Clínicas */}
      <ResultSection
        title="Clínicas"
        items={filteredClinics}
        basePath="clinics"
        nameKey="title"
        hrefBuilder={(item) => `/clinics/${item.slug}`}
        renderVisual={(item) => {
          const Icon =
            (LucideIcons[item.icon as keyof typeof LucideIcons] as React.ElementType) ||
            Hospital;
          return (
            <div className="w-full h-full flex items-center justify-center bg-blue-50">
              <Icon className="w-10 h-10 text-blue-400" />
            </div>
          );
        }}
        renderSubtitle={() => "Clínica Especializada"}
      />

      {/* Categorías */}
      <ResultSection
        title="Categorías"
        items={filteredCategories}
        basePath="category"
        nameKey="categoryName"
        imageKey="mainImage"
      />
    </div>
  );
}

type BaseItem = {
  id: string | number;
  slug: string;
};

type ResultSectionProps<T extends BaseItem> = {
  title: string;
  items: T[];
  basePath: string;
  nameKey: keyof T;
  imageKey?: keyof T;
  subtitleKey?: keyof T;
  useProductCard?: boolean; // ✅ nueva prop
  hrefBuilder?: (item: T) => string;
  renderVisual?: (item: T) => React.ReactNode;
  renderSubtitle?: (item: T) => React.ReactNode;
};

function ResultSection<T extends BaseItem>({
  title,
  items,
  basePath,
  nameKey,
  imageKey,
  subtitleKey,
  useProductCard,
  hrefBuilder,
  renderVisual,
  renderSubtitle,
}: ResultSectionProps<T>) {
  if (!items || items.length === 0) {
    return null;
  }

  const limitedItems = items.slice(0, 8);
  const isLimited = items.length > 8;

  function isProductType(item: unknown): item is ProductType {
  return (
    typeof item === "object" &&
    item !== null &&
    "productName" in item &&
    "price" in item
  );
}


  return (
    <section className="mb-10 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div
        className={`grid gap-6 ${
          useProductCard
            ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {limitedItems.map((item) => {
          if (useProductCard && isProductType(item)) {
            return <ProductCard key={item.id} product={item} />;
          }

          // 👉 Diseño sencillo para los demás resultados
          const name = item[nameKey] as unknown as string;
          const imageData = imageKey
            ? (item[imageKey] as unknown as
                | { url: string }
                | { url: string }[]
                | undefined)
            : undefined;
          const subtitle = renderSubtitle
            ? renderSubtitle(item)
            : subtitleKey
            ? (item[subtitleKey] as unknown as string)
            : null;

          const imageUrl = Array.isArray(imageData)
            ? imageData?.[0]?.url || "/placeholder.png"
            : imageData?.url || "/placeholder.png";

          const href = hrefBuilder ? hrefBuilder(item) : `/${basePath}/${item.slug}`;

          return (
            <Link key={item.id} href={href}>
              <div className="border rounded-md overflow-hidden hover:shadow-md transition">
                <div className="w-full h-48">
                  {renderVisual ? (
                    renderVisual(item)
                  ) : (
                    <Image
                      src={imageUrl}
                      alt={name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h2 className="font-medium">{name}</h2>
                  {subtitle && (
                    <p className="text-sm text-gray-500">{subtitle}</p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {isLimited && (
        <p className="text-sm text-gray-500 mt-2">
          Mostrando los primeros 8 resultados. Refina tu búsqueda para obtener
          resultados más precisos.
        </p>
      )}
    </section>
  );
}
