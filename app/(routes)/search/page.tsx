"use client";
import { useSearchParams } from "next/navigation";
import { useGetProducts } from "@/api/getProducts";
import { useGetDoctors } from "@/api/getDoctor";
import { useGetServices } from "@/api/getService";
import { useGetSugery } from "@/api/getSugery";
import { useGetCategories } from "@/api/getCategories";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/productCard";

export default function SearchResultsPage() {
  const { products, loading: loadingProducts } = useGetProducts();
  const { doctors, loading: loadingDoctors } = useGetDoctors();
  const { result: services } = useGetServices();
  const { result: surgeries } = useGetSugery();
  const { result: categories } = useGetCategories();

  const searchParams = useSearchParams();
  const query = searchParams
    .get("query")
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") || "";

  const normalize = (text?: string) =>
    (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filterByQuery = (name?: string, sal?: string) =>
    normalize(name).includes(query) || normalize(sal).includes(query);

  const filteredProducts = products.filter((p) =>
    filterByQuery(p.productName, p.sal)
  );

  const filteredDoctors = doctors.filter((d) =>
    filterByQuery(d.doctorName, d.location)
  );
  const filteredServices = services.filter((s) => filterByQuery(s.serviceName));
  const filteredSurgeries = surgeries.filter((s) =>
    filterByQuery(s.surgeryName)
  );
  const filteredCategories = categories.filter((c) =>
    filterByQuery(c.categoryName)
  );

  const isLoading = loadingProducts || loadingDoctors;

  if (isLoading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">
        Resultados para: &quot;
        <span className="text-blue-600">{query}</span>&quot;
      </h1>

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

      {/* Servicios */}
      <ResultSection
        title="Servicios"
        items={filteredServices}
        basePath="service"
        nameKey="serviceName"
        imageKey="image"
      />

      {/* Cirugías */}
      <ResultSection
        title="Cirugías"
        items={filteredSurgeries}
        basePath="surgery"
        nameKey="surgeryName"
        imageKey="image"
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
  imageKey: keyof T;
  subtitleKey?: keyof T;
  useProductCard?: boolean; // ✅ nueva prop
};

function ResultSection<T extends BaseItem>({
  title,
  items,
  basePath,
  nameKey,
  imageKey,
  subtitleKey,
  useProductCard,
}: ResultSectionProps<T>) {
  if (!items || items.length === 0) {
    return (
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p>No se encontraron {title.toLowerCase()}.</p>
      </section>
    );
  }

  const limitedItems = items.slice(0, 8);
  const isLimited = items.length > 8;

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
          if (useProductCard) {
            // ✅ Usa el componente personalizado para productos
            return (
              <ProductCard
                key={item.id}
                product={item as any} // cast ya que sabemos que es ProductType
              />
            );
          }

          // 👉 Diseño sencillo para los demás resultados
          const name = item[nameKey] as unknown as string;
          const imageData = item[imageKey] as
            | { url: string }
            | { url: string }[]
            | undefined;
          const subtitle = subtitleKey
            ? (item[subtitleKey] as unknown as string)
            : null;

          const imageUrl = Array.isArray(imageData)
            ? imageData?.[0]?.url || "/placeholder.png"
            : imageData?.url || "/placeholder.png";

          return (
            <Link key={item.id} href={`/${basePath}/${item.slug}`}>
              <div className="border rounded-md overflow-hidden hover:shadow-md transition">
                <Image
                  src={imageUrl}
                  alt={name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover"
                />
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