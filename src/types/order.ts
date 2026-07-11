import type { GoalId, QuizFormData } from "./quiz";

export const ORDER_STATUSES = [
  "physician_review",
  "prescription_approved",
  "pharmacy_preparing",
  "shipped",
  "delivered",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderPricing {
  treatmentMonthly: number;
  consultationFee: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export type PaymentMethod = "card" | "hsa_fsa";

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  termsAccepted: boolean;
}

export interface PrxOrderReference {
  encounterNumber?: string;
  patientNumber?: string;
  encounterId?: string;
  patientChartId?: string;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: OrderStatus;
  treatmentName: string;
  treatmentDescription: string;
  goal: GoalId | null;
  dosage: string;
  pricing: OrderPricing;
  shipping: ShippingAddress;
  paymentMethod: PaymentMethod;
  quizSnapshot: QuizFormData;
  trackingNumber: string | null;
  estimatedDelivery: string;
  nextRefillDate: string;
  prx?: PrxOrderReference;
  createdAt: string;
  updatedAt: string;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  physician_review: "Physician review",
  prescription_approved: "Prescription approved",
  pharmacy_preparing: "Pharmacy preparing",
  shipped: "Shipped",
  delivered: "Delivered",
};
