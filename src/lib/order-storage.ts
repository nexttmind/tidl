import type { CheckoutFormData, Order, OrderPricing } from "@/types/order";
import type { QuizFormData } from "@/types/quiz";
import type { Product } from "./products";

const ORDERS_KEY = "tidl-orders-v1";

function readOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

function writeOrders(orders: Order[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function generateOrderNumber(): string {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `TIDL-${n}`;
}

function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export function createOrder(params: {
  userId: string;
  quiz: QuizFormData;
  checkout: CheckoutFormData;
  product: Product;
  pricing: OrderPricing;
}): Order {
  const now = new Date().toISOString();
  const order: Order = {
    id: crypto.randomUUID(),
    userId: params.userId,
    orderNumber: generateOrderNumber(),
    status: "physician_review",
    treatmentName: params.product.name,
    treatmentDescription: params.product.description,
    goal: params.quiz.goal,
    dosage: params.product.dosage,
    pricing: params.pricing,
    shipping: {
      firstName: params.checkout.firstName,
      lastName: params.checkout.lastName,
      addressLine1: params.checkout.addressLine1,
      addressLine2: params.checkout.addressLine2,
      city: params.checkout.city,
      state: params.checkout.state,
      zip: params.checkout.zip,
      phone: params.checkout.phone,
    },
    paymentMethod: params.checkout.paymentMethod,
    quizSnapshot: params.quiz,
    trackingNumber: null,
    estimatedDelivery: addDays(5),
    nextRefillDate: addDays(28),
    createdAt: now,
    updatedAt: now,
  };

  const orders = readOrders();
  orders.unshift(order);
  writeOrders(orders);
  return order;
}

export function getOrderById(id: string): Order | null {
  return readOrders().find((o) => o.id === id) ?? null;
}

export function getLatestOrderForUser(userId: string): Order | null {
  return readOrders().find((o) => o.userId === userId) ?? null;
}

export function getOrdersForUser(userId: string): Order[] {
  return readOrders().filter((o) => o.userId === userId);
}
