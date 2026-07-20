import type { PrxEncounterTypeSchema, PrxSchemaField } from "@/lib/prescribe-rx/encounter-schema";
import { writeQuizState } from "@/lib/quiz-storage";
import type { GoalId, ProductSlug, QuizFormData, SexOption } from "@/types/quiz";
import { GOAL_IDS, PRODUCT_SLUGS, QUIZ_TOTAL_STEPS } from "@/types/quiz";
import type { QuizModalOptions } from "@/providers/quiz-modal-provider";

type DynamicAnswer =
  | string
  | number
  | string[]
  | { feet: number | null; inches: number | null }
  | { street: string; city: string; state: string; zip: string };

const FIELD_TYPE = {
  EMAIL: 2,
  PHONE: 4,
  HEIGHT: 40,
  WEIGHT: 41,
} as const;

function slugIncludes(slug: string, needles: string[]) {
  const s = slug.toLowerCase();
  return needles.some((n) => s.includes(n));
}

function pickString(answers: Record<string, DynamicAnswer | undefined>, slugs: string[]): string {
  for (const slug of slugs) {
    const v = answers[slug];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  for (const [slug, v] of Object.entries(answers)) {
    if (typeof v !== "string" || !v.trim()) continue;
    if (slugs.some((needle) => slugIncludes(slug, [needle]))) return v.trim();
  }
  return "";
}

function mapSex(raw: string): SexOption | null {
  const v = raw.toLowerCase();
  if (v.includes("male") && !v.includes("female")) return "male";
  if (v.includes("female")) return "female";
  if (v.includes("other")) return "other";
  return null;
}

function isGoalId(value: string | undefined): value is GoalId {
  return !!value && (GOAL_IDS as readonly string[]).includes(value);
}

function isProductSlug(value: string | undefined): value is ProductSlug {
  return !!value && (PRODUCT_SLUGS as readonly string[]).includes(value);
}

/** Map PRX schema answers + modal context into legacy QuizFormData for checkout unified intake. */
export function buildQuizFormFromDynamicAnswers(
  answers: Record<string, DynamicAnswer | undefined>,
  schema: PrxEncounterTypeSchema | null,
  modalOptions: QuizModalOptions,
): QuizFormData {
  const data: QuizFormData = {
    goal: modalOptions.goal ?? null,
    productSlug: modalOptions.product ?? null,
    age: null,
    sex: null,
    heightFeet: null,
    heightInches: null,
    weightLbs: null,
    healthConditions: [],
    takingMedications: null,
    hasAllergies: null,
    exercise: null,
    sleep: null,
    eatingHabits: null,
    usedGlp1Before: null,
    previousWeightLossMeds: null,
    email: pickString(answers, ["email", "patient_email"]),
    phone: pickString(answers, ["phone", "patient_phone", "mobile"]),
    password: "",
    physicianNoticeAcknowledged: false,
  };

  for (const step of schema?.steps ?? []) {
    for (const field of step.fields) {
      applyField(data, field, answers[field.slug]);
    }
  }

  // Fallback goal from encounter slug when modal didn't pass one.
  if (!data.goal && schema?.encounter_type?.slug) {
    const slug = schema.encounter_type.slug;
    if (slug.includes("glp") || slug.includes("weight")) data.goal = "weight-loss";
    else if (slug.includes("peptide")) data.goal = "recovery";
    else if (slug.includes("trt") || slug.includes("hormon")) data.goal = "hormonal-health";
  }

  if (!data.productSlug && data.goal === "weight-loss") {
    data.productSlug = "glp-1-weight-loss";
  }

  if (modalOptions.product && isProductSlug(modalOptions.product)) {
    data.productSlug = modalOptions.product;
  }
  if (modalOptions.goal && isGoalId(modalOptions.goal)) {
    data.goal = modalOptions.goal;
  }

  return data;
}

function applyField(
  data: QuizFormData,
  field: PrxSchemaField,
  value: DynamicAnswer | undefined,
) {
  if (value === undefined || value === null) return;

  if (field.field_type === FIELD_TYPE.EMAIL && typeof value === "string" && !data.email) {
    data.email = value.trim();
  }
  if (field.field_type === FIELD_TYPE.PHONE && typeof value === "string" && !data.phone) {
    data.phone = value.trim();
  }
  if (field.field_type === FIELD_TYPE.HEIGHT && typeof value === "object" && "feet" in value) {
    data.heightFeet = value.feet;
    data.heightInches = value.inches;
  }
  if (field.field_type === FIELD_TYPE.WEIGHT && typeof value === "number") {
    data.weightLbs = value;
  }

  const slug = field.slug.toLowerCase();
  if (typeof value === "string") {
    if (slugIncludes(slug, ["sex", "gender"])) data.sex = mapSex(value);
    if (slugIncludes(slug, ["consent", "telehealth", "notice"]) && /yes|true|accept/i.test(value)) {
      data.physicianNoticeAcknowledged = true;
    }
  }
  if (typeof value === "number" && slugIncludes(slug, ["age"])) {
    data.age = value;
  }
}

/** Persist quiz completion so `/checkout` gate opens. */
export function persistDynamicQuizForCheckout(
  answers: Record<string, DynamicAnswer | undefined>,
  schema: PrxEncounterTypeSchema | null,
  modalOptions: QuizModalOptions,
): QuizFormData {
  const data = buildQuizFormFromDynamicAnswers(answers, schema, modalOptions);
  writeQuizState({ currentStep: QUIZ_TOTAL_STEPS, data });
  return data;
}
