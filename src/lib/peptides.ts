import type { CategorySlug } from "@/lib/categories";
import type { ProductForm, CatalogProduct } from "@/lib/product-catalog";
import type { Product } from "@/lib/products";
import type { GoalId, ProductSlug } from "@/types/quiz";
import type { PdpMarketing, PdpPageContent } from "@/components/pdp/data/types";
import { buildGoalMarketing } from "@/lib/pdp-marketing";
import { resolvePeptideOnlyImage, getPeptideHandBox } from "@/lib/peptide-images";
import {
  SHARED_SAFETY_PILLARS,
  SHARED_REVIEW_STATS,
  SHARED_START_FAQ,
  SHARED_DELIVERY_FAQ,
  SHARED_CARE_FAQ,
} from "@/components/pdp/data/glp1-pdp-content";
import { PEPTIDE_TESTIMONIALS } from "@/lib/testimonials";

/**
 * Peptide product definitions — the real products TIDL sells.
 *
 * `prxEncounterSlug` / `prxProductTypeSlug` map each peptide to PrescribeRx so
 * checkout creates the right encounter. Slugs are best-guess defaults and can be
 * overridden with env vars (see src/lib/prescribe-rx/env.ts). GLP-1 peptides use
 * the `glp-1-screening` encounter; all other peptides use `peptide-assessment`.
 */
export type PeptideDef = {
  slug: Exclude<ProductSlug, "glp-1-weight-loss">;
  compound: string;
  productName: string;
  brandName: string;
  category: CategorySlug;
  goal: GoalId;
  form: ProductForm;
  tag: string;
  descriptor: string;
  monthlyPrice: number;
  dosage: string;
  /** One-line marketing hook (persuasive, outcome-driven). */
  hook: string;
  summary: string;
  outcomes: readonly string[];
  benefits: readonly { title: string; detail: string }[];
  faqExtra: readonly { q: string; a: string }[];
  image: string;
  prxEncounterSlug: string;
  prxProductTypeSlug: string;
};

