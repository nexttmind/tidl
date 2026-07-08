import {
  DEFAULT_QUIZ_DATA,
  QUIZ_STORAGE_KEY,
  QUIZ_STORAGE_VERSION,
  type QuizFormData,
  type QuizStoredState,
} from "@/types/quiz";

export function readQuizState(): QuizStoredState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as QuizStoredState;
    if (parsed.version !== QUIZ_STORAGE_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeQuizState(state: Omit<QuizStoredState, "version" | "updatedAt">): void {
  if (typeof window === "undefined") return;
  const payload: QuizStoredState = {
    version: QUIZ_STORAGE_VERSION,
    currentStep: state.currentStep,
    data: state.data,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(payload));
}

export function clearQuizState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(QUIZ_STORAGE_KEY);
}

export function getInitialQuizData(overrides?: Partial<QuizFormData>): QuizFormData {
  const stored = readQuizState();
  return {
    ...(stored?.data ?? DEFAULT_QUIZ_DATA),
    ...overrides,
  };
}

export function isQuizComplete(): boolean {
  const stored = readQuizState();
  return stored !== null && stored.currentStep >= 8;
}
