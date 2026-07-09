/** Shared trust signals used across services, categories, and PDPs. */

export const TRUST_STATS = [
  { value: "4.9", label: "Average rating" },
  { value: "12k+", label: "Patients served" },
  { value: "50", label: "States covered" },
] as const;

export const TRUST_PILLARS = [
  {
    id: "provider",
    num: "01",
    label: "Licensed providers",
    detail: "Every intake reviewed by a doctor licensed in your state.",
  },
  {
    id: "pharmacy",
    num: "02",
    label: "US pharmacies",
    detail: "Medication dispensed by licensed US-based pharmacies only.",
  },
  {
    id: "rx",
    num: "03",
    label: "Prescription only",
    detail: "No off-the-shelf shortcuts. Treatment when medically appropriate.",
  },
  {
    id: "private",
    num: "04",
    label: "Private by design",
    detail: "Discreet packaging, confidential care, and secure messaging.",
  },
] as const;

export const CARE_JOURNEY_STEPS = [
  {
    step: "01",
    label: "Complete your intake",
    detail: "Answer health questions on your phone. It doubles as your medical intake.",
    duration: "~5 minutes",
  },
  {
    step: "02",
    label: "Provider review",
    detail: "A licensed doctor in your state reviews your history before prescribing.",
    duration: "Same day",
  },
  {
    step: "03",
    label: "Personalized plan",
    detail: "Your dose and delivery format are set to your prescription and goals.",
    duration: "Tailored",
  },
  {
    step: "04",
    label: "Discreet delivery",
    detail: "Shipped from a licensed US pharmacy in plain packaging, cold-chain when needed.",
    duration: "2–5 days",
  },
  {
    step: "05",
    label: "Ongoing care",
    detail: "Message your care team, adjust your plan, and reorder when you are ready.",
    duration: "Always on",
  },
] as const;

export const PEN_SPOTLIGHT = {
  kicker: "The TIDL Pen",
  title: "Pre-dosed. Precise. No guesswork.",
  lead:
    "GLP-1 and select peptide treatments ship in the TIDL Pen. Your dose is set to your prescription before it leaves the pharmacy. No vials, no syringes, nothing to mix.",
  image: "", // filled at import site to avoid circular deps
  features: [
    {
      num: "01",
      title: "Precision dose slider",
      body: "Your dose is set to your prescription. Nothing to calculate at home.",
    },
    {
      num: "02",
      title: "Graduated dose scale",
      body: "Clear markings from 0.1 to 1.0 ml so you always know what you are taking.",
    },
    {
      num: "03",
      title: "Pre-filled, tiny needle",
      body: "One weekly routine. Click, inject, done. No assembly required.",
    },
    {
      num: "04",
      title: "Cold-chain when needed",
      body: "Temperature-sensitive treatments ship in insulated packaging door to door.",
    },
  ],
  trustNote: "Prescription required. Individual results vary.",
} as const;
