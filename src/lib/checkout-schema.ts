import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  addressLine1: z.string().min(3, "Address is required"),
  addressLine2: z.string().optional().default(""),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required").max(2, "Use 2-letter state code"),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code"),
  phone: z.string().min(10, "Enter a valid phone number"),
  paymentMethod: z.enum(["card", "hsa_fsa"]),
  cardNumber: z.string().min(15, "Enter a valid card number"),
  cardExpiry: z.string().regex(/^\d{2}\/\d{2}$/, "Use MM/YY format"),
  cardCvc: z.string().min(3).max(4),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms" }),
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export const checkoutDefaultValues: CheckoutFormValues = {
  firstName: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  paymentMethod: "card",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
  termsAccepted: false as unknown as true,
};
