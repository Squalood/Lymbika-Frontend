export async function getDoctorBySlug(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors?filters[slug][$eq]=${slug}&populate=*`,
      { cache: "no-store" }
    );
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("Error al obtener doctor por slug", err);
    return [];
  }
}
