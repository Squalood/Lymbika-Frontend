export async function getProductReviews(productSlug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews?filters[product][slug][$eq]=${productSlug}&populate=*`,
      { cache: "no-store" }
    );
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("Error al obtener reviews de producto", err);
    return [];
  }
}
