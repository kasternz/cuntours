import { useEffect, useState } from "react";
import { CardPayment } from "@mercadopago/sdk-react";
import { ensureMercadoPagoInitialized } from "@/lib/mercadopago-client";
import { createCardPaymentFn } from "@/lib/mercadopago-fn";
import { useLang } from "@/i18n/context";
import { copy } from "@/i18n/copy";

type Props = {
  amountUsd: number;
  bookingId: string;
  guestEmail: string;
  canSubmit: () => string | null;
  onPaid: (mercadopagoPaymentId: string) => Promise<void>;
};

export function MercadoPagoCardSection({ amountUsd, bookingId, guestEmail, canSubmit, onPaid }: Props) {
  const { lang } = useLang();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    ensureMercadoPagoInitialized();
    setReady(!!(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY as string | undefined));
  }, []);

  if (!ready) {
    return (
      <p className="text-sm text-warn">
        {lang === "es"
          ? "El pago con tarjeta por MercadoPago no está disponible todavía."
          : "Card payment via MercadoPago isn't available yet."}
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <CardPayment
        initialization={{ amount: amountUsd, payer: { email: guestEmail || undefined } }}
        customization={{ visual: { hideFormTitle: true } }}
        onSubmit={async (formData) => {
          setError("");
          const guestError = canSubmit();
          if (guestError) {
            setError(guestError);
            throw new Error(guestError);
          }
          setSubmitting(true);
          try {
            const result = await createCardPaymentFn({
              data: {
                amountUsd,
                bookingId,
                guestEmail,
                token: formData.token,
                paymentMethodId: formData.payment_method_id,
                issuerId: formData.issuer_id,
                installments: formData.installments,
              },
            });
            if (!result.ok) {
              setError(copy.errGeneric[lang]);
              setSubmitting(false);
              return;
            }
            await onPaid(result.paymentId);
          } catch {
            setError(copy.errGeneric[lang]);
            setSubmitting(false);
          }
        }}
        onError={() => setError(copy.errGeneric[lang])}
      />
      {submitting ? <p className="text-sm text-muted">{copy.sendingBooking[lang]}</p> : null}
      {error ? <p className="text-sm text-warn">{error}</p> : null}
    </div>
  );
}
