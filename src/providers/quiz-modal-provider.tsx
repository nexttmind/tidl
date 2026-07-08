import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { GoalId, ProductSlug } from "@/types/quiz";

export interface QuizModalOptions {
  product?: ProductSlug;
  goal?: GoalId;
}

interface QuizModalContextValue {
  isOpen: boolean;
  options: QuizModalOptions;
  openModal: (opts?: QuizModalOptions) => void;
  closeModal: () => void;
}

const QuizModalContext = createContext<QuizModalContextValue | null>(null);

export function QuizModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<QuizModalOptions>({});

  const openModal = useCallback((opts: QuizModalOptions = {}) => {
    setOptions(opts);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setOptions({});
  }, []);

  const value = useMemo(
    () => ({ isOpen, options, openModal, closeModal }),
    [isOpen, options, openModal, closeModal],
  );

  return (
    <QuizModalContext.Provider value={value}>{children}</QuizModalContext.Provider>
  );
}

export function useQuizModal() {
  const ctx = useContext(QuizModalContext);
  if (!ctx) throw new Error("useQuizModal must be used within QuizModalProvider");
  return ctx;
}
