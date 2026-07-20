import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { lockPageScroll, unlockPageScroll } from "@/lib/age-gate";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import { PEPTIDE_PRX_SLUGS } from "@/lib/peptides";
import { useQuizModal } from "@/providers/quiz-modal-provider";
import { DynamicQuiz } from "./DynamicQuiz";

/**
 * Global mount for the live PrescribeRx assessment. Driven by the shared
 * quiz-modal provider, so every existing `openModal()` trigger (landing-page
 * CTAs, PDP, category, etc.) now opens the dynamic sandbox quiz.
 */
export function DynamicQuizModal() {
  const mounted = useIsMounted();
  const { isOpen, options, closeModal } = useQuizModal();

  useEffect(() => {
    if (!isOpen) return;
    trackEvent(ANALYTICS_EVENTS.quizStarted, {
      goal: options.goal ?? undefined,
      product_slug: options.product ?? undefined,
    });
  }, [isOpen, options.goal, options.product]);

  useEffect(() => {
    if (!mounted) return;
    if (isOpen) lockPageScroll();
    else unlockPageScroll();
    return () => unlockPageScroll();
  }, [mounted, isOpen]);

  if (!mounted || !isOpen) return null;

  const initialSlug = options.product
    ? (PEPTIDE_PRX_SLUGS[options.product]?.encounter ?? "glp-1-screening")
    : undefined;

  return createPortal(
    <DynamicQuiz initialSlug={initialSlug} modalOptions={options} onClose={closeModal} />,
    document.body,
  );
}
