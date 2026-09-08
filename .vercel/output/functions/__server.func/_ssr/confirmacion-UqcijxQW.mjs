import { i as __toESM } from "../_runtime.mjs";
import { a as getTour, i as formatUsd, r as formatDateLong } from "./tours-CU1pddPA.mjs";
import { B as require_react, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as MapPin, m as Calendar, p as Check, r as Users } from "../_libs/lucide-react.mjs";
import { i as useCart } from "./router-CzEyuvxd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/confirmacion-UqcijxQW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Confirmacion() {
	const loadLast = useCart((s) => s.loadLast);
	const booking = useCart((s) => s.lastBooking);
	(0, import_react.useEffect)(() => {
		loadLast();
	}, [loadLast]);
	if (!booking) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg px-4 py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "No hay una reserva reciente"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "Cuando confirmes un tour, el folio y los datos de recogida aparecen aquí."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/tours",
				className: "mt-6 inline-flex h-11 items-center rounded-[var(--radius-md)] bg-teal px-5 text-sm font-medium text-foam",
				children: "Ver tours"
			})
		]
	});
	const tour = getTour(booking.tourSlug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-2xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium uppercase tracking-[0.16em] text-teal",
				children: "Compra directa"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight",
				children: "Reserva confirmada"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-base leading-relaxed text-muted",
				children: [
					"Folio",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium tabular-nums text-ink",
						children: booking.id
					}),
					". Te recogemos en el hotel. Revisa el correo — y guarda este folio."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mt-8 overflow-hidden rounded-[var(--radius-xl)] bg-bg-elevated shadow-[var(--shadow-lift)]",
				children: [tour ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: tour.image,
					alt: "",
					className: "h-44 w-full object-cover"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl tracking-tight",
							children: booking.tourName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-5 grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									icon: Calendar,
									label: "Fecha",
									value: formatDateLong(booking.date)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									icon: Users,
									label: "Viajeros",
									value: `${booking.adults} adultos${booking.children ? ` · ${booking.children} niños` : ""}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									icon: MapPin,
									label: "Recogida",
									value: booking.pickup
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									icon: Check,
									label: "Pago",
									value: booking.payAtPickup ? "Al recoger en el hotel" : `Tarjeta · ${formatUsd(booking.total)}`
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center justify-between border-t border-border pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-3xl tabular-nums tracking-tight",
								children: formatUsd(booking.total)
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-10 grid gap-4 sm:grid-cols-3",
				children: [
					{
						n: "01",
						t: "Correo",
						d: `Confirmación a ${booking.email || "tu correo"}.`
					},
					{
						n: "02",
						t: "Recogida",
						d: "El guía confirma hora la tarde anterior."
					},
					{
						n: "03",
						t: "Sale",
						d: "Lleva traje de baño, bloqueador y el folio."
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-[var(--radius-lg)] bg-bg-elevated p-4 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm tabular-nums text-teal",
							children: s.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-medium",
							children: s.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: s.d
						})
					]
				}, s.n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/tours",
					className: "inline-flex h-12 items-center rounded-[var(--radius-md)] bg-teal px-5 text-sm font-medium text-foam",
					children: "Reservar otro tour"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "inline-flex h-12 items-center rounded-[var(--radius-md)] px-5 text-sm font-medium text-ink shadow-[var(--shadow-border)]",
					children: "Volver al inicio"
				})]
			})
		]
	});
}
function Info({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			size: 18,
			className: "mt-0.5 text-teal"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-sm text-ink",
			children: value
		})] })]
	});
}
//#endregion
export { Confirmacion as component };
