import type { OrderStatus } from "@/types/order";
import { ORDER_STATUS_LABELS } from "@/types/order";
import "./checkout.css";

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
    <ol className="checkout-next-steps">
      {STATUS_ORDER.map((s, i) => {
        const done = i <= currentIndex;
        const active = i === currentIndex;
        return (
          <li key={s} className="checkout-next-step">
            <span
              className="checkout-next-step-num"
              style={
                active
                  ? { background: "#171310", borderColor: "#171310", color: "#fff" }
                  : done
                    ? { background: "#171310", borderColor: "#171310", color: "#fff" }
                    : undefined
              }
            >
              {done && !active ? "✓" : i + 1}
            </span>
            <div className="checkout-next-step-copy">
              <strong style={{ color: done ? "#171310" : "#9a948a", fontWeight: done ? 600 : 500 }}>
                {ORDER_STATUS_LABELS[s]}
              </strong>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
