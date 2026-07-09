import type { ProductSlug } from "@/types/quiz";
import { SITE_IMAGES } from "@/lib/site-assets";
import { TRUST_PILLARS, TRUST_STATS } from "@/lib/trust-content";

export const CATEGORY_SLUGS = ["weight-loss", "testosterone", "longevity"] as const;
export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export type CategoryEducationBlock = {
  title: string;
  body: string;
};

export type CategoryTimelineStep = {
  step: string;
  label: string;
  detail: string;
  duration: string;
};

export type CategoryFaqItem = {
  id: number;
  q: string;
  a: string;
};

export type CategoryPenSpotlight = {
  kicker: string;
  title: string;
  lead: string;
  image: string;
  features: readonly { num: string; title: string; body: string }[];
  trustNote: string;
};

export type CategoryDefinition = {
  slug: CategorySlug;
  navLabel: string;
  title: string;
  kicker: string;
  headline: string;
  lead: string;
  extendedLead: string;
  heroImage: string;
  productSlugs: ProductSlug[];
  pillars: readonly { title: string; body: string }[];
  educationTitle: string;
  educationBlocks: readonly CategoryEducationBlock[];
  howItWorks: readonly CategoryTimelineStep[];
  penSpotlight?: CategoryPenSpotlight;
  faqItems: readonly CategoryFaqItem[];
  ctaLabel: string;
  metaTitle: string;
  metaDescription: string;
  trustStats: typeof TRUST_STATS;
  trustPillars: typeof TRUST_PILLARS;
};

