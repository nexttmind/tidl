/** Homepage Ask TIDL section copy and mock Q&A. */

export const ASK_TIDL_SECTION = {
  title: "You're safe here.",
  subtitle: "Whenever you're ready.",
  placeholder: "Ask when you're ready…",
  botGreeting: "Hello, this is TIDL AI assistant.",
  brandName: "Ask TIDL",
  replyUs: "TIDL",
  disclaimer: "You're not alone in this. A lot of people ask the same thing — your provider still decides what's right for you.",
} as const;

/** Short, result-first choices — tap one to ask */
export const ASK_TIDL_PROMPTS = [
  "Quieter food noise?",
  "More energy?",
  "Feel like myself?",
  "Start today?",
] as const;

/** Cycles as the input placeholder typewriter */
export const ASK_TIDL_PLACEHOLDER_QS = [
  "Quieter food noise?",
  "More energy?",
  "Feel like myself?",
  "How fast do I start?",
  "Is a doctor involved?",
] as const;

export const ASK_TIDL_ANSWERS: Record<string, string> = {
  "Quieter food noise?":
    "Yes. Provider-guided GLP-1 care can help quiet constant food thoughts. A short intake starts it.",
  "More energy?":
    "Many people come for steadier energy and focus. A licensed provider matches the right path for you.",
  "Feel like myself?":
    "That's the goal. Care that fits your body, reviewed by a real provider. Start when you're ready.",
  "Start today?":
    "Yes. Five-minute intake. Provider review. If it's right for you, treatment ships from a US pharmacy.",
  "How fast do I start?":
    "Intake takes about five minutes. If approved, medication ships from a licensed pharmacy.",
  "Is a doctor involved?":
    "Always. Licensed providers review your intake and prescribe only when it's appropriate.",
  "What is the TIDL Pen?":
    "Pre-dosed treatment. No mixing. Click and go. Prescribed by a provider, shipped from a US pharmacy.",
  "Am I a fit for GLP-1?":
    "The quiz answers that in about five minutes. A provider reviews and decides.",
  "How does TRT work?":
    "Provider-guided testosterone care for energy, strength, and drive. Personalized dose and follow-up.",
  "What are peptides?":
    "Short amino-acid signals your body already uses. Provider-prescribed for recovery, longevity, and more.",
  "How fast is delivery?":
    "If approved, a licensed US pharmacy fulfills it. Timing varies by treatment and state.",
  "Can I use HSA or FSA?":
    "Often yes for eligible care. Your plan rules apply. Ask during intake if you're unsure.",
};

export const ASK_TIDL_FALLBACK =
  "Thanks for asking. A short intake helps a provider meet you where you are — start whenever you're ready.";
