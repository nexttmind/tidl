import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { lockPageScroll, unlockPageScroll } from "@/lib/age-gate";
import { useQuizModal } from "@/providers/quiz-modal-provider";
import { DynamicQuiz } from "./DynamicQuiz";

/**
 * Global mount for the live PrescribeRx assessment. Driven by the shared
 * quiz-modal provider, so every existing `openModal()` trigger (landing-page
 * CTAs, PDP, category, etc.) now opens the dynamic sandbox quiz.
 */
export function DynamicQuizModal() {
  const mounted = useIsMounted();
  const { isOpen, closeModal } = useQuizModal();

  useEffect(() => {
    if (!mounted) return;
    if (isOpen) lockPageScroll();
    else unlockPageScroll();
    return () => unlockPageScroll();
  }, [mounted, isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(<DynamicQuiz onClose={closeModal} />, document.body);
}
