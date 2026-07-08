const CDN = "https://cdn.prod.website-files.com/6a484773bf274d9b9ec3f5b9";

export const PEN_IMAGE = `${CDN}/6a4ae82cb673463b10de0cad_hf_20260705_223658_ef5718c4-2d19-4e28-9a03-7f8e1555a580%20(1).png`;

export const LOGO_SRC = `${CDN}/6a49afeae23ed952c91c2170_ChatGPTImageJul4202603_07_16AM.png`;

export const HERO_IMAGES = {
  lifestyle: `${CDN}/6a4a948975e49a6ca9c6b6e5_hf_20260705_172618_ea8e3be2-4637-4096-83cc-5ec995f07e09.png`,
  packaging: `${CDN}/6a4bbd9950fd69347716fcab_hf_20260706_142630_ecfd4adf-10ef-4ea0-804d-21e9849d1aa8.png`,
  care: `${CDN}/6a4aec42b6e5359eece02ec0_hf_20260705_222419_e9eea2f4-16e9-4829-bc36-184ebd9190fc%20(1).png`,
  cta: `${CDN}/6a4aadd9bef554b822fc1e2e_hf_20260705_190921_9cf62bf3-9feb-43b9-a0c0-ff9a0694d429.png`,
} as const;

export const HERO_STATS = [
  { value: "5 min", label: "Online intake" },
  { value: "100%", label: "Doctor-reviewed" },
  { value: "48hr", label: "Typical delivery" },
] as const;

export const OUTCOME_PHRASES = [
  "Doctor-guided weight loss",
  "Simple pre-dosed routine",
  "No mixing or measuring",
  "Discreet ongoing care",
] as const;

export const INCLUDED_PHRASES = [
  "Licensed provider review",
  "Personalized prescription",
  "Pre-dosed TIDL Pen",
  "Discreet delivery",
  "Ongoing care",
] as const;

export const SAFETY_PILLARS = [
  {
    id: "provider",
    num: "01",
    label: "Licensed providers",
    detail: "Care from verified medical professionals.",
  },
  {
    id: "pharmacy",
    num: "02",
    label: "US pharmacies",
    detail: "Dispensed by licensed US-based pharmacies.",
  },
  {
    id: "rx",
    num: "03",
    label: "Prescription only",
    detail: "Prescription-only treatments for your safety.",
  },
  {
    id: "private",
    num: "04",
    label: "Private by design",
    detail: "Discreet, confidential care from start to finish.",
  },
] as const;

export const REVIEWS = [
  {
    img: `${CDN}/6a49bb8eb221c183c37eeabe_ChatGPT%20Image%20Jul%205%2C%202026%2C%2005_02_33%20AM.png`,
    quote:
      "I'd been putting this off for years because I thought it would be complicated. It wasn't. The intake took five minutes, a doctor reviewed everything, and my treatment showed up a few days later. Down 18 pounds and finally feeling like myself again.",
    name: "Sarah M.",
    condition: "Weight Loss",
    result: "−18 lbs",
    featured: true,
  },
  {
    img: `${CDN}/6a49bb8eb673463b10a94dc9_ChatGPT%20Image%20Jul%205%2C%202026%2C%2005_02_37%20AM.png`,
    quote:
      "What sold me was how discreet and simple it was. No waiting rooms, no awkward conversations. The care team actually answers when I message them.",
    name: "James R.",
    condition: "GLP-1 Care",
    result: "3 months in",
    featured: false,
  },
  {
    img: `${CDN}/6a49bb883052977cb14adc96_ChatGPT%20Image%20Jul%205%2C%202026%2C%2005_03_39%20AM.png`,
    quote:
      "I was skeptical about doing this online, but everything felt legitimate from the start. Real doctors, a real pharmacy, clear instructions with the pen.",
    name: "Daniel K.",
    condition: "Metabolic Health",
    result: "Verified patient",
    featured: false,
  },
] as const;

export const REVIEW_STATS = [
  { value: "4.9", label: "Average rating" },
  { value: "12k+", label: "Patients served" },
  { value: "50", label: "States covered" },
] as const;

export const VERTICAL_TIMELINE = [
  {
    step: "01",
    label: "Start your intake",
    detail: "Answer a few health questions on your phone. It doubles as your medical intake.",
    duration: "~5 minutes",
  },
  {
    step: "02",
    label: "Provider review",
    detail: "A licensed doctor in your state reviews your history before anything is prescribed.",
    duration: "Same day",
  },
  {
    step: "03",
    label: "Pen prepared",
    detail: "Your GLP-1 dose is set in the pre-dosed TIDL Pen — no mixing, no guesswork.",
    duration: "Personalized",
  },
  {
    step: "04",
    label: "Discreet delivery",
    detail: "Shipped from a licensed US pharmacy in plain packaging, with cold-chain when needed.",
    duration: "2–5 days",
  },
  {
    step: "05",
    label: "Ongoing care",
    detail: "Message your care team, adjust your dose, and reorder with one tap when you're ready.",
    duration: "Always on",
  },
] as const;

export const PDP_FAQ_ITEMS = [
  {
    id: 1,
    cat: "start",
    q: "Is TIDL legitimate and safe?",
    a: "Yes. TIDL is a telehealth platform that connects you with licensed medical providers. Every treatment is prescribed by a doctor licensed in your state and filled by a licensed US pharmacy.",
  },
  {
    id: 2,
    cat: "start",
    q: "Do I need a prescription for GLP-1?",
    a: "Yes — and that's the point. Every TIDL treatment is prescription-only. Your intake doubles as your medical review, and if a licensed provider decides treatment is right for you, they write the prescription.",
  },
  {
    id: 3,
    cat: "start",
    q: "Who reviews and prescribes my treatment?",
    a: "A licensed medical provider in your state reads your full intake before anything is prescribed. If they have questions, they'll reach out before moving forward.",
  },
  {
    id: 4,
    cat: "start",
    q: "What if GLP-1 isn't right for me?",
    a: "Then it won't be prescribed. Providers only approve treatment when it's medically appropriate for you, and they'll tell you why if it isn't.",
  },
  {
    id: 5,
    cat: "treat",
    q: "How does the TIDL Pen work?",
    a: "Your dose is set to your prescription, with a clear graduated scale so there's never any guesswork. No vials, no syringes, nothing to mix or assemble.",
  },
  {
    id: 6,
    cat: "treat",
    q: "Is shipping discreet?",
    a: "Completely. Your treatment arrives in plain, unbranded outer packaging with nothing on the box that says what's inside.",
  },
  {
    id: 7,
    cat: "treat",
    q: "How is my medication kept safe in transit?",
    a: "Temperature-sensitive treatments ship in insulated, cold-chain packaging designed to keep them within a safe range door to door.",
  },
  {
    id: 8,
    cat: "care",
    q: "Can I talk to my care team after I start?",
    a: "Anytime. Message your care team with questions about your treatment, side effects, or progress, and a real person answers.",
  },
  {
    id: 9,
    cat: "care",
    q: "What happens when I need a refill?",
    a: "Refills are a tap, not a project. Your provider keeps your prescription current based on how your treatment is going.",
  },
  {
    id: 10,
    cat: "care",
    q: "Can I pause or cancel?",
    a: "Yes. You're in control of your plan. Talk to your provider first if you're mid-treatment, since some medications shouldn't stop abruptly.",
  },
] as const;