export const PEPTIDE_DEFS: readonly PeptideDef[] = [
  {
    slug: "retatrutide",
    compound: "Retatrutide",
    productName: "Retatrutide Weight Loss",
    brandName: "Retatrutide",
    category: "weight-loss",
    goal: "weight-loss",
    form: "vial",
    tag: "Weight loss · Next-gen triple agonist",
    descriptor: "Triple-agonist injectable · Prescription only",
    monthlyPrice: 349,
    dosage: "Personalized weekly dose",
    hook: "The next generation of weight loss. When semaglutide and tirzepatide aren't enough.",
    summary:
      "Retatrutide is a next-gen triple-receptor agonist prescribed for significant appetite control and weight loss — especially when standard GLP-1s plateau. Physician-reviewed, US-pharmacy dispensed. Every plan includes a TIDL Pen with clear how-to instructions.",
    outcomes: [
      "Powerful appetite control",
      "Built for GLP-1 plateaus",
      "Doctor-guided titration",
      "Pen + how-to included",
    ],
    benefits: [
      {
        title: "Triple-pathway power",
        detail:
          "Targets three metabolic pathways for stronger appetite suppression and weight-loss support than single-target GLP-1s.",
      },
      {
        title: "Built for plateaus",
        detail: "Prescribed when semaglutide or tirzepatide stop delivering the progress you need.",
      },
      {
        title: "Personalized titration",
        detail: "Your provider ramps your weekly dose safely based on your response and labs when needed.",
      },
      {
        title: "Pen + how to use",
        detail: "Every shipment includes a TIDL Pen and a clear how-to — dial, click, inject. No guessing.",
      },
    ],
    faqExtra: [
      {
        q: "How is retatrutide different from Ozempic/Mounjaro?",
        a: "Retatrutide acts on three receptors instead of one or two, which can drive greater appetite suppression and weight loss. It is prescribed only after provider review.",
      },
      {
        q: "Do I get a pen with retatrutide?",
        a: "Yes. Every TIDL peptide plan includes a pen and how-to instructions so you know exactly how to take your prescribed dose.",
      },
    ],
    image: resolvePeptideOnlyImage("retatrutide"),
    prxEncounterSlug: "glp-1-screening",
    prxProductTypeSlug: "retatrutide",
  },
  {
    slug: "bpc-157",
    compound: "BPC-157",
    productName: "BPC-157 Recovery",
    brandName: "BPC-157",
    category: "recovery",
    goal: "recovery",
    form: "vial",
    tag: "Recovery · Healing peptide",
    descriptor: "Injectable peptide · Clinician-directed",
    monthlyPrice: 199,
    dosage: "Provider-set daily protocol",
    hook: "Heal faster. The body-protection peptide athletes swear by.",
    summary:
      "A body-protection peptide used in clinician-directed protocols to support tissue repair, gut health, and recovery from training.",
    outcomes: [
      "Faster tissue repair",
      "Joint & tendon support",
      "Gut-health support",
      "Bounce back from training",
    ],
    benefits: [
      { title: "Recovery support", detail: "Used to support repair of muscle, tendon, and connective tissue." },
      { title: "Gut-health protocols", detail: "Studied for supporting the gut lining and digestive comfort." },
      { title: "Clinician-directed", detail: "Dose and cycle set by a licensed provider for your goals." },
    ],
    faqExtra: [
      { q: "What is BPC-157 used for?", a: "BPC-157 is a peptide used in clinician-directed protocols to support recovery, tissue repair, and gut health. A licensed provider decides if it's appropriate for you." },
    ],
    image: resolvePeptideOnlyImage("bpc-157"),
    prxEncounterSlug: "peptide-assessment",
    prxProductTypeSlug: "bpc-157",
  },
  {
    slug: "tb-500",
    compound: "TB-500",
    productName: "TB-500 Recovery",
    brandName: "TB-500",
    category: "recovery",
    goal: "recovery",
    form: "vial",
    tag: "Recovery · Repair peptide",
    descriptor: "Injectable peptide · Clinician-directed",
    monthlyPrice: 209,
    dosage: "Provider-set weekly protocol",
    hook: "Recover like it's your job. Support for flexibility, repair, and endurance.",
    summary:
      "A repair-focused peptide used in physician-supervised protocols to support flexibility, recovery, and tissue health.",
    outcomes: [
      "Whole-body recovery",
      "Flexibility support",
      "Endurance & repair",
      "Physician-supervised",
    ],
    benefits: [
      { title: "Systemic recovery", detail: "Used to support recovery across muscle and connective tissue." },
      { title: "Flexibility & mobility", detail: "Popular in protocols aimed at mobility and range of motion." },
      { title: "Pairs with BPC-157", detail: "Often combined for a fuller recovery stack (see Wolverine blend)." },
    ],
    faqExtra: [
      { q: "Can I combine TB-500 with BPC-157?", a: "Yes — many recovery protocols pair them. TIDL also offers the pre-blended Wolverine option. Your provider decides what's appropriate." },
    ],
    image: resolvePeptideOnlyImage("tb-500"),
    prxEncounterSlug: "peptide-assessment",
    prxProductTypeSlug: "tb-500",
  },
  {
    slug: "wolverine",
    compound: "BPC-157 / TB-500",
    productName: "Wolverine Recovery Blend",
    brandName: "Wolverine",
    category: "recovery",
    goal: "recovery",
    form: "vial",
    tag: "Recovery · Blend",
    descriptor: "BPC-157 + TB-500 blend · Clinician-directed",
    monthlyPrice: 289,
    dosage: "Provider-set protocol",
    hook: "The ultimate recovery stack. BPC-157 and TB-500 in one protocol.",
    summary:
      "A pre-blended recovery protocol combining BPC-157 and TB-500 for comprehensive tissue repair support, physician-supervised.",
    outcomes: [
      "Full-spectrum recovery",
      "Repair + flexibility",
      "One simple protocol",
      "Physician-supervised",
    ],
    benefits: [
      { title: "Two peptides, one protocol", detail: "Combines the repair support of BPC-157 with the recovery profile of TB-500." },
      { title: "Convenience", detail: "One provider-set routine instead of managing two separately." },
      { title: "For hard trainers", detail: "Built for athletes and high performers pushing recovery limits." },
    ],
    faqExtra: [
      { q: "Why choose the blend over separate peptides?", a: "The Wolverine blend simplifies a two-peptide recovery stack into one protocol. Your provider confirms it fits your goals." },
    ],
    image: resolvePeptideOnlyImage("wolverine"),
    prxEncounterSlug: "peptide-assessment",
    prxProductTypeSlug: "wolverine",
  },
  {
    slug: "cjc-1295-ipamorelin",
    compound: "CJC-1295 / Ipamorelin",
    productName: "CJC-1295 + Ipamorelin",
    brandName: "CJC-1295 / Ipamorelin",
    category: "performance",
    goal: "performance",
    form: "vial",
    tag: "Performance · Growth-hormone support",
    descriptor: "Injectable peptide blend · Clinician-directed",
    monthlyPrice: 259,
    dosage: "Provider-set nightly protocol",
    hook: "Train harder, sleep deeper, recover faster. Growth-hormone support, done right.",
    summary:
      "A growth-hormone-releasing peptide blend used in physician-supervised protocols to support lean muscle, recovery, and sleep quality.",
    outcomes: [
      "Lean muscle support",
      "Deeper sleep",
      "Better recovery",
      "Physician-supervised",
    ],
    benefits: [
      { title: "GH support", detail: "Encourages the body's own growth-hormone release rather than replacing it." },
      { title: "Sleep & recovery", detail: "Commonly used to support sleep quality and overnight recovery." },
      { title: "Body composition", detail: "Popular in protocols aimed at lean muscle and performance." },
    ],
    faqExtra: [
      { q: "Is this the same as taking HGH?", a: "No. These peptides support your body's own growth-hormone release. A licensed provider decides if a protocol is appropriate for you." },
    ],
    image: resolvePeptideOnlyImage("cjc-1295-ipamorelin"),
    prxEncounterSlug: "peptide-assessment",
    prxProductTypeSlug: "cjc-1295-ipamorelin",
  },
  {
    slug: "tesamorelin",
    compound: "Tesamorelin",
    productName: "Tesamorelin",
    brandName: "Tesamorelin",
    category: "performance",
    goal: "performance",
    form: "vial",
    tag: "Performance · Body composition",
    descriptor: "Injectable peptide · Clinician-directed",
    monthlyPrice: 279,
    dosage: "Provider-set daily protocol",
    hook: "Target stubborn fat. Support lean body composition and metabolism.",
    summary:
      "A growth-hormone-releasing peptide used in physician-supervised protocols to support reductions in stubborn fat and healthy body composition.",
    outcomes: [
      "Targets stubborn fat",
      "Lean body composition",
      "Metabolic support",
      "Physician-supervised",
    ],
    benefits: [
      { title: "Body-composition support", detail: "Used in protocols aimed at reducing stubborn abdominal fat." },
      { title: "Metabolic support", detail: "Encourages the body's growth-hormone axis for metabolism." },
      { title: "Clinician-directed", detail: "Dose and cycle set by a licensed provider." },
    ],
    faqExtra: [
      { q: "Who is tesamorelin for?", a: "It's used in physician-supervised protocols for body composition and metabolic goals. Appropriateness is determined by provider review." },
    ],
    image: resolvePeptideOnlyImage("tesamorelin"),
    prxEncounterSlug: "peptide-assessment",
    prxProductTypeSlug: "tesamorelin",
  },
  {
    slug: "mots-c",
    compound: "MOTS-C",
    productName: "MOTS-C Metabolic",
    brandName: "MOTS-C",
    category: "metabolic-health",
    goal: "metabolic-health",
    form: "vial",
    tag: "Metabolic · Energy peptide",
    descriptor: "Injectable peptide · Clinician-directed",
    monthlyPrice: 219,
    dosage: "Provider-set protocol",
    hook: "Energy from the inside out. The mitochondrial peptide for metabolism.",
    summary:
      "A mitochondrial-derived peptide used in physician-supervised protocols to support energy, metabolism, and exercise capacity.",
    outcomes: [
      "Cellular energy support",
      "Metabolic health",
      "Exercise capacity",
      "Physician-supervised",
    ],
    benefits: [
      { title: "Mitochondrial support", detail: "Derived from mitochondrial DNA and studied for cellular energy." },
      { title: "Metabolic goals", detail: "Used in protocols aimed at metabolism and body composition." },
      { title: "Active lifestyles", detail: "Popular with people focused on energy and exercise capacity." },
    ],
    faqExtra: [
      { q: "What does MOTS-C do?", a: "MOTS-C is a mitochondrial-derived peptide studied for energy and metabolic support. A provider decides if it's appropriate for you." },
    ],
    image: resolvePeptideOnlyImage("mots-c"),
    prxEncounterSlug: "peptide-assessment",
    prxProductTypeSlug: "mots-c",
  },
  {
    slug: "nad-plus",
    compound: "NAD+",
    productName: "NAD+ Longevity",
    brandName: "NAD+",
    category: "longevity",
    goal: "longevity",
    form: "vial",
    tag: "Longevity · Cellular health",
    descriptor: "Injectable · Clinician-directed",
    monthlyPrice: 229,
    dosage: "Provider-set protocol",
    hook: "Age on your terms. Fuel the coenzyme your cells run on.",
    summary:
      "A coenzyme central to cellular energy and repair, used in physician-supervised longevity protocols to support energy, focus, and healthy aging.",
    outcomes: [
      "Cellular energy",
      "Mental clarity",
      "Healthy-aging support",
      "Physician-supervised",
    ],
    benefits: [
      { title: "Cellular fuel", detail: "NAD+ is a coenzyme essential to energy production and repair." },
      { title: "Focus & clarity", detail: "Popular in protocols aimed at mental clarity and energy." },
      { title: "Longevity protocols", detail: "A cornerstone of physician-supervised healthy-aging plans." },
    ],
    faqExtra: [
      { q: "Why do NAD+ levels matter?", a: "NAD+ is central to how cells make energy and repair themselves, and levels decline with age. Protocols are provider-directed." },
    ],
    image: resolvePeptideOnlyImage("nad-plus"),
    prxEncounterSlug: "peptide-assessment",
    prxProductTypeSlug: "nad-plus",
  },
  {
    slug: "ghk-cu",
    compound: "GHK-Cu",
    productName: "GHK-Cu Skin & Repair",
    brandName: "GHK-Cu",
    category: "longevity",
    goal: "longevity",
    form: "vial",
    tag: "Longevity · Skin & repair",
    descriptor: "Copper peptide · Clinician-directed",
    monthlyPrice: 199,
    dosage: "Provider-set protocol",
    hook: "Look as young as you feel. The copper peptide for skin and repair.",
    summary:
      "A copper peptide used in physician-supervised protocols to support skin quality, hair, and tissue repair.",
    outcomes: [
      "Skin quality support",
      "Hair & repair",
      "Anti-aging protocols",
      "Physician-supervised",
    ],
    benefits: [
      { title: "Skin & collagen", detail: "Studied for supporting skin firmness, tone, and collagen." },
      { title: "Repair support", detail: "Used in protocols aimed at tissue and hair health." },
      { title: "Clinician-directed", detail: "Dose and format set by a licensed provider." },
    ],
    faqExtra: [
      { q: "Is GHK-Cu topical or injectable?", a: "TIDL protocols are clinician-directed; your provider recommends the appropriate format for your goals." },
    ],
    image: resolvePeptideOnlyImage("ghk-cu"),
    prxEncounterSlug: "peptide-assessment",
    prxProductTypeSlug: "ghk-cu",
  },
  {
    slug: "sermorelin",
    compound: "Sermorelin",
    productName: "Sermorelin",
    brandName: "Sermorelin",
    category: "longevity",
    goal: "longevity",
    form: "vial",
    tag: "Longevity · GH support",
    descriptor: "Injectable peptide · Clinician-directed",
    monthlyPrice: 239,
    dosage: "Provider-set nightly protocol",
    hook: "Turn back the clock on energy and recovery. Gentle growth-hormone support.",
    summary:
      "A growth-hormone-releasing peptide used in physician-supervised protocols to support energy, sleep, recovery, and healthy aging.",
    outcomes: [
      "Energy & vitality",
      "Sleep support",
      "Recovery & aging",
      "Physician-supervised",
    ],
    benefits: [
      { title: "GH axis support", detail: "Encourages the body's own growth-hormone release." },
      { title: "Sleep & energy", detail: "Commonly used to support sleep quality and daytime energy." },
      { title: "Healthy aging", detail: "A staple of physician-supervised longevity protocols." },
    ],
    faqExtra: [
      { q: "How is sermorelin taken?", a: "Typically a provider-set nightly protocol. A licensed provider confirms it's appropriate for you." },
    ],
    image: resolvePeptideOnlyImage("sermorelin"),
    prxEncounterSlug: "peptide-assessment",
    prxProductTypeSlug: "sermorelin",
  },
];

