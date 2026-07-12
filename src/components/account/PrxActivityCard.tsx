import { useEffect, useState } from "react";
import {
  fetchPrxEncounters,
  prxStatusLabel,
  prxStatusToOrderStatus,
  type PrxEncounter,
} from "@/lib/prescribe-rx";
import { ORDER_STATUS_LABELS } from "@/types/order";

/**
 * Live "care activity" pulled straight from the PrescribeRx sandbox
 * (GET /encounters). Shows the real review/prescribe status for each intake so
 * the account view reflects the actual clinical pipeline, not local state.
 */
export function PrxActivityCard({ highlightEncounterId }: { highlightEncounterId?: string }) {
  const [encounters, setEncounters] = useState<PrxEncounter[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPrxEncounters({ per_page: 5 })
      .then((page) => {
        if (!cancelled) setEncounters(page.data ?? []);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load activity");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="account-card">
        <h3 className="account-card-title">Care activity</h3>
        <p className="account-product-meta">Live activity is temporarily unavailable.</p>
      </div>
    );
  }

  if (!encounters) {
    return (
      <div className="account-card">
        <h3 className="account-card-title">Care activity</h3>
        <p className="account-product-meta">Loading your latest activity…</p>
      </div>
    );
  }

  if (encounters.length === 0) {
    return (
      <div className="account-card">
        <h3 className="account-card-title">Care activity</h3>
        <p className="account-product-meta">No encounters yet.</p>
      </div>
    );
  }

  return (
    <div className="account-card">
      <div className="account-card-head">
        <h3 className="account-card-title">Care activity</h3>
        <span className="account-live-tag">
          <span className="account-live-dot" aria-hidden="true" />
          Live from PrescribeRx
        </span>
      </div>
      <ul className="account-prx-list">
        {encounters.map((enc) => {
          const mapped = prxStatusToOrderStatus(enc.status);
          const isHighlight = highlightEncounterId && enc.id === highlightEncounterId;
          const placed = enc.created_at
            ? new Date(enc.created_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : null;
          return (
            <li
              key={enc.id}
              className={`account-prx-item${isHighlight ? " is-highlight" : ""}`}
            >
              <div className="account-prx-item-main">
                <strong>{enc.encounter_type?.name ?? enc.reason_for_visit ?? "Encounter"}</strong>
                <span className="account-prx-item-meta">
                  {enc.encounter_number}
                  {placed ? ` · ${placed}` : ""}
                </span>
              </div>
              <span className={`account-prx-status account-prx-status--${mapped}`}>
                {prxStatusLabel(enc)}
                <span className="account-prx-status-sub">{ORDER_STATUS_LABELS[mapped]}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
