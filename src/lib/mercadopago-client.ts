import { initMercadoPago } from "@mercadopago/sdk-react";

let initialized = false;

/** Initializes the MercadoPago SDK once. Safe to call on every render. */
export function ensureMercadoPagoInitialized() {
  if (initialized) return;
  const key = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY as string | undefined;
  if (!key) return;
  initMercadoPago(key, { locale: "es-MX" });
  initialized = true;
}
