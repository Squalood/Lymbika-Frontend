"use client";
import { useSearchParams } from "next/navigation";
import { useGetProducts } from "@/api/getProducts";
import { useGetDoctors } from "@/api/getDoctor";
import { useGetServices } from "@/api/getService";
import { useGetSugery } from "@/api/getSugery";
import { useGetCategories } from "@/api/getCategories";
import Image from "next/image";
import Link from "next/link";

export default function SearchResultsPage() {
  const { products, loading: loadingProducts } = useGetProducts();
  const { doctors, loading: loadingDoctors } = useGetDoctors();
  const { result: services } = useGetServices();
  const { result: surgeries } = useGetSugery();
  const { result: categories } = useGetCategories();

  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";

  const filterByQuery = (text: string) =>
    text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(query);

  const filteredProducts = products.filter((p) => filterByQuery(p.productName));
  const filteredDoctors = doctors.filter((d) => filterByQuery(d.doctorName));
  const filteredServices = services.filter((s) => filterByQuery(s.serviceName));
  const filteredSurgeries = surgeries.filter((s) => filterByQuery(s.surgeryName));
  const filteredCategories = categories.filter((c) => filterByQuery(c.categoryName));

  const isLoading = loadingProducts || loadingDoctors;

  if (isLoading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">
        Resultados para: &quot;<span className="text-blue-600">{query}</span>&quot;
      </h1>

      {/* Productos */}
      <ResultSection title="Productos" items={filteredProducts} basePath="product" nameKey="productName" imageKey="images" />

      {/* Doctores */}
      <ResultSection title="Doctores" items={filteredDoctors} basePath="doctor" nameKey="doctorName" imageKey="image" subtitleKey="location" />

      {/* Servicios */}
      <ResultSection title="Servicios" items={filteredServices} basePath="service" nameKey="serviceName" imageKey="image" />

      {/* Cirugías */}
      <ResultSection title="Cirugías" items={filteredSurgeries} basePath="surgery" nameKey="surgeryName" imageKey="image" />

      {/* Categorías */}
      <ResultSection title="Categorías" items={filteredCategories} basePath="category" nameKey="categoryName" imageKey="mainImage" />
    </div>
  );
}

type ResultSectionProps = {
  title: string;
  items: any[];
  basePath: string;
  nameKey: string;
  imageKey: string;
  subtitleKey?: string;
};

function ResultSection({ title, items, basePath, nameKey, imageKey, subtitleKey }: ResultSectionProps) {
  if (!items || items.length === 0) return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p>No se encontraron {title.toLowerCase()}.</p>
    </section>
  );

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <Link key={item.id} href={`/${basePath}/${item.slug}`}>
            <div className="border rounded-md overflow-hidden hover:shadow-md transition">
              <Image
                src={Array.isArray(item[imageKey]) ? item[imageKey]?.[0]?.url || "/placeholder.png" : item[imageKey]?.url || "/placeholder.png"}
                alt={item[nameKey]}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-medium">{item[nameKey]}</h2>
                {subtitleKey && item[subtitleKey] && (
                  <p className="text-sm text-gray-500">{item[subtitleKey]}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
