import { FaqType } from "@/types/faq"

export type HomeMedia = { url: string }

export type HomeTestimonial = {
  id?: number
  name?: string
  text?: string
  role?: string
  rating?: number | null
}

export type HomeFeature = {
  id: number
  icon?: string
  title?: string
  description?: string
}

export type HomeChatMessage = {
  id?: number
  from: "ai" | "user"
  text: string
}

export type HomeSection =
  | { __component: "hero.hero"; id: number; title?: string; description?: string; buttonText?: string; buttonUrl?: string; image?: HomeMedia | null }
  | { __component: "home.text-banner"; id: number; item: { id: number; text: string; icon?: string }[] }
  | { __component: "home.turist-section"; id: number; label?: string; title?: string; description?: string; videoId?: string; videoLabel?: string; ctaText?: string; ctaHref?: string; testimonial?: HomeTestimonial | null }
  | { __component: "home.videos-section"; id: number; title?: string; videos: { id: number; videoID: string }[] }
  | { __component: "home.promo-carousel"; id: number; aspectRatio?: "square" | "video" | "portrait"; promos: { id: number; title?: string; link?: string; image?: HomeMedia | null }[] }
  | { __component: "home.alyus-section"; id: number; badge?: string; label?: string; title?: string; description?: string; chatFooter?: string; ctaText?: string; ctaHref?: string; features: HomeFeature[]; messages: HomeChatMessage[] }
  | { __component: "gallery.gallery"; id: number; title?: string; images: (HomeMedia & { id: number })[] }
  | { __component: "home.are-doctors-section"; id: number; badge?: string; title?: string; description?: string; ctaText?: string; ctaHref?: string; perks: { id: number; text: string }[]; testimonial?: HomeTestimonial | null }
  | { __component: "home.clinics"; id: number; title?: string }
  | { __component: "home.carousel-services"; id: number; title?: string; subTitle?: string; description?: string; allLabel?: string; emptyLabel?: string; priceLabel?: string; ctaLabel?: string; showDetailsLabel?: string; hideDetailsLabel?: string }
  | { __component: "home.hospital-section"; id: number; title?: string }
  | { __component: "home.choose-category"; id: number; title?: string }
  | { __component: "home.surgery-faq"; id: number; title?: string; faq_group?: FaqType | null }

export type HomePageType = {
  seoTitle?: string
  seoDescription?: string
  sections: HomeSection[]
}
