import { HomePageType } from "@/types/single-types/home";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

const SECTIONS_QUERY = [
  "populate[sections][on][hero.hero][populate][image][fields][0]=url",
  "populate[sections][on][home.text-banner][populate][item]=true",
  "populate[sections][on][home.turist-section][populate][testimonial]=true",
  "populate[sections][on][home.videos-section][populate][videos]=true",
  "populate[sections][on][home.promo-carousel][populate][promos][populate][image][fields][0]=url",
  "populate[sections][on][home.alyus-section][populate][features]=true",
  "populate[sections][on][home.alyus-section][populate][messages]=true",
  "populate[sections][on][gallery.gallery][populate][images][fields][0]=url",
  "populate[sections][on][home.are-doctors-section][populate][perks]=true",
  "populate[sections][on][home.are-doctors-section][populate][testimonial]=true",
  "populate[sections][on][home.clinics][fields][0]=title",
  "populate[sections][on][home.carousel-services][fields][0]=title",
  "populate[sections][on][home.carousel-services][fields][1]=subTitle",
  "populate[sections][on][home.carousel-services][fields][2]=description",
  "populate[sections][on][home.carousel-services][fields][3]=allLabel",
  "populate[sections][on][home.carousel-services][fields][4]=emptyLabel",
  "populate[sections][on][home.carousel-services][fields][5]=priceLabel",
  "populate[sections][on][home.carousel-services][fields][6]=ctaLabel",
  "populate[sections][on][home.carousel-services][fields][7]=showDetailsLabel",
  "populate[sections][on][home.carousel-services][fields][8]=hideDetailsLabel",
  "populate[sections][on][home.hospital-section][fields][0]=title",
  "populate[sections][on][home.choose-category][fields][0]=title",
  "populate[sections][on][home.surgery-faq][populate][faq_group][populate][faq]=true",
].join("&");

export async function getHomePage(): Promise<HomePageType | null> {
  try {
    const res = await fetch(
      `${BASE}/api/home-page?${SECTIONS_QUERY}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      console.error("[home-page] Strapi error:", res.status, await res.text());
      return null;
    }
    const json = await res.json();
    return json.data ?? null;
  } catch (err) {
    console.error("[home-page] fetch failed:", err);
    return null;
  }
}
