import { SITE_IMAGES } from "@/lib/site-assets";
import { TRT_TESTIMONIALS } from "@/lib/testimonials";
import type { PdpPageContent } from "./types";
import {
  SHARED_CARE_FAQ,
  SHARED_DELIVERY_FAQ,
  SHARED_REVIEW_STATS,
  SHARED_SAFETY_PILLARS,
  SHARED_START_FAQ,
} from "./glp1-pdp-content";

export const TRT_PDP_CONTENT: PdpPageContent = {
  slug: "trt-hormonal",
  goal: "hormonal-health",
  productForm: "pill",
  heroImage: SITE_IMAGES.services.testosterone,
  penImage: SITE_IMAGES.services.testosterone,
  showPenShowcase: false,
  heroProduct: {
    name: "TIDL Testosterone Therapy",
    descriptor: "Lab-guided TRT · Prescription only",
    summary:
      "Doctor-prescribed testosterone replacement built around your labs and lifestyle. Reviewed by a licensed provider and dispensed from a US pharmacy.",
    rating: 4.9,
    reviewCount: "180+",
    startingPrice: 199,
    priceNote: "Includes provider review, labs coordination & discreet delivery",
    perks: [
      { label: "Doctor prescription", detail: "Licensed provider in your state" },
      { label: "Lab-guided dosing", detail: "Protocol matched to your levels" },
      { label: "Discreet delivery", detail: "Plain, unbranded packaging" },
    ],
    specs: [
      { label: "Personalized protocol", detail: "Dosing adjusted with your labs" },
      { label: "Ongoing monitoring", detail: "Provider follow-up built in" },
      { label: "Telehealth-first", detail: "No clinic visits required" },
    ],
    trustNote: "Individual results vary. Prescription required.",
    ctaLabel: "Start your intake",
  },
  outcomePhrases: [
    "Energy you can feel",
    "Strength and drive back",
    "Lab-guided dosing",
    "Discreet ongoing care",
  ],
  includedPhrases: [
    "Licensed provider review",
    "Personalized TRT plan",
    "Lab coordination",
    "Discreet delivery",
    "Ongoing care",
  ],
  safetyPillars: SHARED_SAFETY_PILLARS,
  reviews: TRT_TESTIMONIALS,
  reviewStats: SHARED_REVIEW_STATS,
  verticalTimeline: [
    {
      step: "01",
      label: "Start your intake",
      detail: "Answer health and lifestyle questions on your phone. It doubles as your medical intake.",
      duration: "~5 minutes",
    },
    {
      step: "02",
      label: "Provider review",
      detail: "A licensed doctor reviews your history and lab needs before anything is prescribed.",
      duration: "Same day",
    },
    {
      step: "03",
      label: "Plan personalized",
      detail: "Your TRT protocol is matched to your goals, labs, and medical history.",
      duration: "Personalized",
    },
    {
      step: "04",
      label: "Discreet delivery",
      detail: "Shipped from a licensed US pharmacy in plain packaging.",
      duration: "2–5 days",
    },
    {
      step: "05",
      label: "Ongoing care",
      detail: "Message your care team, track labs, and adjust your plan as you progress.",
      duration: "Always on",
    },
  ],
  faqItems: [
    ...SHARED_START_FAQ,
    {
      id: 2,
      cat: "start",
      q: "Do I need labs for TRT?",
      a: "Yes. Lab work helps your provider confirm whether treatment is appropriate and how to dose it safely. Your care team guides you through the process.",
    },
    {
      id: 4,
      cat: "start",
      q: "What if TRT isn't right for me?",
      a: "Then it won't be prescribed. Providers only approve treatment when it's medically appropriate for you, and they'll tell you why if it isn't.",
    },
    {
      id: 5,
      cat: "treat",
      q: "How is testosterone delivered?",
      a: "Your prescribed treatment ships from a licensed US pharmacy in discreet packaging, with clear instructions from your care team.",
    },
    ...SHARED_DELIVERY_FAQ,
    ...SHARED_CARE_FAQ,
  ],
};
