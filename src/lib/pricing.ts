import type { OrderPricing } from "@/types/order";
import type { Product } from "./products";

const CONSULTATION_FEE = 49;
const SHIPPING_FEE = 15;
const TAX_RATE = 0.08;

export function calculateOrderPricing(product: Product): OrderPricing {
  const treatmentMonthly = product.monthlyPrice;
  const consultationFee = CONSULTATION_FEE;
  const shipping = SHIPPING_FEE;
  const subtotal = treatmentMonthly + consultationFee + shipping;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

  return { treatmentMonthly, consultationFee, shipping, tax, total };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