export function getPeptideDef(slug: ProductSlug): PeptideDef | undefined {
  return PEPTIDE_DEFS.find((p) => p.slug === slug);
}

/**
 * Keywords used to match each product to a live sandbox catalog product
 * (catalog names look like "BPC-157 - 10MG Lyophiliozed"). First keyword that
 * appears in a catalog product name wins. Includes the GLP-1 flagship.
 */
export const CATALOG_KEYWORDS: Record<string, readonly string[]> = {
  "glp-1-weight-loss": ["tirzepatide", "semaglutide"],
  retatrutide: ["reta 100", "reta 60", "reta 200", "retatrutide", "reta "],
  "bpc-157": ["bpc-157 10mg", "bpc-157 20mg", "bpc-157"],
  "tb-500": ["tb-500 10mg", "tb-500"],
  wolverine: ["wolverine bpc-157 10mg tb-500 10mg 10ml", "wolverine bpc-157", "wolverine"],
  "cjc-1295-ipamorelin": ["cjc-1295/ipamorelin", "cjc (no dac)/ipamorelin", "cjc"],
  tesamorelin: ["tesamorelin"],
  "mots-c": ["mots-c", "mots"],
  "nad-plus": ["nad+", "nad -", "nad "],
  "ghk-cu": ["ghk-cu", "ghk"],
  sermorelin: ["sermorelin"],
};

