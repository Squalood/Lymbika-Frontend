import { HomePageType } from "@/types/single-types/home";
import { MembershipPageType } from "@/types/single-types/membership-page";
import { SchedulesPageType } from "@/types/single-types/schedules-page";
import { SiteConfigType } from "@/types/single-types/site-config";
import { AboutPageType } from "@/types/single-types/about";
import { NavbarSectionType } from "@/types/single-types/navbar";
import { MembershipType } from "@/types/membership";
import { PageType } from "@/types/pages";
import { FaqType } from "@/types/faq";
import { resolverSiteConfig, SiteConfig } from "@/lib/site-config";
import { strapiGet, strapiLista, strapiPrimero } from "./client";

// Single types y páginas de contenido. Un populate a un campo que no existe en
// Strapi devuelve 400 con data: null y la página cae entera a sus defaults sin
// error visible, así que cada línea de estos populates debe existir en Strapi.

const HOME_QUERY = [
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
  return (await strapiGet<HomePageType>(`home-page?${HOME_QUERY}`, "home-page"))?.data ?? null;
}

const MEMBERSHIP_QUERY = [
  "populate[badge]=true",
  "populate[texts]=true",
  "populate[memberships][populate][button]=true",
  "populate[memberships][populate][features]=true",
  "populate[faq_group][populate][faq]=true",
].join("&");

export async function getMembershipPage(): Promise<MembershipPageType | null> {
  return (
    (await strapiGet<MembershipPageType>(`membership-page?${MEMBERSHIP_QUERY}`, "membership-page"))
      ?.data ?? null
  );
}

/** Fallback de /membership: todos los planes publicados, cuando la página no los elige a mano. */
export async function getMemberships(): Promise<MembershipType[]> {
  const planes = await strapiLista<MembershipType>("memberships?populate=*", "memberships");
  return planes
    .map((item) => ({ ...item, order: item.order ?? 0, featured: item.featured ?? false }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.id - b.id);
}

const SCHEDULES_QUERY = [
  "populate[logo][fields][0]=url",
  "populate[doctors][fields][0]=doctorName",
  "populate[doctors][fields][1]=slug",
  "populate[doctors][fields][2]=credentials",
  "populate[doctors][fields][3]=calendarLink",
  "populate[doctors][fields][4]=priceCon",
  "populate[doctors][populate][mainImage][fields][0]=url",
  "populate[doctors][populate][image][fields][0]=url",
  "populate[benefits]=true",
  "populate[includes]=true",
  "populate[tip]=true",
  "populate[prices]=true",
  "populate[reasons]=true",
  "populate[steps]=true",
  "populate[contact][populate][image][fields][0]=url",
].join("&");

export async function getSchedulesPage(): Promise<SchedulesPageType | null> {
  return (
    (await strapiGet<SchedulesPageType>(`schedules-page?${SCHEDULES_QUERY}`, "schedules-page"))
      ?.data ?? null
  );
}

/**
 * Siempre devuelve una configuración completa: si Strapi falla, el single type
 * no existe todavía (404) o un campo viene vacío, se usan los defaults.
 *
 * La pide el layout y la reparte a los client components con SiteConfigProvider.
 * Un server component puede llamarla directo: Next deduplica el fetch.
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  const res = await strapiGet<SiteConfigType>("site-config", "site-config");
  return resolverSiteConfig(res?.data ?? null);
}

export async function getNavbarContent(): Promise<NavbarSectionType | undefined> {
  const res = await strapiGet<NavbarSectionType>(
    "navbar-section?populate=about_brand_image",
    "navbar-section"
  );
  return res?.data ?? undefined;
}

export async function getAboutPage(): Promise<AboutPageType | undefined> {
  const res = await strapiGet<AboutPageType>(
    "about-page?populate[value][populate]=*&populate[contact][populate][image]=true&populate[hero_image]=true",
    "about-page",
    { revalidate: 300 }
  );
  return res?.data ?? undefined;
}

/** Un faq-group por slug (las preguntas salen en el HTML). */
export function getFaqGroup(slug: string) {
  return strapiPrimero<FaqType>(
    `faq-groups?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[faq]=true`,
    "faq-group"
  );
}

/** Una página de la colección pages, con sus componentes de primer nivel (hero, badge…). */
export function getPage(slug: string) {
  return strapiPrimero<PageType>(
    `pages?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    `page/${slug}`
  );
}

type ShopPromo ={ id: number; title: string; image: { url: string }; link: string };
export type ShopPage = {
  hero?: { title: string; description: string; buttonText: string; buttonUrl: string; image: { url: string } };
  promo: ShopPromo[];
};

/** Página "farmacia" de la colección pages: hero y promos de /shop. */
export async function getShopPage(): Promise<{ hero: ShopPage | null; promo: ShopPage | null }> {
  const [hero, promo] = await Promise.all([
    strapiPrimero<ShopPage>(
      "pages?filters[slug][$eq]=farmacia&populate[hero][populate]=image&populate[promo][populate]=image",
      "shop-page/hero"
    ),
    strapiPrimero<ShopPage>(
      "pages?filters[slug][$eq]=farmacia&populate[promo][populate]=*",
      "shop-page/promo"
    ),
  ]);
  return { hero, promo };
}

/** Página "doctores" de la colección pages: contenido, hero y planes de /healthHubs. */
export async function getHealthHubsData() {
  const base = "pages?filters[slug][$eq]=doctores";
  const [page, heroPage, planPages] = await Promise.all([
    strapiPrimero<PageType>(`${base}&populate=*`, "healthhubs"),
    strapiPrimero<PageType>(
      `${base}&populate[hero][populate]=image&populate[promo][populate]=image`,
      "healthhubs/hero"
    ),
    strapiLista<PageType>(
      `${base}&populate[plan][populate]=*&populate[ModalPlan][populate][TrustStep]=*`,
      "healthhubs/plans"
    ),
  ]);
  return { page, heroPage, planPages };
}
