import type { ComponentType, SVGProps } from "react";
import {
  DeliveryIcon,
  GoalsIcon,
  HealthIcon,
  MinutesIcon,
  PlanIcon,
  ProviderIcon,
  ReorderIcon,
  ReviewIcon,
  SupportIcon,
} from "./icons";

export type ImageMotion = "slideRight" | "crossfade" | "slideUp";

export interface HiWCard {
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface HiWStep {
  id: number;
  timelineLabel: string;
  headline: string;
  body: string;
  image: string;
  imageMotion: ImageMotion;
  cards: HiWCard[];
}

export const HIW_STEPS: HiWStep[] = [
  {
    id: 0,
    timelineLabel: "Take the Quiz",
    headline: "Take the quiz.",
    body:
      "Answer a few questions about your health and goals. It takes about five minutes, and it doubles as your medical intake, so there is nothing to fill out twice.",
    image:
      "https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4aa74cb673463b10d3ae0a_hf_20260705_182659_b144a633-d893-4de0-b45e-39e6df164b2f.png",
    imageMotion: "slideRight",
    cards: [
      {
        title: "Your goals",
        description: "What you want to improve",
        Icon: GoalsIcon,
      },
      {
        title: "Health history",
        description: "A few quick medical questions",
        Icon: HealthIcon,
      },
      {
        title: "Five minutes",
        description: "Done on your phone, anytime",
        Icon: MinutesIcon,
      },
    ],
  },
  {
    id: 1,
    timelineLabel: "Licensed Review",
    headline: "From licensed pharmacies to your door.",
    body:
      "Prescribed by licensed providers, filled by US pharmacies, and shipped in discreet, temperature-safe packaging.",
    image:
      "https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4aa74d68be0cc0c1e6ff78_hf_20260705_183156_8357ac89-69ac-4055-a74d-07ea368560c8.png",
    imageMotion: "crossfade",
    cards: [
      {
        title: "Licensed provider",
        description: "Reviewed by a doctor in your state",
        Icon: ProviderIcon,
      },
      {
        title: "Personalized plan",
        description: "Treatment matched to you",
        Icon: PlanIcon,
      },
      {
        title: "Medical review",
        description: "Every intake read before prescribing",
        Icon: ReviewIcon,
      },
    ],
  },
  {
    id: 2,
    timelineLabel: "Delivery & Support",
    headline: "Real change, tracked over time.",
    body:
      "Consistent, doctor-guided treatment that supports steady, lasting results.",
    image:
      "https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9/6a4aa92efc42f4d1ca52f73b_hf_20260705_185141_41c69960-1413-4b75-8318-f0800323717b.png",
    imageMotion: "slideUp",
    cards: [
      {
        title: "Discreet delivery",
        description: "Shipped from a licensed pharmacy",
        Icon: DeliveryIcon,
      },
      {
        title: "Ongoing support",
        description: "Message your care team anytime",
        Icon: SupportIcon,
      },
      {
        title: "Easy reorders",
        description: "Refills in a tap",
        Icon: ReorderIcon,
      },
    ],
  },
];

export const HIW_SUPPORTING =
  "Three steps from quiz to doorstep. Physician-led care that feels effortless at every turn.";
