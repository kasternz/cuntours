import { useEffect, useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe-client";
import { createPaymentIntent } from "@/lib/payment-fn";
import { useLang } from "@/i18n/context";
import { copy } from "@/i18n/copy";
import { Button } from "@/components/ui/button";

type Props = {
  amountUsd: number;
  bookingId: string;
  tourName: string;
  guestEmail: string;
  canSubmit: () => string | null; // returns an error message, or null if guest info is valid
  onPaid: (paymentIntentId: string) => Promise<void>;
};

export function StripePaymentSection(props: Props) {
  const { lang } = useLang();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "unavailable">("loading");

  useEffect(() => {
    let cancelled = false;
    setState("loading");
    createPaymentIntent({
      data: {
        amountUsd: props.amountUsd,
        bookingId: props.bookingId,
        tourName: props.tourName,
        guestEmail: props.guestEmail,
      },
    })
      .then((res) => {
        if (cancelled) return;
        if (res.ok) {
          setClientSecret(res.clientSecret);
          setState("ready");
        } else {
          setState("unavailable");
        }
      })
      .catch(() => {
        if (!cancelled) setState("unavailable");
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.amountUsd]);

  if (state === "loading") {
    return <p className="text-sm text-muted">{copy.sendingBooking[lang]}</p>;
  }

  if (state === "unavailable" || !clientSecret) {
    return (
      <p className="text-sm text-warn">
        {lang === "es"
          ? "El pago con tarjeta no está disponible todavía. Elige \"Pagar al recoger\" por ahora."
          : "Card payment isn't available yet. Choose \"Pay at pickup\" for now."}
      </p>
    );
  }

  return (
    <Elements stripe={getStripe()} options={{ clientSecret, appearance: { theme: "stripe" } }}>
      <StripeInner {...props} />
    </Elements>
  );
}

function StripeInner({ canSubmit, onPaid }: Props) {
  const { lang } = useLang();
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleConfirm() {
    setError("");
    const guestError = canSubmit();
    if (guestError) {
      setError(guestError);
      return;
    }
    if (!stripe || !elements) return;

    setSubmitting(true);
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setSubmitting(false);
      setError(submitError.message ?? copy.errGeneric[lang]);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (confirmError) {
      setSubmitting(false);
      setError(confirmError.message ?? copy.errGeneric[lang]);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      await onPaid(paymentIntent.id);
    } else {
      setSubmitting(false);
      setError(copy.errGeneric[lang]);
    }
  }

  return (
    <div className="space-y-4 rounded-[var(--radius-lg)] bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
      <PaymentElement />
      {error ? <p className="text-sm text-warn">{error}</p> : null}
      <Button
        type="button"
        size="lg"
        className="w-full sm:w-auto"
        disabled={submitting || !stripe}
        onClick={handleConfirm}
      >
        {submitting ? copy.sendingBooking[lang] : copy.confirmButton[lang]}
      </Button>
    </div>
  );
}
