import type { CheckoutFormData } from "@/types/order";
import type { QuizFormData } from "@/types/quiz";
import type { Product } from "@/lib/products";

export type PrxCheckoutBody = {
  quiz: QuizFormData;
  checkout: CheckoutFormData;
  product: Pick<Product, "slug" | "name" | "monthlyPrice" | "dosage" | "goal">;
  idempotencyKey?: string;
};

export type UnifiedIntakeOptions = {
  idempotencyKey: string;
  sandbox: boolean;
  encounterTypeSlug: string;
  productTypeSlug: string;
};

export function mapQuizToPatientPayload(
  quiz: QuizFormData,
  checkout?: Partial<CheckoutFormData>,
) {
  const dob = quiz.age != null ? approximateDobFromAge(quiz.age) : undefined;

  return {
    first_name: checkout?.firstName,
    last_name: checkout?.lastName,
    email: quiz.email,
    date_of_birth: dob,
    phone: checkout?.phone || quiz.phone,
    gender: quiz.sex ?? undefined,
  };
}

export function mapCheckoutToPatientAddressPayload(checkout: CheckoutFormData) {
  return {
    street: checkout.addressLine1,
    street2: checkout.addressLine2 || undefined,
    city: checkout.city,
    state: checkout.state.slice(0, 2).toUpperCase(),
    zip: checkout.zip,
    country: "US",
  };
}

/** POST /telehealth/intake/unified — Flow 1 from PRX Top-5 Integration Flows. */
export function mapCheckoutToUnifiedIntakePayload(
  body: PrxCheckoutBody,
  options: UnifiedIntakeOptions,
) {
  const patient = mapQuizToPatientPayload(body.quiz, body.checkout);
  const vitals = mapQuizToVitals(body.quiz);
  const answers = mapQuizToIntakeAnswers(body.quiz, body.product.goal);

  const consents = mapQuizToConsents(body.quiz, body.checkout);

  return {
    ...(options.sandbox ? { is_sandbox: true } : {}),
    encounter_type_slug: options.encounterTypeSlug,
    patient: {
      first_name: patient.first_name,
      last_name: patient.last_name,
      email: patient.email,
      date_of_birth: patient.date_of_birth,
      phone: patient.phone,
      ...(patient.gender ? { gender: patient.gender } : {}),
      shipping_address: mapCheckoutToPatientAddressPayload(body.checkout),
      billing_same_as_shipping: true,
    },
    ...(vitals ? { vitals } : {}),
    ...(Object.keys(answers).length > 0 ? { answers } : {}),
    products: [
      {
        product_type_slug: options.productTypeSlug,
        quantity: 1,
      },
    ],
    payment: mapCheckoutToPaymentPayload(body, options.idempotencyKey),
    ...(consents ? { consents } : {}),
  };
}

function mapQuizToVitals(quiz: QuizFormData) {
  const heightInches =
    quiz.heightFeet != null && quiz.heightInches != null
      ? quiz.heightFeet * 12 + quiz.heightInches
      : undefined;

  if (heightInches == null && quiz.weightLbs == null) return undefined;

  return {
    ...(heightInches != null ? { height_inches: heightInches } : {}),
    ...(quiz.weightLbs != null ? { weight_lbs: quiz.weightLbs } : {}),
  };
}

function mapQuizToIntakeAnswers(quiz: QuizFormData, goal: Product["goal"] | null) {
  const answers: Record<string, unknown> = {};

  if (quiz.weightLbs != null) answers.current_weight_lbs = quiz.weightLbs;
  if (goal) answers.weight_goal = goal;
  if (quiz.exercise) answers.exercise_level = quiz.exercise;
  if (quiz.sleep) answers.sleep_quality = quiz.sleep;
  if (quiz.eatingHabits) answers.eating_habits = quiz.eatingHabits;
  if (quiz.healthConditions.length > 0) answers.health_conditions = quiz.healthConditions;
  if (quiz.takingMedications != null) answers.taking_medications = quiz.takingMedications;
  if (quiz.hasAllergies != null) answers.has_allergies = quiz.hasAllergies;
  if (quiz.usedGlp1Before != null) answers.used_glp1_before = quiz.usedGlp1Before;
  if (quiz.previousWeightLossMeds != null) {
    answers.previous_weight_loss_meds = quiz.previousWeightLossMeds;
  }

  return answers;
}

function mapCheckoutToPaymentPayload(body: PrxCheckoutBody, transactionId: string) {
  return {
    mode: "reference_captured" as const,
    gateway: body.checkout.paymentMethod === "hsa_fsa" ? "hsa_fsa" : "stripe",
    transaction: {
      transaction_id: transactionId,
      amount: body.product.monthlyPrice,
    },
  };
}

function mapQuizToConsents(quiz: QuizFormData, checkout?: Partial<CheckoutFormData>) {
  // Either acknowledgement (assessment notice or checkout terms) records consent.
  if (!quiz.physicianNoticeAcknowledged && !checkout?.termsAccepted) return undefined;

  return [
    {
      consent_type: 6,
      consent_text:
        "I consent to telehealth services and understand a licensed physician will review my assessment.",
      signed_at: new Date().toISOString(),
    },
  ];
}

function approximateDobFromAge(age: number): string {
  const year = new Date().getUTCFullYear() - age;
  return `${year}-01-01`;
}