function buildMarketing(def: PeptideDef): PdpMarketing {
  return buildGoalMarketing(def.goal, def.hook, def.compound, [
    `/peptides/ba/${def.slug}-before.png`,
    `/peptides/ba/${def.slug}-after.png`,
  ]);
}

/** PRX encounter/product slug map for checkout, keyed by product slug. */
export const PEPTIDE_PRX_SLUGS: Record<string, { encounter: string; product: string }> =
  Object.fromEntries(
    PEPTIDE_DEFS.map((p) => [p.slug, { encounter: p.prxEncounterSlug, product: p.prxProductTypeSlug }]),
  );

export function peptideToProduct(def: PeptideDef): Product {
  return {
    slug: def.slug,
    name: def.productName,
    brandName: def.brandName,
    tag: def.tag,
    description: def.summary,
    dosage: def.dosage,
    monthlyPrice: def.monthlyPrice,
    goal: def.goal,
    image: def.image,
    outcomes: def.outcomes,
  };
}

export function peptideToCatalogProduct(def: PeptideDef): CatalogProduct {
  return {
    slug: def.slug,
    categorySlug: def.category,
    form: def.form,
    shortName: def.compound,
    headline: def.hook,
    summary: def.summary,
    image: def.image,
    highlights: [
      "Licensed provider review",
      "TIDL Pen + how-to",
      "US pharmacy fulfillment",
      "Discreet shipping",
    ],
  };
}

