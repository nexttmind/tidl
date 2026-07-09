import { SITE_IMAGES } from "@/lib/site-assets";
import { PERFORMANCE_TESTIMONIALS } from "@/lib/testimonials";
import type { PdpPageContent } from "./types";
import {
  SHARED_CARE_FAQ,
  SHARED_DELIVERY_FAQ,
  SHARED_REVIEW_STATS,
  SHARED_SAFETY_PILLARS,
  SHARED_START_FAQ,
} from "./glp1-pdp-content";

export const PERFORMANCE_PDP_CONTENT: PdpPageContent = {
  slug: "performance-recovery",
  goal: "performance",
  productForm: "pill",
  heroImage: SITE_IMAGES.pdp.care,
  penImage: SITE_IMAGES.pdp.care,
  showPenShowcase: false,
  heroProduct: {
    name: "TIDL Performance & Recovery",
    descriptor: "Athletic recovery protocol · Prescription only",
    summary:
      "Targeted peptide and metabolic support for athletic performance and faster recovery. Reviewed by a licensed provider and dispensed from a US pharmacy.",
    rating: 4.9,
    reviewCount: "120+",
    startingPrice: 279,
    priceNote: "Includes provider review, custom protocol & discreet delivery",
    perks: [
      { label: "Doctor prescription", detail: "Licensed provider in your state" },
      { label: "Performance-focused", detail: "Built for training and recovery" },
      { label: "Discreet delivery", detail: "Plain, unbranded packaging" },
    ],
    specs: [
      { label: "Faster recovery", detail: "Support between hard training blocks" },
      { label: "Custom protocol", detail: "Matched to your sport and schedule" },
      { label: "Ongoing monitoring", detail: "Adjust with your care team" },
    ],
    trustNote: "Individual results vary. Prescription required.",
    ctaLabel: "Start your intake",
  },
  outcomePhrases: [
    "Train harder, recover faster",
    "Physician-guided support",
    "Custom performance protocol",
    "Discreet ongoing care",
  ],
  includedPhrases: [
    "Licensed provider review",
    "Personalized protocol",
    "Recovery-focused plan",
    "Discreet delivery",
    "Ongoing care",
  ],
  safetyPillars: SHARED_SAFETY_PILLARS,
  reviews: PERFORMANCE_TESTIMONIALS,
  reviewStats: SHARED_REVIEW_STATS,
  verticalTimeline: [
    {
      step: "01",
      label: "Start your intake",
      detail: "Tell us about your training, recovery goals, and health history in about five minutes.",
      duration: "~5 minutes",
    },
    {
      step: "02",
      label: "Provider review",
      detail: "A licensed doctor reviews whether performance support is appropriate for you.",
      duration: "Same day",
    },
    {
      step: "03",
      label: "Protocol built",
      detail: "Your plan is tailored to your sport, schedule, and recovery needs.",
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
      detail: "Stay connected with your care team as training demands change.",
      duration: "Always on",
    },
  ],
  faqItems: [
    ...SHARED_START_FAQ,
    {
      id: 2,
      cat: "start",
      q: "Is this for competitive athletes?",
      a: "TIDL supports adults pursuing performance and recovery goals under physician supervision. Your provider reviews whether treatment is medically appropriate for your situation.",
    },
    {
      id: 4,
      cat: "start",
      q: "What if this program isn't right for me?",
      a: "Then it won't be prescribed. Providers only approve treatment when it's medically appropriate for you, and they'll tell you why if it isn't.",
    },
    {
      id: 5,
      cat: "treat",
      q: "How is the protocol personalized?",
      a: "Your provider considers your training load, recovery patterns, and health history to build a plan you can follow consistently.",
    },
    ...SHARED_DELIVERY_FAQ,
    ...SHARED_CARE_FAQ,
  ],
};
