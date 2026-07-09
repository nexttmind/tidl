import type { GoalId } from "@/types/quiz";

export const GOAL_HERO_BULLETS: Record<GoalId, readonly string[]> = {
  "weight-loss": [
    "GLP-1 protocols matched to your intake",
    "Measurable progress with physician oversight",
    "Pre-dosed pen — no mixing or measuring",
  ],
  "metabolic-health": [
    "Metabolic support under physician review",
    "Lab-informed treatment decisions",
    "Discreet delivery from a US pharmacy",
  ],
  longevity: [
    "Peptide protocols for recovery and sleep",
    "Physician-supervised, prescription-only care",
    "Ongoing adjustments as your body responds",
  ],
  "hormonal-health": [
    "Lab-guided testosterone protocols",
    "Personalized dosing and follow-up",
    "Telehealth-first — no clinic visits",
  ],
  performance: [
    "Recovery-focused peptide support",
    "Built for training volume and consistency",
    "Doctor-reviewed before anything ships",
  ],
  recovery: [
    "Targeted recovery between hard sessions",
    "Physician-reviewed metabolic support",
    "Discreet, pharmacy-sealed delivery",
  ],
};

export const RECOMMENDATION_TIMELINE = [
  {
    title: "Physician review",
    detail: "A licensed provider reviews your intake within 24–48 hours.",
  },
  {
    title: "Personalized plan",
    detail: "If approved, your prescription and protocol are tailored to you.",
  },
  {
    title: "Discreet delivery",
    detail: "Shipped from a licensed US pharmacy in plain packaging.",
  },
] as const;

export const INCLUDED_ITEMS = [
  { id: "package", label: "Treatment supply" },
  { id: "stethoscope", label: "Physician review" },
  { id: "truck", label: "Discreet shipping" },
  { id: "shield", label: "Ongoing care" },
  { id: "clock", label: "24/7 messaging" },
] as const;
