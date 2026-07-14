import { SITE_IMAGES } from "@/lib/site-assets";

export type Testimonial = {
  name: string;
  quote: string;
  condition: string;
  result: string;
  role: string;
  featured?: boolean;
  portraitImage: string;
  contextImage: string;
  /** When “man”, review media is rendered smaller on PDP. */
  figure?: "man" | "woman";
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Elena V.",
    quote:
      "Five-minute quiz, doctor review, treatment at my door. Down 18 pounds in 14 weeks — finally feeling like myself again.",
    condition: "Weight Loss",
    result: "−18 lbs in 14 weeks*",
    role: "Verified Patient",
    featured: true,
    portraitImage: SITE_IMAGES.testimonialPortraits.woman,
    contextImage: SITE_IMAGES.testimonialContext[0],
    figure: "woman",
  },
  {
    name: "James R.",
    quote:
      "No waiting rooms, no awkward visits. The care team responds, reordering takes one tap. Genuinely the easiest health decision I've made.",
    condition: "GLP-1 Care",
    result: "−14 lbs in 10 weeks*",
    role: "Verified Patient",
    portraitImage: SITE_IMAGES.testimonialPortraits.man,
    contextImage: SITE_IMAGES.testimonialContext[1],
    figure: "man",
  },
  {
    name: "Priya N.",
    quote:
      "Felt legitimate from day one — real doctors, real pharmacy, clear instructions. Three months in and the results speak for themselves.",
    condition: "Metabolic Health",
    result: "−11 lbs in 12 weeks*",
    role: "Verified Patient",
    portraitImage: SITE_IMAGES.testimonialPortraits.woman,
    contextImage: SITE_IMAGES.testimonialContext[2],
    figure: "woman",
  },
];

export const GLP1_TESTIMONIALS: Testimonial[] = [
  {
    name: "Elena V.",
    quote:
      "Five-minute quiz, doctor review, treatment at my door. Down 18 pounds in 14 weeks — finally feeling like myself again.",
    condition: "Weight Loss",
    result: "−18 lbs in 14 weeks*",
    role: "Verified Patient",
    featured: true,
    portraitImage: SITE_IMAGES.testimonialPortraits.woman,
    contextImage: SITE_IMAGES.testimonialContext[0],
    figure: "woman",
  },
  {
    name: "Priya N.",
    quote:
      "What I appreciated most was how medical it felt without being clinical. A real provider reviewed my intake, the pharmacy shipped discreetly, and messaging the care team actually gets a response.",
    condition: "GLP-1 Care",
    result: "4 months in",
    role: "Verified Patient",
    portraitImage: SITE_IMAGES.testimonialPortraits.woman,
    contextImage: SITE_IMAGES.testimonialContext[2],
    figure: "woman",
  },
  {
    name: "James R.",
    quote:
      "The protocol felt clear from day one. No confusion — just my prescribed dose, ready when I needed it. I've lost weight steadily without turning my kitchen into a lab.",
    condition: "GLP-1 Weight Loss",
    result: "−12 lbs",
    role: "Verified Patient",
    portraitImage: SITE_IMAGES.testimonialPortraits.man,
    contextImage: SITE_IMAGES.testimonialContext[1],
    figure: "man",
  },
];

/** Peptide PDP reviews — women featured first; media from sandbox peptide assets only. */
export const PEPTIDE_TESTIMONIALS: Testimonial[] = [
  {
    name: "Elena V.",
    quote:
      "I finally felt like the plan was built for me — not a generic peptide from who-knows-where. Provider reviewed everything, pharmacy shipped discreetly, and the vial arrived labeled clearly.",
    condition: "Peptide Care",
    result: "12 weeks in",
    role: "Verified Patient",
    featured: true,
    portraitImage: SITE_IMAGES.testimonialPortraits.woman,
    contextImage: "/peptides/ba/bpc-157-after.png",
    figure: "woman",
  },
  {
    name: "Priya N.",
    quote:
      "Recovery stopped feeling like a guessing game. Clear dosing from my provider, US pharmacy vial, and someone to message when I had questions.",
    condition: "Recovery",
    result: "Protocol month 2",
    role: "Verified Patient",
    portraitImage: SITE_IMAGES.testimonialPortraits.woman,
    contextImage: "/peptides/ba/tb-500-after.png",
    figure: "woman",
  },
  {
    name: "James R.",
    quote:
      "No gray-market bottles. Real prescription, real pharmacy label, real follow-up. That alone made me trust the process.",
    condition: "Performance",
    result: "Verified order",
    role: "Verified Patient",
    portraitImage: SITE_IMAGES.testimonialPortraits.man,
    contextImage: "/peptides/ba/wolverine-after.png",
    figure: "man",
  },
];
