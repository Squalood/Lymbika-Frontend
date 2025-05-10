"use client";
import { useSearchParams } from "next/navigation";
import { useGetProducts } from "@/api/getProducts";
import { useGetDoctors } from "@/api/getDoctor";
import Image from "next/image";
import Link from "next/link";

export default function SearchResultsPage() {
  const { products, loading: loadingProducts } = useGetProducts();
  const { doctors, loading: loadingDoctors } = useGetDoctors();
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(query)
  );

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.doctorName.toLowerCase().includes(query)
  );

  const isLoading = loadingProducts || loadingDoctors;

  if (isLoading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">
        Resultados para: &quot;<span className="text-blue-600">{query}</span>&quot;
      </h1>

      {/* Productos */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Productos</h2>
        {filteredProducts.length === 0 ? (
          <p>No se encontraron productos.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`}>
                <div className="border rounded-md overflow-hidden hover:shadow-md transition">
                  <Image
                    src={product.images?.[0]?.url || "/placeholder.png"}
                    alt={product.productName}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="font-medium">{product.productName}</h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Doctores */}
      <section>
        <h2 className="text-xl font-bold mb-4">Doctores</h2>
        {filteredDoctors.length === 0 ? (
          <p>No se encontraron doctores.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredDoctors.map((doctor) => (
              <Link key={doctor.id} href={`/doctor/${doctor.slug}`}>
                <div className="border rounded-md overflow-hidden hover:shadow-md transition">
                  <Image
                    src={doctor.image?.[0]?.url || "/placeholder.png"}
                    alt={doctor.doctorName}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="font-medium">{doctor.doctorName}</h2>
                    <p className="text-sm text-gray-500">{doctor.location}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
