export const QUIZ_TOTAL_STEPS = 8;
export const QUIZ_STORAGE_KEY = "tidl-quiz-v1";
export const QUIZ_STORAGE_VERSION = 1;

export const GOAL_IDS = [
  "weight-loss",
  "longevity",
  "metabolic-health",
  "hormonal-health",
  "performance",
  "recovery",
] as const;

export type GoalId = (typeof GOAL_IDS)[number];

export const PRODUCT_SLUGS = [
  "glp-1-weight-loss",
  "longevity-peptides",
  "trt-hormonal",
  "performance-recovery",
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export const HEALTH_CONDITION_IDS = [
  "diabetes",
  "heart-disease",
  "thyroid",
  "liver-kidney",
  "cancer",
  "eating-disorder",
  "none",
] as const;

export type HealthConditionId = (typeof HEALTH_CONDITION_IDS)[number];

export const EXERCISE_LEVELS = ["sedentary", "light", "moderate", "active"] as const;
export type ExerciseLevel = (typeof EXERCISE_LEVELS)[number];

export const SLEEP_LEVELS = ["poor", "fair", "good", "excellent"] as const;
export type SleepLevel = (typeof SLEEP_LEVELS)[number];

export const EATING_HABITS = ["inconsistent", "balanced", "high-protein", "restricted"] as const;
export type EatingHabits = (typeof EATING_HABITS)[number];

export const SEX_OPTIONS = ["male", "female", "other"] as const;
export type SexOption = (typeof SEX_OPTIONS)[number];

export interface QuizFormData {
  goal: GoalId | null;
  productSlug: ProductSlug | null;
  age: number | null;
  sex: SexOption | null;
  heightFeet: number | null;
  heightInches: number | null;
  weightLbs: number | null;
  healthConditions: HealthConditionId[];
  takingMedications: boolean | null;
  hasAllergies: boolean | null;
  exercise: ExerciseLevel | null;
  sleep: SleepLevel | null;
  eatingHabits: EatingHabits | null;
  usedGlp1Before: boolean | null;
  previousWeightLossMeds: boolean | null;
  email: string;
  phone: string;
  password: string;
  physicianNoticeAcknowledged: boolean;
}

export interface QuizStoredState {
  version: number;
  currentStep: number;
  data: QuizFormData;
  updatedAt: string;
}

export const DEFAULT_QUIZ_DATA: QuizFormData = {
  goal: null,
  productSlug: null,
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
  email: "",
  phone: "",
  password: "",
  physicianNoticeAcknowledged: false,
};

export const GOAL_LABELS: Record<GoalId, string> = {
  "weight-loss": "Weight loss",
  longevity: "Longevity",
  "metabolic-health": "Metabolic health",
  "hormonal-health": "Hormonal health",
  performance: "Performance",
  recovery: "Recovery",
};

export const STEP_LABELS: Record<number, string> = {
  1: "Your goal",
  2: "About you",
  3: "Health history",
  4: "Lifestyle",
  5: "Treatment history",
  6: "Physician review",
  7: "Your account",
  8: "Recommendation",
};
