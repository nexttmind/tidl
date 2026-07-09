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

export const TRT_TESTIMONIALS: Testimonial[] = [
  {
    name: "David P.",
    quote:
      "My energy was flat for years and I kept blaming work. Labs confirmed what I suspected, and my provider built a plan I could actually stick to. I feel sharper, stronger, and more like myself again.",
    condition: "Testosterone Therapy",
    result: "Energy restored",
    role: "Verified Patient",
    featured: true,
    contextImage: SITE_IMAGES.testimonialContext[0],
  },
  {
    name: "Chris L.",
    quote:
      "I didn't want another clinic runaround. TIDL handled intake online, coordinated my labs, and kept everything discreet. The protocol feels personalized — not one-size-fits-all.",
    condition: "TRT",
    result: "6 weeks in",
    role: "Verified Patient",
    contextImage: SITE_IMAGES.testimonialContext[1],
  },
  {
    name: "Andre W.",
    quote:
      "The follow-up care is what sold me. When my levels shifted, my provider adjusted the plan without me chasing appointments. It's the first time TRT has felt properly managed.",
    condition: "Hormonal Health",
    result: "Lab-guided plan",
    role: "Verified Patient",
    contextImage: SITE_IMAGES.testimonialContext[2],
  },
];

export const LONGEVITY_TESTIMONIALS: Testimonial[] = [
  {
    name: "Maya S.",
    quote:
      "Sleep was my biggest issue — I was recovering slower than I should at my age. The peptide protocol was reviewed carefully, shipped cold-chain, and within a few weeks my nights felt deeper again.",
    condition: "Longevity Peptides",
    result: "Better sleep",
    role: "Verified Patient",
    featured: true,
    contextImage: SITE_IMAGES.testimonialContext[0],
  },
  {
    name: "Robert H.",
    quote:
      "I wanted physician-guided care, not internet peptides. TIDL felt legitimate from intake through delivery. My recovery between workouts improved and I finally stopped feeling run down all week.",
    condition: "Peptide Protocol",
    result: "Faster recovery",
    role: "Verified Patient",
    contextImage: SITE_IMAGES.testimonialContext[1],
  },
  {
    name: "Linda C.",
    quote:
      "Everything stayed private and professional. My provider explained what made sense for my profile, and the pen routine is simple enough that I actually stay consistent.",
    condition: "Metabolic Health",
    result: "3 months in",
    role: "Verified Patient",
    contextImage: SITE_IMAGES.testimonialContext[2],
  },
];

export const PERFORMANCE_TESTIMONIALS: Testimonial[] = [
  {
    name: "Tyler N.",
    quote:
      "I'm training five days a week and needed support that didn't feel reckless. My provider reviewed everything, built a protocol around recovery, and the delivery was discreet and fast.",
    condition: "Performance & Recovery",
    result: "Back to PRs",
    role: "Verified Patient",
    featured: true,
    contextImage: SITE_IMAGES.testimonialContext[0],
  },
  {
    name: "Jordan F.",
    quote:
      "The difference was consistency. I wasn't bouncing back between sessions the way I used to. Having a doctor-reviewed plan instead of guessing with supplements gave me real confidence.",
    condition: "Athletic Recovery",
    result: "Less soreness",
    role: "Verified Patient",
    contextImage: SITE_IMAGES.testimonialContext[1],
  },
  {
    name: "Amir K.",
    quote:
      "Simple intake, clear instructions, and a care team that responds. For performance support, that matters. I feel like I'm recovering faster without changing the rest of my routine.",
    condition: "Recovery Protocol",
    result: "8 weeks in",
    role: "Verified Patient",
    contextImage: SITE_IMAGES.testimonialContext[2],
  },
];
