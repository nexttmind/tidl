import type { OrderStatus } from "@/types/order";
import { ORDER_STATUS_LABELS } from "@/types/order";
import "../quiz/quiz.css";

const STATUS_ORDER: OrderStatus[] = [
  "physician_review",
  "prescription_approved",
  "pharmacy_preparing",
  "shipped",
  "delivered",
];

export function StatusTimeline({ status }: { status: OrderStatus }) {
  const currentIndex = STATUS_ORDER.indexOf(status);

  return (
    <ol className="space-y-3">
      {STATUS_ORDER.map((s, i) => {
        const done = i <= currentIndex;
        const active = i === currentIndex;
        return (
          <li key={s} className="flex items-center gap-3 text-sm">
            <span
              className={`tidl-timeline-dot ${
                active ? "is-active" : done ? "is-done" : "is-pending"
              }`}
            >
              {i + 1}
            </span>
            <span className={done ? "font-medium text-[var(--quiz-ink)]" : "text-[var(--quiz-muted-warm)]"}>
              {ORDER_STATUS_LABELS[s]}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
