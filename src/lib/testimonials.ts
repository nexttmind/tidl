import { SITE_IMAGES } from "@/lib/site-assets";

export type Testimonial = {
  name: string;
  quote: string;
  condition: string;
  result: string;
  role: string;
  featured?: boolean;
  contextImage: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah M.",
    quote:
      "I'd been putting this off for years because I thought it would be complicated. It wasn't. The quiz took five minutes, a doctor reviewed everything, and my treatment showed up a few days later. Down 18 pounds and finally feeling like myself again.",
    condition: "Weight Loss",
    result: "−18 lbs",
    role: "Verified Patient",
    featured: true,
    contextImage: SITE_IMAGES.testimonialContext[0],
  },
  {
    name: "James R.",
    quote:
      "What sold me was how discreet and simple it was. No waiting rooms, no awkward conversations. The care team actually answers when I message them, and reordering takes one tap. Genuinely the easiest health decision I've made.",
    condition: "GLP-1 Care",
    result: "3 months in",
    role: "Verified Patient",
    contextImage: SITE_IMAGES.testimonialContext[1],
  },
  {
    name: "Daniel K.",
    quote:
      "I was skeptical about doing this online, but everything felt legitimate from the start. Real doctors, a real pharmacy, clear instructions with the pen. Three months in and the results speak for themselves.",
    condition: "Metabolic Health",
    result: "Verified patient",
    role: "Verified Patient",
    contextImage: SITE_IMAGES.testimonialContext[2],
  },
];

export const GLP1_TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah M.",
    quote:
      "I'd been putting this off for years because I thought it would be complicated. It wasn't. The quiz took five minutes, a doctor reviewed everything, and my treatment showed up a few days later. Down 18 pounds and finally feeling like myself again.",
    condition: "Weight Loss",
    result: "−18 lbs",
    role: "Verified Patient",
    featured: true,
    contextImage: SITE_IMAGES.testimonialContext[0],
  },
  {
    name: "Marcus T.",
    quote:
      "The pen made this feel manageable from day one. No mixing, no confusion — just my dose, ready to go. I've lost weight steadily without feeling like I'm running a science experiment in my kitchen.",
    condition: "GLP-1 Weight Loss",
    result: "−12 lbs",
    role: "Verified Patient",
    contextImage: SITE_IMAGES.testimonialContext[1],
  },
  {
    name: "Elena V.",
    quote:
      "What I appreciated most was how medical it felt without being clinical. A real provider reviewed my intake, the pharmacy shipped discreetly, and messaging the care team actually gets a response.",
    condition: "GLP-1 Care",
    result: "4 months in",
    role: "Verified Patient",
    contextImage: SITE_IMAGES.testimonialContext[2],
  },
];
