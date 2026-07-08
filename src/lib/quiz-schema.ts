import { z } from "zod";
import type { QuizFormData } from "@/types/quiz";
import {
  EATING_HABITS,
  EXERCISE_LEVELS,
  GOAL_IDS,
  HEALTH_CONDITION_IDS,
  SEX_OPTIONS,
  SLEEP_LEVELS,
} from "@/types/quiz";

function requiredEnum<T extends [string, ...string[]]>(values: T, message: string) {
  return z
    .union([z.enum(values), z.null()])
    .refine((value): value is T[number] => value !== null, { message });
}

function requiredNumber(
  schema: z.ZodNumber,
  emptyMessage: string,
) {
  return z
    .union([schema, z.null()])
    .refine((value): value is number => value !== null, { message: emptyMessage });
}

function requiredBoolean(message: string) {
  return z
    .union([z.boolean(), z.null()])
    .refine((value): value is boolean => value !== null, { message });
}

const step1Schema = z.object({
  goal: requiredEnum(GOAL_IDS, "Select your primary goal"),
});

const step2Schema = z.object({
  age: requiredNumber(
    z.number().min(18, "Must be 18 or older").max(120, "Enter a valid age"),
    "Enter your age",
  ),
  sex: requiredEnum(SEX_OPTIONS, "Select sex assigned at birth"),
  heightFeet: requiredNumber(
    z.number().min(3, "Enter a valid height").max(8, "Enter a valid height"),
    "Enter height (feet)",
  ),
  heightInches: requiredNumber(
    z.number().min(0, "Enter a valid height").max(11, "Enter a valid height"),
    "Enter height (inches)",
  ),
  weightLbs: requiredNumber(
    z.number().min(50, "Enter a valid weight").max(700, "Enter a valid weight"),
    "Enter your weight",
  ),
});

const step3Schema = z
  .object({
    healthConditions: z
      .array(z.enum(HEALTH_CONDITION_IDS))
      .min(1, "Select at least one option"),
    takingMedications: requiredBoolean("Please answer"),
    hasAllergies: requiredBoolean("Please answer"),
  })
  .superRefine((data, ctx) => {
    const hasNone = data.healthConditions.includes("none");
    const hasOther = data.healthConditions.some((c) => c !== "none");
    if (hasNone && hasOther) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '"None of the above" cannot be combined with other conditions',
        path: ["healthConditions"],
      });
    }
  });

const step4Schema = z.object({
  exercise: requiredEnum(EXERCISE_LEVELS, "Select exercise level"),
  sleep: requiredEnum(SLEEP_LEVELS, "Select sleep quality"),
  eatingHabits: requiredEnum(EATING_HABITS, "Select eating habits"),
});

const step5Schema = z.object({
  usedGlp1Before: requiredBoolean("Please answer"),
  previousWeightLossMeds: requiredBoolean("Please answer"),
});

const step6Schema = z.object({
  physicianNoticeAcknowledged: z.literal(true, {
    errorMap: () => ({ message: "You must acknowledge physician review" }),
  }),
});

const step7Schema = z.object({
  email: z.string().min(1, "Enter your email").email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  password: z.string().min(8, "At least 8 characters").max(72),
});

const STEP_SCHEMAS = [
  null,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
  step7Schema,
  null,
] as const;

export function validateQuizStep(
  step: number,
  data: QuizFormData,
): { success: true } | { success: false; errors: Record<string, string> } {
  if (step === 8) return { success: true };

  const schema = STEP_SCHEMAS[step];
  if (!schema) return { success: true };

  const result = schema.safeParse(data);
  if (result.success) return { success: true };

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = issue.path.join(".") || "_form";
    if (!errors[key]) errors[key] = issue.message;
  }
  return { success: false, errors };
}

export function isQuizStepValid(step: number, data: QuizFormData): boolean {
  return validateQuizStep(step, data).success;
}
