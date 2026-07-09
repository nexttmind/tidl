import { SITE_IMAGES } from "@/lib/site-assets";
import { LONGEVITY_TESTIMONIALS } from "@/lib/testimonials";
import type { PdpPageContent } from "./types";
import { LONGEVITY_PEN_SHOWCASE } from "./pen-showcase-content";
import {
  SHARED_CARE_FAQ,
  SHARED_DELIVERY_FAQ,
  SHARED_REVIEW_STATS,
  SHARED_SAFETY_PILLARS,
  SHARED_START_FAQ,
} from "./glp1-pdp-content";

export const LONGEVITY_PDP_CONTENT: PdpPageContent = {
  slug: "longevity-peptides",
  goal: "longevity",
  productForm: "pen",
  heroImage: SITE_IMAGES.services.longevity,
  penImage: SITE_IMAGES.services.longevity,
  showPenShowcase: true,
  penShowcase: LONGEVITY_PEN_SHOWCASE,
  heroProduct: {
    name: "TIDL Longevity Peptides",
    descriptor: "Physician-supervised protocol · Prescription only",
    summary:
      "Peptide therapy to support recovery, sleep, and metabolic health under physician supervision. Reviewed by a licensed provider and dispensed from a US pharmacy.",
    rating: 4.9,
    reviewCount: "140+",
    startingPrice: 349,
    priceNote: "Includes provider review, personalized protocol & discreet delivery",
    perks: [
      { label: "Doctor prescription", detail: "Licensed provider in your state" },
      { label: "Protocol-based care", detail: "Matched to your health profile" },
      { label: "Discreet delivery", detail: "Plain, unbranded packaging" },
    ],
    specs: [
      { label: "Recovery support", detail: "Built for sleep, energy, and repair" },
      { label: "Metabolic health", detail: "Physician-guided peptide protocols" },
      { label: "Ongoing adjustments", detail: "Care team monitors your progress" },
    ],
    trustNote: "Individual results vary. Prescription required.",
    ctaLabel: "Start your intake",
  },
  outcomePhrases: [
    "Recover faster",
    "Sleep deeper",
    "Stay metabolically sharp",
    "Physician-guided protocols",
  ],
  includedPhrases: [
    "Licensed provider review",
    "Personalized peptide plan",
    "Protocol instructions",
    "Discreet delivery",
    "Ongoing care",
  ],
  safetyPillars: SHARED_SAFETY_PILLARS,
  reviews: LONGEVITY_TESTIMONIALS,
  reviewStats: SHARED_REVIEW_STATS,
  verticalTimeline: [
    {
      step: "01",
      label: "Start your intake",
      detail: "Share your goals, health history, and lifestyle on your phone in about five minutes.",
      duration: "~5 minutes",
    },
    {
      step: "02",
      label: "Provider review",
      detail: "A licensed doctor reviews whether peptide therapy is appropriate for you.",
      duration: "Same day",
    },
    {
      step: "03",
      label: "Protocol set",
      detail: "Your peptide protocol is personalized to your profile and treatment goals.",
      duration: "Personalized",
    },
    {
      step: "04",
      label: "Discreet delivery",
      detail: "Shipped from a licensed US pharmacy with cold-chain when required.",
      duration: "2–5 days",
    },
    {
      step: "05",
      label: "Ongoing care",
      detail: "Message your care team and adjust your protocol as your body responds.",
      duration: "Always on",
    },
  ],
  faqItems: [
    ...SHARED_START_FAQ,
    {
      id: 2,
      cat: "start",
      q: "Do I need a prescription for peptides?",
      a: "Yes. TIDL peptide protocols are prescription-only. Your intake doubles as your medical review, and a licensed provider writes the prescription when appropriate.",
    },
    {
      id: 4,
      cat: "start",
      q: "What if peptides aren't right for me?",
      a: "Then they won't be prescribed. Providers only approve treatment when it's medically appropriate for you, and they'll tell you why if it isn't.",
    },
    {
      id: 5,
      cat: "treat",
      q: "How are peptide protocols managed?",
      a: "Your provider sets a protocol matched to your goals and monitors your progress with ongoing telehealth support.",
    },
    ...SHARED_DELIVERY_FAQ,
    ...SHARED_CARE_FAQ,
  ],
};
