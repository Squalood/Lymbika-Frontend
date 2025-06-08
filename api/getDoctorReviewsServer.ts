export async function getDoctorReviews(doctorSlug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews?filters[doctor][slug][$eq]=${doctorSlug}&populate=*`,
      { cache: "no-store" }
    );
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("Error al obtener reviews", err);
    return [];
  }
}
