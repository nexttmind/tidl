import { useEffect, useRef, useState } from "react";
import { fetchPrxEncounter, type PrxEncounter } from "@/lib/prescribe-rx";

type State = {
  encounter: PrxEncounter | null;
  loading: boolean;
  error: string | null;
};

/**
 * Poll GET /encounters/{id} on an interval to surface live PRX review/prescribe
 * progress. Polling pauses when the tab is hidden and stops once the encounter
 * reaches a terminal state.
 */
export function usePrxEncounterStatus(
  encounterId: string | null | undefined,
  { intervalMs = 15000 }: { intervalMs?: number } = {},
) {
  const [state, setState] = useState<State>({ encounter: null, loading: false, error: null });
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!encounterId) return;
    let cancelled = false;

    const load = async () => {
      try {
        const encounter = await fetchPrxEncounter(encounterId);
        if (cancelled) return;
        setState({ encounter, loading: false, error: null });

        const terminal = ["completed", "delivered", "cancelled"].includes(
          (encounter.status ?? "").toLowerCase(),
        );
        if (terminal && timer.current) {
          clearInterval(timer.current);
          timer.current = null;
        }
      } catch (err) {
        if (cancelled) return;
        setState((s) => ({
          ...s,
          loading: false,
          error: err instanceof Error ? err.message : "Failed to load status",
        }));
      }
    };

    setState((s) => ({ ...s, loading: true }));
    void load();

    timer.current = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
      void load();
    }, intervalMs);

    return () => {
      cancelled = true;
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [encounterId, intervalMs]);

  return state;
}
