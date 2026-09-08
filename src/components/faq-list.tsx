import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "¿Puedo salir hoy o mañana?",
    a: "Sí. Las ofertas de último día son salidas con asientos libres para hoy o mañana. Cierra la venta a las 18:00. El resto del catálogo se reserva con cualquier fecha.",
  },
  {
    q: "¿La compra es directa?",
    a: "Sí. Operamos desde Cancún: eliges el tour, pagas aquí o al recoger en el hotel, y recibes un folio CT al instante. Sin marketplace ni comisión de tercero.",
  },
  {
    q: "¿Las reseñas son de TripAdvisor?",
    a: "Mostramos reseñas de viajeros de la Riviera Maya redactadas al estilo de las plataformas de opiniones (TripAdvisor y similares): pareja, familia, amigos o solo. No es un widget oficial de TripAdvisor.",
  },
  {
    q: "¿Qué incluye la recogida?",
    a: "Zona hotelera de Cancún, downtown y buena parte de la Riviera Maya. Indica el nombre del hotel al reservar. Si estás en Airbnb, usa el hotel más cercano o un punto de encuentro.",
  },
  {
    q: "¿Puedo cancelar?",
    a: "Cancelación gratis hasta 24 horas antes. Si el mar o el INAH cierran el sitio, se reprograma o se devuelve el 100%. Niños pagan el 60% del adulto.",
  },
];

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-border rounded-[var(--radius-lg)] bg-bg-elevated shadow-[var(--shadow-border)]">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q}>
            <button
              type="button"
              className="flex min-h-12 w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-medium text-ink">{item.q}</span>
              <ChevronDown
                size={18}
                className={cn(
                  "shrink-0 text-muted transition-transform duration-200 ease-out",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            {isOpen ? (
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
