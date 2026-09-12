import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { createSpeiPaymentFn } from "@/lib/mercadopago-fn";
import { useLang } from "@/i18n/context";
import { copy } from "@/i18n/copy";
import { Button } from "@/components/ui/button";

type Props = {
  amountUsd: number;
  bookingId: string;
  guestEmail: string;
  guestName: string;
  canSubmit: () => string | null;
  onConfirmed: (mercadopagoPaymentId: string) => Promise<void>;
};

export function SpeiTransferSection(props: Props) {
  const { lang } = useLang();
  const [state, setState] = useState<"loading" | "ready" | "unavailable">("loading");
  const [payment, setPayment] = useState<{
    paymentId: string;
    amountMxn: number;
    ticketUrl: string | null;
    financialInstitution: string | null;
    reference: string | null;
  } | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setState("loading");
    createSpeiPaymentFn({
      data: {
        amountUsd: props.amountUsd,
        bookingId: props.bookingId,
        guestEmail: props.guestEmail || "cliente@cuntours.com",
        guestName: props.guestName || "Cliente",
      },
    })
      .then((res) => {
        if (cancelled) return;
        if (res.ok) {
          setPayment({
            paymentId: res.paymentId,
            amountMxn: res.amountMxn,
            ticketUrl: res.ticketUrl,
            financialInstitution: res.financialInstitution,
            reference: res.reference,
          });
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

  async function handleConfirm() {
    setError("");
    const guestError = props.canSubmit();
    if (guestError) {
      setError(guestError);
      return;
    }
    if (!payment) return;
    setSubmitting(true);
    await props.onConfirmed(payment.paymentId);
  }

  if (state === "loading") {
    return <p className="text-sm text-muted">{copy.sendingBooking[lang]}</p>;
  }

  if (state === "unavailable" || !payment) {
    return (
      <p className="text-sm text-warn">
        {lang === "es"
          ? "La transferencia no está disponible en este momento. Elige pagar con tarjeta."
          : "Bank transfer isn't available right now. Choose to pay by card instead."}
      </p>
    );
  }

  return (
    <div className="space-y-3 rounded-[var(--radius-lg)] bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
      <p className="text-sm text-muted">{copy.transferInstructions[lang]}</p>

      <p className="font-display text-2xl tracking-tight">
        ${payment.amountMxn.toLocaleString("es-MX")} MXN
      </p>
      <p className="-mt-2 text-xs text-muted">
        {lang === "es"
          ? "Monto exacto a transferir (en pesos mexicanos, según el tipo de cambio de hoy)."
          : "Exact amount to transfer (in Mexican pesos, at today's exchange rate)."}
      </p>

      {payment.financialInstitution ? (
        <Row k={copy.transferBank[lang]} v={payment.financialInstitution} />
      ) : null}
      {payment.reference ? <Row k={copy.transferClabe[lang]} v={payment.reference} /> : null}

      {payment.ticketUrl ? (
        <a
          href={payment.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-teal text-sm font-medium text-foam"
        >
          <ExternalLink size={16} />
          {lang === "es" ? "Ver datos de transferencia" : "View transfer details"}
        </a>
      ) : null}

      <p className="text-xs text-muted">
        {lang === "es"
          ? "Tu reserva se confirma automáticamente en cuanto la transferencia llegue — no hace falta mandar comprobante."
          : "Your booking confirms automatically once the transfer arrives — no receipt needed."}
      </p>

      {error ? <p className="text-sm text-warn">{error}</p> : null}

      <Button type="button" size="lg" className="w-full" disabled={submitting} onClick={handleConfirm}>
        {submitting ? copy.sendingBooking[lang] : copy.confirmReservationTransfer[lang]}
      </Button>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-muted">{k}</span>
      <span className="text-ink">{v}</span>
    </div>
  );
}