export const CATEGORIES: Record<CategorySlug, CategoryDefinition> = {
  "weight-loss": {
    slug: "weight-loss",
    navLabel: "Weight loss",
    title: "Weight Loss",
    kicker: "Clinical weight care",
    headline: "How to lose weight and keep it off.",
    lead:
      "Doctor-prescribed GLP-1 treatment built for steady, measurable progress. No crash diets, no waiting rooms, no guesswork.",
    extendedLead:
      "GLP-1 medications work with your body's natural signals to reduce appetite and support sustainable weight loss. At TIDL, every plan is physician-guided: a licensed provider reviews your full health history, prescribes only when appropriate, and ships your dose pre-set in the TIDL Pen so you never mix or measure at home.",
    heroImage: SITE_IMAGES.services.weightLoss,
    productSlugs: ["glp-1-weight-loss"],
    pillars: [
      {
        title: "Physician-guided GLP-1",
        body: "Licensed providers review your intake, medical history, and goals before anything is prescribed.",
      },
      {
        title: "Pre-dosed TIDL Pen",
        body: "Your dose is set in the pen at the pharmacy. Click and go. No vials, syringes, or kitchen-table chemistry.",
      },
      {
        title: "Progress you can track",
        body: "Consistent care and support week after week. Message your team and adjust as your body responds.",
      },
      {
        title: "Steady, not extreme",
        body: "Built for real life, not crash cycles. The goal is weight you keep off, not a number you rebound from.",
      },
      {
        title: "Transparent pricing",
        body: "One monthly plan covers provider review, prescription, and delivery. No hidden clinic fees.",
      },
      {
        title: "Discreet from day one",
        body: "Plain outer packaging, secure messaging, and care that respects your privacy.",
      },
    ],
    educationTitle: "What GLP-1 care looks like with TIDL",
    educationBlocks: [
      {
        title: "What is GLP-1?",
        body: "GLP-1 receptor agonists are FDA-approved medications that help regulate appetite and blood sugar. They are prescribed when a licensed provider determines they are medically appropriate for you. TIDL connects you with that provider review entirely online.",
      },
      {
        title: "Why the TIDL Pen matters",
        body: "Weight-loss GLP-1 ships in our pre-dosed pen. Your prescription dose is set before delivery, with a graduated scale and precision slider so there is never guesswork. One weekly injection, no mixing, no measuring.",
      },
      {
        title: "What to expect over time",
        body: "Most members start with a gradual dose schedule as their body adjusts. Your provider monitors progress, answers questions, and updates your plan. You are never alone between check-ins: message your care team anytime.",
      },
    ],
    howItWorks: [
      {
        step: "01",
        label: "Take the intake",
        detail: "Five-minute health quiz on your phone. It doubles as your medical intake for provider review.",
        duration: "~5 min",
      },
      {
        step: "02",
        label: "Doctor review",
        detail: "A licensed provider in your state reads your full history before prescribing GLP-1.",
        duration: "Same day",
      },
      {
        step: "03",
        label: "Pen prepared",
        detail: "Your GLP-1 dose is set in the pre-dosed TIDL Pen. No mixing, no assembly.",
        duration: "Personalized",
      },
      {
        step: "04",
        label: "Discreet delivery",
        detail: "Shipped from a licensed US pharmacy in plain packaging with cold-chain when required.",
        duration: "2–5 days",
      },
      {
        step: "05",
        label: "Ongoing support",
        detail: "Track progress, message your care team, and reorder with one tap when you are ready.",
        duration: "Always on",
      },
    ],
    penSpotlight: {
      kicker: "The TIDL Pen",
      title: "GLP-1, pre-dosed. Just click.",
      lead:
        "Your weekly dose is set to your prescription before the pen leaves the pharmacy. A precision slider, graduated scale, and pre-filled cartridge mean you never handle vials or syringes at home.",
      image: SITE_IMAGES.pen,
      features: [
        {
          num: "01",
          title: "Precision dose slider",
          body: "Your dose, set to your prescription. Nothing to calculate.",
        },
        {
          num: "02",
          title: "Graduated dose scale",
          body: "Clear markings from 0.1 to 1.0 ml. Zero guesswork.",
        },
        {
          num: "03",
          title: "Pre-filled, tiny needle",
          body: "One click per weekly injection. No vials or assembly.",
        },
        {
          num: "04",
          title: "Cold-chain delivery",
          body: "Insulated packaging keeps medication in range from pharmacy to door.",
        },
      ],
      trustNote: "Prescription required. Individual results vary.",
    },
    faqItems: [
      {
        id: 1,
        q: "Is TIDL legitimate and safe?",
        a: "Yes. TIDL is a telehealth platform connecting you with licensed medical providers. Every treatment is prescribed by a doctor in your state and filled by a licensed US pharmacy.",
      },
      {
        id: 2,
        q: "How does the TIDL Pen work?",
        a: "Your dose is set to your prescription with a clear graduated scale. No vials, no syringes, nothing to mix. One weekly injection, then you are done.",
      },
      {
        id: 3,
        q: "Do I need a prescription for GLP-1?",
        a: "Yes. Every TIDL treatment is prescription-only. Your intake doubles as your medical review, and a licensed provider writes the prescription only when medically appropriate.",
      },
      {
        id: 4,
        q: "Is shipping discreet?",
        a: "Completely. Treatment arrives in plain, unbranded outer packaging with nothing on the box that reveals what is inside.",
      },
      {
        id: 5,
        q: "Can I talk to my care team after I start?",
        a: "Anytime. Message your care team about treatment, side effects, or progress. A real person answers.",
      },
    ],
    ctaLabel: "Explore GLP-1 program",
    metaTitle: "Weight Loss | Tidl Health",
    metaDescription:
      "Learn how TIDL helps you lose weight with doctor-prescribed GLP-1, the pre-dosed pen, and ongoing telehealth care.",
    trustStats: TRUST_STATS,
    trustPillars: TRUST_PILLARS,
  },
  testosterone: {
    slug: "testosterone",
    navLabel: "Testosterone",
    title: "Testosterone",
    kicker: "Hormonal performance",
    headline: "Restore energy, strength, and focus.",
    lead:
      "TRT built around your labs and your life. Licensed providers, personalized protocols, and discreet delivery from US pharmacies.",
    extendedLead:
      "Low testosterone can affect energy, mood, strength, and focus. TIDL testosterone therapy starts with your symptoms and lab work, reviewed by a licensed provider who builds a protocol around how you actually feel, not a one-size-fits-all chart.",
    heroImage: SITE_IMAGES.services.testosterone,
    productSlugs: ["trt-hormonal"],
    pillars: [
      {
        title: "Lab-guided protocols",
        body: "Treatment matched to your levels and how you feel day to day, not generic templates.",
      },
      {
        title: "Licensed medical review",
        body: "Every intake read by a doctor licensed in your state before prescribing.",
      },
      {
        title: "Ongoing telehealth care",
        body: "Adjust your plan with your care team as your body responds and labs evolve.",
      },
      {
        title: "Symptom-first approach",
        body: "Energy, drive, sleep, and recovery matter as much as the number on a lab report.",
      },
      {
        title: "US pharmacy fulfillment",
        body: "Medication dispensed by licensed pharmacies and shipped discreetly to your door.",
      },
      {
        title: "Clear, consistent care",
        body: "Message your provider, schedule follow-ups, and reorder without clinic waiting rooms.",
      },
    ],
    educationTitle: "Understanding testosterone therapy with TIDL",
    educationBlocks: [
      {
        title: "Who TRT is for",
        body: "Testosterone replacement therapy is for men with clinically low testosterone confirmed through labs and symptoms. A licensed provider evaluates both before recommending treatment. TIDL is not a shortcut around medical review.",
      },
      {
        title: "How your protocol is built",
        body: "Your provider reviews your intake, health history, and lab results to determine whether TRT is appropriate and at what dose. Plans evolve with follow-up labs and how you report feeling over time.",
      },
      {
        title: "What ongoing care looks like",
        body: "TRT is not set-and-forget. Your care team monitors progress, answers questions about injections or side effects, and adjusts dosing when needed. Everything happens through secure telehealth.",
      },
    ],
    howItWorks: [
      {
        step: "01",
        label: "Share your symptoms",
        detail: "Complete the intake covering energy, mood, strength, sleep, and health history.",
        duration: "~5 min",
      },
      {
        step: "02",
        label: "Lab review",
        detail: "Your provider reviews labs and symptoms together before prescribing TRT.",
        duration: "Provider-led",
      },
      {
        step: "03",
        label: "Personalized Rx",
        detail: "Dose and delivery format matched to your levels, lifestyle, and goals.",
        duration: "Tailored",
      },
      {
        step: "04",
        label: "Discreet delivery",
        detail: "Shipped from a licensed US pharmacy in plain, unbranded packaging.",
        duration: "2–5 days",
      },
      {
        step: "05",
        label: "Monitor and adjust",
        detail: "Follow-up labs and messaging with your care team keep your plan on track.",
        duration: "Ongoing",
      },
    ],
    faqItems: [
      {
        id: 1,
        q: "Is TIDL testosterone therapy legitimate?",
        a: "Yes. Every TRT plan is prescribed by a licensed provider in your state and filled by a licensed US pharmacy after medical review.",
      },
      {
        id: 2,
        q: "Do I need blood work?",
        a: "Labs are central to safe TRT. Your provider will guide you on what is needed based on your intake and whether you have recent results.",
      },
      {
        id: 3,
        q: "Who reviews and prescribes my treatment?",
        a: "A licensed medical provider in your state reads your full intake before anything is prescribed. They reach out if they have questions.",
      },
      {
        id: 4,
        q: "Is shipping discreet?",
        a: "Yes. Plain outer packaging with no branding that reveals what is inside.",
      },
      {
        id: 5,
        q: "Can I pause or change my plan?",
        a: "You are in control. Talk to your provider before stopping treatment, since some protocols should not end abruptly.",
      },
    ],
    ctaLabel: "Explore TRT program",
    metaTitle: "Testosterone Therapy | Tidl Health",
    metaDescription:
      "Learn how TIDL testosterone therapy supports energy, strength, and hormonal health with licensed provider care.",
    trustStats: TRUST_STATS,
    trustPillars: TRUST_PILLARS,
  },
  longevity: {
    slug: "longevity",
    navLabel: "Longevity",
    title: "Longevity",
    kicker: "Recovery and longevity",
    headline: "Stay sharp, recover faster, age on your terms.",
    lead:
      "Peptide and metabolic protocols under physician supervision. Built for sleep, recovery, and long-term performance.",
    extendedLead:
      "Longevity care at TIDL is physician-supervised, not supplement-store guesswork. Whether you need recovery support after training or metabolic protocols for long-term health, a licensed provider reviews your goals and prescribes only when appropriate.",
    heroImage: SITE_IMAGES.services.longevity,
    productSlugs: ["longevity-peptides", "performance-recovery"],
    pillars: [
      {
        title: "Peptide protocols",
        body: "Physician-supervised plans for recovery, sleep, and metabolic health tailored to your goals.",
      },
      {
        title: "Performance support",
        body: "Programs for athletes and high performers who want measurable recovery between sessions.",
      },
      {
        title: "Discreet ongoing care",
        body: "Message your care team, reorder, and adjust without clinic visits or long hold times.",
      },
      {
        title: "Pen or prescription format",
        body: "Select peptide treatments use the pre-dosed TIDL Pen. Others ship as physician-directed protocols.",
      },
      {
        title: "Evidence-guided plans",
        body: "Protocols built on clinical guidance, not trending ingredients with no medical oversight.",
      },
      {
        title: "Private, end to end",
        body: "Secure intake, discreet shipping, and confidential messaging with your care team.",
      },
    ],
    educationTitle: "Longevity and recovery care, done right",
    educationBlocks: [
      {
        title: "What are peptides?",
        body: "Peptides are short chains of amino acids your body already uses as signals. Peptide therapy uses specific compounds, prescribed by a provider, to support goals like recovery, sleep quality, and metabolic health.",
      },
      {
        title: "Pen vs. prescription protocol",
        body: "Some longevity treatments ship in the pre-dosed TIDL Pen for a simple weekly routine. Others arrive as physician-directed prescription protocols. Your provider recommends the format that fits your plan.",
      },
      {
        title: "Built for the long run",
        body: "Recovery and longevity are not one-time purchases. Your care team monitors how you respond, answers questions, and adjusts your protocol as your training load or health goals change.",
      },
    ],
    howItWorks: [
      {
        step: "01",
        label: "Define your goals",
        detail: "Recovery, sleep, metabolic health, or performance. Your intake captures what you want to improve.",
        duration: "~5 min",
      },
      {
        step: "02",
        label: "Provider review",
        detail: "A licensed doctor evaluates whether peptide or metabolic therapy is right for you.",
        duration: "Same day",
      },
      {
        step: "03",
        label: "Protocol set",
        detail: "Pen or prescription format chosen for your treatment. Dose set to your plan.",
        duration: "Personalized",
      },
      {
        step: "04",
        label: "Discreet delivery",
        detail: "Shipped from a licensed US pharmacy with cold-chain packaging when required.",
        duration: "2–5 days",
      },
      {
        step: "05",
        label: "Iterate with your team",
        detail: "Message your care team, track recovery, and refine your protocol over time.",
        duration: "Ongoing",
      },
    ],
    penSpotlight: {
      kicker: "TIDL Pen for peptides",
      title: "Recovery protocols, pre-dosed.",
      lead:
        "Select longevity peptide treatments ship in the TIDL Pen. Your dose is set before delivery so your weekly routine stays simple and consistent.",
      image: SITE_IMAGES.pen,
      features: [
        {
          num: "01",
          title: "Physician-set dose",
          body: "Your provider determines the dose. The pen is prepared to match.",
        },
        {
          num: "02",
          title: "Simple weekly routine",
          body: "No mixing or measuring. One consistent injection schedule.",
        },
        {
          num: "03",
          title: "Travel-ready format",
          body: "Compact pen design fits real life, including training and travel.",
        },
        {
          num: "04",
          title: "Cold-chain delivery",
          body: "Insulated packaging protects temperature-sensitive compounds in transit.",
        },
      ],
      trustNote: "Prescription required. Not all longevity treatments use the pen.",
    },
    faqItems: [
      {
        id: 1,
        q: "Are TIDL peptide programs legitimate?",
        a: "Yes. Peptide and metabolic protocols are prescribed only after a licensed provider reviews your intake and determines treatment is medically appropriate.",
      },
      {
        id: 2,
        q: "Do all longevity treatments use the TIDL Pen?",
        a: "No. Some protocols use the pre-dosed pen; others ship as prescription treatments. Your provider recommends the right format for your plan.",
      },
      {
        id: 3,
        q: "Who supervises my protocol?",
        a: "A licensed medical provider in your state reviews your intake, prescribes when appropriate, and remains available for follow-up through telehealth.",
      },
      {
        id: 4,
        q: "Is shipping discreet?",
        a: "Yes. Plain outer packaging with no indication of contents on the box.",
      },
      {
        id: 5,
        q: "Can I adjust my protocol over time?",
        a: "Absolutely. Message your care team as your training, sleep, or recovery needs change.",
      },
    ],
    ctaLabel: "Explore longevity programs",
    metaTitle: "Longevity & Recovery | Tidl Health",
    metaDescription:
      "Learn how TIDL longevity and performance programs support recovery, sleep, and metabolic health.",
    trustStats: TRUST_STATS,
    trustPillars: TRUST_PILLARS,
  },
};

export function getCategory(slug: CategorySlug): CategoryDefinition {
  return CATEGORIES[slug];
}
