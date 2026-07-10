/** Homepage Ask TIDL section copy and mock Q&A. */

export const ASK_TIDL_SECTION = {
  kicker: "TIDL Intelligence",
  titleLine1: "Ask anything.",
  titleEmphasis: "Decide faster.",
  placeholder: "Ask about treatments, eligibility, delivery…",
  statusLabel: "Live",
  disclaimer:
    "General information only. Your provider makes every medical decision.",
} as const;

export const ASK_TIDL_PROMPTS = [
  "What is the TIDL Pen?",
  "Am I a fit for GLP-1?",
  "How does TRT work?",
  "What are peptides?",
] as const;

export const ASK_TIDL_PLACEHOLDER_QS = [
  "What is the TIDL Pen?",
  "Am I a fit for GLP-1?",
  "How fast is delivery?",
  "What are peptides?",
  "Can I use HSA or FSA?",
] as const;

export const ASK_TIDL_ANSWERS: Record<string, string> = {
  "What is the TIDL Pen?":
    "The TIDL Pen is our pre-dosed GLP-1 treatment. The dose is already measured, so there's no mixing and no guesswork. Just click and go. It's prescribed by a licensed provider and shipped from a licensed US pharmacy.",
  "Am I a fit for GLP-1?":
    "That's exactly what the quiz is for. It takes about five minutes and doubles as your medical intake. A licensed provider reviews your answers and prescribes only if it's right for you.",
  "How does TRT work?":
    "TRT restores testosterone to a healthy range under a doctor's care, which can support energy, strength, drive, and focus. Your provider personalizes the dose and monitors your progress.",
  "What are peptides?":
    "Peptides are short chains of amino acids your body already uses as signals. Peptide therapy uses specific ones, prescribed by a provider, to support goals like recovery, longevity, and metabolic health.",
};

export const ASK_TIDL_FALLBACK =
  "We can walk you through treatments, delivery, and what the intake looks like. Take the quiz to get matched with a licensed provider.";
