import { n as cn } from "./tours-CU1pddPA.mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/traveler-rating-DRFW5lbJ.js
var import_jsx_runtime = require_jsx_runtime();
var reviews = [
	{
		id: "r1",
		author: "Mariana G.",
		origin: "Ciudad de México",
		date: "agosto 2026",
		rating: 5,
		title: "Chichén al amanecer vale cada peso",
		body: "Llegamos antes de los autobuses grandes. El Castillo con la primera luz es otra cosa. El guía —Andrés— explicó el equinoccio sin relleno y nos dio tiempo para fotos. El cenote de regreso estaba limpio y sin fila. Reserva directa, sin intermediarios: nos confirmaron el hotel en diez minutos.",
		tourSlug: "chichen-itza-amanecer",
		travelerType: "Pareja"
	},
	{
		id: "r2",
		author: "James P.",
		origin: "Austin, EE. UU.",
		date: "julio 2026",
		rating: 5,
		title: "Whale shark, handled with respect",
		body: "Small boat, clear briefing, one pair in the water at a time. We swam beside two whale sharks for about forty minutes. The crew never chased them. Pickup at the hotel was on time. This is how wildlife tours should run.",
		tourSlug: "tiburon-ballena",
		travelerType: "Amigos"
	},
	{
		id: "r3",
		author: "Lucía R.",
		origin: "Madrid",
		date: "junio 2026",
		rating: 4,
		title: "Isla Mujeres: mar de piscina",
		body: "El catamarán estaba bien mantenido y el snorkel en El Meco se vio pez loro y un pez sapo enorme. Open bar correcto, no excesivo. Playa Norte es un sueño. Único pero: el impuesto de muelle no venía en el precio — avisan, pero ajústalo.",
		tourSlug: "catamaran-isla-mujeres",
		travelerType: "Familia"
	},
	{
		id: "r4",
		author: "Sofía M.",
		origin: "Buenos Aires",
		date: "mayo 2026",
		rating: 5,
		title: "Ek Balam sin masivas",
		body: "Habíamos hecho Tulum el día anterior y esto es otro nivel: el friso de estuco se ve de cerca, subimos la Acrópolis y casi no había gente. El cenote después fue el mejor nado del viaje. Guía epigrafista, no recitador.",
		tourSlug: "ek-balam-cenote",
		travelerType: "Pareja"
	},
	{
		id: "r5",
		author: "Diego H.",
		origin: "Bogotá",
		date: "abril 2026",
		rating: 5,
		title: "Cenotes: el abierto y la caverna",
		body: "Tres paradas, ninguna saturada. La caverna con el haz de luz de mediodía es de foto de revista. Casco y chaleco en serio, no de adorno. Almuerzo de cochinita rico. Ideal con niños a partir de 8.",
		tourSlug: "cenotes-sagrados",
		travelerType: "Familia"
	},
	{
		id: "r6",
		author: "Aisha K.",
		origin: "Toronto",
		date: "marzo 2026",
		rating: 4,
		title: "Tulum cliffs, then a swim",
		body: "Morning slot is the move — we had shade and space on the wall walk. The beach under the ruins is as good as the photos. Guide kept the history tight (45 minutes) so we could actually swim. Pickup was 15 minutes late, otherwise perfect.",
		tourSlug: "tulum-playa",
		travelerType: "Solo"
	},
	{
		id: "r7",
		author: "Paola V.",
		origin: "Guadalajara",
		date: "febrero 2026",
		rating: 5,
		title: "Cobá en bici, como debe ser",
		body: "Las calzadas blancas entre selva y las iguanas en las piedras. Subí Nohoch Mul — pesado, pero la vista de dos lagunas lo paga. El pueblo maya del almuerzo no era un show: tortillas hechas ahí. Muy bien organizado.",
		tourSlug: "coba-selva",
		travelerType: "Amigos"
	},
	{
		id: "r8",
		author: "Henri B.",
		origin: "Lyon",
		date: "enero 2026",
		rating: 5,
		title: "Palancar, visibilité irréelle",
		body: "Ferry + deux sites. L’eau de Cozumel n’a rien à voir avec Cancún: 30 mètres, corail sain, courant léger. Le briefing conservation était sérieux. Je recommande le créneau du matin.",
		tourSlug: "cozumel-palancar",
		travelerType: "Pareja"
	},
	{
		id: "r9",
		author: "Carla N.",
		origin: "Monterrey",
		date: "diciembre 2025",
		rating: 4,
		title: "Snorkel corto y honesto",
		body: "Cuatro horas, dos arrecifes, grupo de diez. No prometen tortugas y tuvimos suerte de ver una. Equipo nuevo, guía atento con los que no saben nadar. Precio justo para no armarlo por tu cuenta.",
		tourSlug: "snorkel-arrecife-cancun",
		travelerType: "Familia"
	},
	{
		id: "r10",
		author: "Owen T.",
		origin: "Londres",
		date: "noviembre 2025",
		rating: 5,
		title: "Last-minute Chichén, no stress",
		body: "Booked the evening before after a flight delay. They still had four seats, hotel pickup at 5:40, and we were at the gate before the coach park filled. Direct checkout on the site — no WhatsApp chase. Will use Cuntours again for Isla.",
		tourSlug: "chichen-itza-amanecer",
		travelerType: "Pareja"
	},
	{
		id: "r11",
		author: "Elena S.",
		origin: "Barcelona",
		date: "septiembre 2026",
		rating: 5,
		title: "Llegué anoche, hoy en Isla Mujeres",
		body: "Reserva de último día por la web, folio en un minuto. El catamarán estaba limpio, el snorkel en El Meco se vio pez loro y el tiempo en Playa Norte fue el premio. Compra directa, sin intermediario de hotel.",
		tourSlug: "catamaran-isla-mujeres",
		travelerType: "Pareja"
	},
	{
		id: "r12",
		author: "Noah W.",
		origin: "Chicago",
		date: "agosto 2026",
		rating: 4,
		title: "Tulum without the hotel markup",
		body: "Booked the night before. Morning pickup, a historian who actually answered questions, then a swim under the cliff. Last-minute price beat the concierge by forty dollars. Would have liked twenty more minutes on the beach.",
		tourSlug: "tulum-playa",
		travelerType: "Amigos"
	}
];
function reviewsForTour(slug) {
	return reviews.filter((r) => r.tourSlug === slug);
}
function averageRating() {
	const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
	return Math.round(sum / reviews.length * 10) / 10;
}
function ratingDistribution() {
	return [
		5,
		4,
		3,
		2,
		1
	].map((stars) => ({
		stars,
		count: reviews.filter((r) => r.rating === stars).length
	}));
}
function ratingLabel(value) {
	if (value >= 4.5) return "Excelente";
	if (value >= 4) return "Muy bueno";
	if (value >= 3) return "Promedio";
	if (value >= 2) return "Malo";
	return "Pésimo";
}
function CircleRating({ value, size = 16, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center gap-0.5", className),
		"aria-label": `${value} de 5`,
		children: Array.from({ length: 5 }, (_, i) => {
			const fill = Math.min(1, Math.max(0, value - i));
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "relative inline-block overflow-hidden rounded-full bg-surface",
				style: {
					width: size,
					height: size
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute inset-y-0 left-0 bg-teal",
					style: { width: `${fill * 100}%` }
				})
			}, i);
		})
	});
}
function TravelerRating({ average, count, distribution }) {
	const total = Math.max(1, distribution.reduce((s, d) => s + d.count, 0));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.16em] text-teal",
				children: "Calificación de viajeros"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-end gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-5xl leading-none tracking-tight tabular-nums",
					children: average.toFixed(1)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-ink",
						children: ratingLabel(average)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleRating, {
						value: average,
						size: 14
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: [count.toLocaleString("es-MX"), " reseñas de Cancún y la Riviera Maya"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 space-y-2",
				children: distribution.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-4 tabular-nums text-muted",
							children: row.stars
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-1.5 flex-1 overflow-hidden rounded-full bg-surface",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block h-full rounded-full bg-teal",
								style: { width: `${row.count / total * 100}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-6 tabular-nums text-muted",
							children: row.count
						})
					]
				}, row.stars))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-xs leading-relaxed text-muted",
				children: "Opiniones de viajeros al estilo de las plataformas de reseñas de la Riviera Maya (TripAdvisor y similares). No es un widget oficial."
			})
		]
	});
}
//#endregion
export { ratingLabel as a, ratingDistribution as i, TravelerRating as n, reviews as o, averageRating as r, reviewsForTour as s, CircleRating as t };
