import { SITE_IMAGES } from "@/lib/site-assets";
import { CATEGORY_PATHS } from "@/lib/product-catalog";
import type { CategorySlug } from "@/lib/categories";

export type ServiceCardContent = {
  categorySlug: CategorySlug;
  label: string;
  image: string;
  summary: string;
  bullets: readonly string[];
  badge?: string;
  explorePath: `/category/${CategorySlug}`;
};

export const SERVICES_INTRO = {
  kicker: "Prescription care, delivered",
  lead:
    "Every TIDL program starts with a licensed provider in your state. Treatment ships from a US pharmacy in discreet packaging. No clinic visits, no surprise billing, no mixing medications at your kitchen counter.",
} as const;

export const SERVICE_CARDS: ServiceCardContent[] = [
  {
    categorySlug: "weight-loss",
    label: "Weight loss",
    image: SITE_IMAGES.services.weightLoss,
    summary:
      "GLP-1 treatment dosed for you by a doctor. Steady progress without crash diets, yo-yo cycles, or measuring at home.",
    bullets: [
      "Pre-dosed TIDL Pen, dose set to your Rx",
      "Licensed provider reviews every intake",
      "Weekly routine: click, inject, track progress",
    ],
    badge: "Includes TIDL Pen",
    explorePath: CATEGORY_PATHS["weight-loss"],
  },
  {
    categorySlug: "testosterone",
    label: "Testosterone",
    image: SITE_IMAGES.services.testosterone,
    summary:
      "Energy, strength, drive, and focus. TRT built around your labs, symptoms, and how you actually live day to day.",
    bullets: [
      "Lab-guided dosing and ongoing monitoring",
      "Doctor in your state prescribes when appropriate",
      "Discreet delivery from licensed US pharmacies",
    ],
    explorePath: CATEGORY_PATHS.testosterone,
  },
  {
    categorySlug: "longevity",
    label: "Longevity",
    image: SITE_IMAGES.services.longevity,
    summary:
      "Peptide and metabolic protocols under physician supervision. Built for recovery, sleep, and long-term performance.",
    bullets: [
      "Personalized peptide and recovery protocols",
      "Pen or prescription format based on your plan",
      "Message your care team without clinic visits",
    ],
    explorePath: CATEGORY_PATHS.longevity,
  },
];
