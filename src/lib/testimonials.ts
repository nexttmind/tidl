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
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah M.",
    quote:
      "Five-minute quiz, doctor review, treatment at my door. Down 18 pounds in 14 weeks — finally feeling like myself again.",
    condition: "Weight Loss",
    result: "−18 lbs in 14 weeks*",
    role: "Verified Patient",
    featured: true,
    portraitImage: SITE_IMAGES.testimonialPortraits.woman,
    contextImage: SITE_IMAGES.testimonialContext[0],
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
  },
  {
    name: "Daniel K.",
    quote:
      "Felt legitimate from day one — real doctors, real pharmacy, clear pen instructions. Three months in and the results speak for themselves.",
    condition: "Metabolic Health",
    result: "−11 lbs in 12 weeks*",
    role: "Verified Patient",
    portraitImage: SITE_IMAGES.testimonialPortraits.man,
    contextImage: SITE_IMAGES.testimonialContext[2],
  },
];

export const GLP1_TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah M.",
    quote:
      "Five-minute quiz, doctor review, treatment at my door. Down 18 pounds in 14 weeks — finally feeling like myself again.",
    condition: "Weight Loss",
    result: "−18 lbs in 14 weeks*",
    role: "Verified Patient",
    featured: true,
    portraitImage: SITE_IMAGES.testimonialPortraits.woman,
    contextImage: SITE_IMAGES.testimonialContext[0],
  },
  {
    name: "Marcus T.",
    quote:
      "The pen made this feel manageable from day one. No mixing, no confusion — just my dose, ready to go. I've lost weight steadily without feeling like I'm running a science experiment in my kitchen.",
    condition: "GLP-1 Weight Loss",
    result: "−12 lbs",
    role: "Verified Patient",
    portraitImage: SITE_IMAGES.testimonialPortraits.man,
    contextImage: SITE_IMAGES.testimonialContext[1],
  },
  {
    name: "Elena V.",
    quote:
      "What I appreciated most was how medical it felt without being clinical. A real provider reviewed my intake, the pharmacy shipped discreetly, and messaging the care team actually gets a response.",
    condition: "GLP-1 Care",
    result: "4 months in",
    role: "Verified Patient",
    portraitImage: SITE_IMAGES.testimonialPortraits.woman,
    contextImage: SITE_IMAGES.testimonialContext[2],
  },
];
