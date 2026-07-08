import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import {
  checkoutDefaultValues,
  checkoutFormSchema,
  type CheckoutFormValues,
} from "@/lib/checkout-schema";
import { registerFromQuiz } from "@/lib/auth-storage";
import { createOrder } from "@/lib/order-storage";
import { clearQuizState, readQuizState } from "@/lib/quiz-storage";
import { calculateOrderPricing } from "@/lib/pricing";
import { getRecommendedTreatment } from "@/lib/products";
import { useAuth } from "@/providers/auth-provider";
import "../quiz/quiz.css";

export function CheckoutForm() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const stored = readQuizState();
  const quizData = stored?.data;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      ...checkoutDefaultValues,
      phone: quizData?.phone ?? "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    if (!quizData) return;

    const product = getRecommendedTreatment(quizData.goal, quizData.productSlug);
    const pricing = calculateOrderPricing(product);

    let userId = user?.id;
    if (!userId) {
      const registered = registerFromQuiz({
        email: quizData.email,
        phone: values.phone,
        password: quizData.password,
        firstName: values.firstName,
        lastName: values.lastName,
      });
      setUser(registered);
      userId = registered.id;
    }

    const order = createOrder({
      userId,
      quiz: quizData,
      checkout: values,
      product,
      pricing,
    });

    clearQuizState();
    navigate({
      to: "/confirmation",
      search: { orderId: order.id },
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <section className="tidl-card">
        <h2 className="font-medium">Shipping</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field label="First name" error={errors.firstName?.message}>
            <input className="tidl-input" {...register("firstName")} />
          </Field>
          <Field label="Last name" error={errors.lastName?.message}>
            <input className="tidl-input" {...register("lastName")} />
          </Field>
        </div>
        <Field label="Address" error={errors.addressLine1?.message}>
          <input className="tidl-input" {...register("addressLine1")} />
        </Field>
        <Field label="Apt / Suite (optional)">
          <input className="tidl-input" {...register("addressLine2")} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="City" error={errors.city?.message}>
            <input className="tidl-input" {...register("city")} />
          </Field>
          <Field label="State" error={errors.state?.message}>
            <input className="tidl-input" maxLength={2} {...register("state")} />
          </Field>
          <Field label="ZIP" error={errors.zip?.message}>
            <input className="tidl-input" {...register("zip")} />
          </Field>
        </div>
        <Field label="Phone" error={errors.phone?.message}>
          <input className="tidl-input" {...register("phone")} />
        </Field>
      </section>

      <section className="tidl-card">
        <h2 className="font-medium">Payment</h2>
        <div className="mt-4 flex gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" value="card" {...register("paymentMethod")} /> Card
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" value="hsa_fsa" {...register("paymentMethod")} /> HSA / FSA
          </label>
        </div>
        <Field label="Card number" error={errors.cardNumber?.message}>
          <input className="tidl-input" {...register("cardNumber")} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Expiry (MM/YY)" error={errors.cardExpiry?.message}>
            <input className="tidl-input" placeholder="MM/YY" {...register("cardExpiry")} />
          </Field>
          <Field label="CVC" error={errors.cardCvc?.message}>
            <input className="tidl-input" {...register("cardCvc")} />
          </Field>
        </div>
      </section>

      <section className="tidl-notice-box">
        <h2 className="font-medium">What happens next</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-[var(--quiz-muted)]">
          <li>Physician reviews your assessment</li>
          <li>Prescription approved if clinically appropriate</li>
          <li>Pharmacy prepares and ships your treatment</li>
        </ol>
      </section>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" {...register("termsAccepted")} className="mt-1" />
        <span>I agree to the Terms of Service and Privacy Policy.</span>
      </label>
      {errors.termsAccepted ? (
        <p className="text-xs text-red-600">{errors.termsAccepted.message}</p>
      ) : null}

      <button type="submit" disabled={isSubmitting} className="tidl-btn">
        {isSubmitting ? "Processing..." : "Complete order"}
      </button>
      <p className="text-center text-xs text-[var(--quiz-muted-warm)]">
        Your information is securely encrypted.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="mt-3 block">
      <span className="mb-1 block text-sm">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
