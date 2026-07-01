import { DoctorType } from "./doctor";
import { FaqType } from "./faq";

// ─── Landing page component types ───────────────────────────────────────────

export type LandingHeroType = {
  eyebrow: string | null;
  subtitle: string | null;
  price_display: string | null;
  hero_video: { url: string } | null;
  hero_image: { url: string } | null;
  trust_pills: string[] | null;
};

export type LandingStatType = {
  number: string | null;
  label: string | null;
  icon: string | null;
};

export type FeatureIconType =
  | "icon1" | "icon2" | "icon3" | "icon4" | "icon5" | "icon6"
  | "Stethoscope" | "Activity" | "Heart" | "HeartPulse," | "Brain"
  | "ScanHeart" | "Hospital" | "Ribbon" | "Venus" | "Baby"
  | "Sparkles" | "Shell" | "ClipboardPlus" | "Syringe" | "Dumbbell"
  | "BriefcaseMedical" | "Ambulance" | "Bandage" | "Pill" | "Percent"
  | "CalendarPlus" | "UserRoundPlus" | "Waypoints" | "Presentation"
  | "ChartNoAxesCombined" | "Handshake" | "Globe"
  | "HeartHandshake" | "Home" | "Leaf" | "ShieldCheck" | "UserCheck"
  | "PillBottle" | "ClipboardCheck";

export type LandingBenefitType = {
  title: string | null;
  description: string | null;
  icon: FeatureIconType | null;
};

export type LandingVideoType = {
  videoID: string | null;
  title: string | null;
};

export type FaqGroupType = FaqType;

export type LandingTextsType = {
  hero_price_label: string | null;
  hero_primary_button: string | null;
  hero_secondary_button: string | null;
  video_label: string | null;
  benefits_label: string | null;
  benefits_title: string | null;
  package_label_section: string | null;
  package_title: string | null;
  package_cta_button: string | null;
  gallery_label: string | null;
  gallery_title: string | null;
  doctors_label: string | null;
  doctors_label_plural: string | null;
  doctors_title: string | null;
  doctors_title_plural: string | null;
  doctors_profile_button: string | null;
  faq_label: string | null;
  faq_header_title: string | null;
  faq_header_subtitle: string | null;
  cta_title: string | null;
  cta_subtitle: string | null;
  cta_button: string | null;
};

// ─── Service Rate ────────────────────────────────────────────────────────────

export type ServiceRateType = {
  id: number;
  price: number;
  duration_min: number | null;
  notes: string | null;
  medical_service: {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: { url: string } | null;
    type: "consultation" | "procedure" | "study";
  };
  doctor?: { doctorName: string } | null;
  package_label: string | null;
  package_items: string[] | null;
  package_note: string | null;
};

export type ServiceRateWithDoctorType = {
  id: number;
  price: number;
  duration_min: number | null;
  notes: string | null;
  doctor: DoctorType;
  package_label: string | null;
  package_items: string[] | null;
  package_note: string | null;
};

// ─── Medical Service ─────────────────────────────────────────────────────────

export type MedicalServiceType = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: { url: string } | null;
  type: "consultation" | "procedure" | "study";
  specialty: { slug: string } | null;
  has_landing_page?: boolean;
  landingHero?: LandingHeroType | null;
  landingStat?: LandingStatType[] | null;
  landingBenefit?: LandingBenefitType[] | null;
  landing_video_url?: LandingVideoType | null;
  landing_gallery?: { url: string }[] | null;
  faq_group?: FaqGroupType | null;
  landingTexts?: LandingTextsType | null;
  service_rates?: ServiceRateWithDoctorType[];
};