export function peptideToPdpContent(def: PeptideDef): PdpPageContent {
  const box = getPeptideHandBox(def.slug);
  const isWeightLoss = def.goal === "weight-loss";
  const benefitSpecs = def.benefits.map((b) => ({
    label: b.title,
    detail: b.detail,
  }));

  const customerSpecs = isWeightLoss
    ? [
        ...benefitSpecs,
        { label: "Weekly protocol", detail: def.dosage },
        { label: "How to use the pen", detail: box.administration },
        { label: "Storage", detail: box.storage },
        {
          label: "US pharmacy fill",
          detail: "Licensed compounding & fulfillment after provider approval.",
        },
      ]
    : [
        { label: "What it does", detail: def.summary },
        ...benefitSpecs,
        { label: "Provider dose", detail: def.dosage },
        { label: "How to use the pen", detail: box.administration },
        { label: "Storage", detail: box.storage },
        {
          label: "US pharmacy fill",
          detail: "Licensed compounding & fulfillment after provider approval.",
        },
      ];

  return {
    slug: def.slug,
    goal: def.goal,
    productForm: def.form,
    marketing: buildMarketing(def),
    heroImage: def.image,
    penImage: def.image,
    showPenShowcase: false,
    heroProduct: {
      name: def.productName,
      descriptor: def.descriptor,
      summary: def.summary,
      rating: 4.9,
      reviewCount: isWeightLoss ? "180+" : "120+",
      startingPrice: def.monthlyPrice,
      priceNote: "Includes provider review, prescription, pen & discreet delivery",
      perks: [
        { label: "Doctor prescription", detail: box.rxNote },
        { label: "TIDL Pen included", detail: "Clear how-to with every shipment" },
        { label: "Discreet delivery", detail: "Plain packaging · cold-chain when needed" },
      ],
      specs: customerSpecs,
      trustNote:
        "Individual results vary. Prescription required. Your provider decides if treatment is right for you.",
      ctaLabel: "See if you qualify",
    },
    outcomePhrases: def.outcomes,
    includedPhrases: box.boxContents,
    includedItems: [
      {
        id: "provider",
        num: "01",
        title: "Licensed provider review",
        detail: "A doctor in your state reviews your intake before anything is prescribed.",
        callsign: "REVIEW",
        shortLabel: "Provider",
      },
      {
        id: "protocol",
        num: "02",
        title: isWeightLoss ? `Personalized ${def.compound} plan` : "Personalized protocol",
        detail: `Your ${def.compound} dose is set to your assessment — not a one-size protocol.`,
        callsign: "PROTOCOL",
        shortLabel: "Protocol",
        accent: true,
      },
      {
        id: "pen",
        num: "03",
        title: "TIDL Pen + how to use",
        detail:
          "Every peptide plan ships with a pen and a clear how-to so you know exactly what to do each dose.",
        callsign: "PEN",
        shortLabel: "Pen",
      },
      {
        id: "med",
        num: "04",
        title: "Pharmacy-grade medication",
        detail: `Dispensed by a licensed US pharmacy. ${box.storage}`,
        callsign: "MED",
        shortLabel: "Meds",
      },
      {
        id: "care",
        num: "05",
        title: "Ongoing care",
        detail: "Message your care team anytime about treatment, side effects, or progress.",
        callsign: "CARE",
        shortLabel: "Care",
      },
    ],
    safetyPillars: SHARED_SAFETY_PILLARS,
    reviews: PEPTIDE_TESTIMONIALS,
    reviewStats: SHARED_REVIEW_STATS,
    verticalTimeline: [
      {
        step: "01",
        label: "Start your intake",
        detail: "Answer a few health questions on your phone. It doubles as your medical intake.",
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
        label: "Protocol + pen guide",
        detail: `Your ${def.compound} plan is personalized. Your TIDL Pen arrives with clear how-to instructions.`,
        duration: "Personalized",
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
        detail: "Message your care team, adjust your protocol, and reorder with one tap.",
        duration: "Always on",
      },
    ],
    faqItems: [
      ...SHARED_START_FAQ,
      ...def.faqExtra.map((f, i) => ({ id: 100 + i, cat: "start" as const, q: f.q, a: f.a })),
      {
        id: 50,
        cat: "treat" as const,
        q: "Do I get a pen with this peptide?",
        a: "Yes. Every TIDL peptide plan includes a pen and a step-by-step how-to. Your provider sets the dose — you follow the guide: prepare, dial, inject.",
      },
      ...SHARED_DELIVERY_FAQ,
      ...SHARED_CARE_FAQ,
    ],
  };
}

export function peptideToPdpMeta(def: PeptideDef): { title: string; description: string } {
  return {
    title: `${def.productName} | Tidl Health`,
    description: `${def.hook} ${def.summary} Take a 5-minute quiz and get reviewed by a licensed provider.`,
  };
}
