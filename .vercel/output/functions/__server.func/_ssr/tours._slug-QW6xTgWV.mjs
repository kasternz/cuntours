import { i as __toESM } from "../_runtime.mjs";
import { a as getTour, c as relatedTours, d as tourPrice, i as formatUsd, l as todayIso, t as categoryLabel } from "./tours-CU1pddPA.mjs";
import { B as require_react, v as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Clock, l as MapPin, o as Plus, p as Check, r as Users, s as Minus, u as Languages } from "../_libs/lucide-react.mjs";
import { a as Label, c as Countdown, i as useCart, n as Route, o as Input, s as Button } from "./router-CzEyuvxd.mjs";
import { s as reviewsForTour, t as CircleRating } from "./traveler-rating-DRFW5lbJ.mjs";
import { t as ReviewCard } from "./review-card-DN8dg_mq.mjs";
import { t as TourCard } from "./tour-card-CwjXq_OP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tours._slug-QW6xTgWV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Qty({ label, value, min = 0, max = 12, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-ink-soft",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] bg-surface text-ink transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-40",
					"aria-label": `Menos ${label}`,
					disabled: value <= min,
					onClick: () => onChange(Math.max(min, value - 1)),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 16 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-6 text-center tabular-nums text-ink",
					children: value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] bg-surface text-ink transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-40",
					"aria-label": `Más ${label}`,
					disabled: value >= max,
					onClick: () => onChange(Math.min(max, value + 1)),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 })
				})
			]
		})]
	});
}
function TourDetail() {
	const { slug } = Route.useParams();
	const tour = getTour(slug);
	const navigate = useNavigate();
	const setDraft = useCart((s) => s.setDraft);
	const [date, setDate] = (0, import_react.useState)(() => tour?.lastMinute?.departs === "hoy" ? todayIso(0) : todayIso(1));
	const [adults, setAdults] = (0, import_react.useState)(2);
	const [children, setChildren] = (0, import_react.useState)(0);
	const [pickup, setPickup] = (0, import_react.useState)("");
	if (!tour) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-4 py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Tour no encontrado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "Ese enlace ya no existe o cambió de nombre."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/tours",
				className: "mt-6 inline-flex text-sm font-medium text-teal",
				children: "Volver al catálogo"
			})
		]
	});
	const total = tourPrice(tour, adults, children);
	const tourReviews = reviewsForTour(tour.slug);
	const related = relatedTours(tour.slug);
	const minDate = tour.lastMinute?.departs === "hoy" ? todayIso(0) : todayIso(0);
	function book() {
		if (adults + children < 1) return;
		setDraft({
			tourSlug: tour.slug,
			date,
			adults,
			children,
			pickup: pickup.trim() || "Zona hotelera Cancún"
		});
		navigate({ to: "/checkout" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-[46vh] min-h-72 w-full overflow-hidden sm:h-[56vh]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: tour.image,
					alt: tour.name,
					className: "size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-0 left-0 right-0 mx-auto max-w-6xl px-4 pb-8 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium uppercase tracking-[0.16em] text-foam/80",
						children: categoryLabel(tour.category)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-4xl tracking-tight text-foam sm:text-5xl",
						children: tour.name
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex h-9 min-w-9 items-center justify-center rounded-[var(--radius-sm)] bg-teal px-2 font-medium tabular-nums text-foam",
							children: tour.rating.toFixed(1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleRating, { value: tour.rating }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-muted",
							children: [
								tour.rating.toFixed(1),
								" · ",
								tour.reviewCount.toLocaleString("es-MX"),
								" reseñas de viajeros"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft",
					children: tour.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-6 grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
							icon: Clock,
							label: "Duración",
							value: tour.duration
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
							icon: MapPin,
							label: "Lugar",
							value: tour.location
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
							icon: Users,
							label: "Grupo",
							value: tour.groupSize
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
							icon: Languages,
							label: "Idiomas",
							value: tour.languages
						})
					]
				}),
				tour.lastMinute ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 rounded-[var(--radius-lg)] bg-warn-soft p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium text-warn",
						children: ["Oferta de último ", tour.lastMinute.departs === "hoy" ? "día" : "aviso"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-ink-soft",
						children: [
							"Quedan ",
							tour.lastMinute.seats,
							" asientos · −",
							tour.lastMinute.discountPct,
							"% · cierra en ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Countdown, { departs: tour.lastMinute.departs })
						]
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 flex flex-wrap gap-2",
					children: tour.highlights.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-full bg-surface px-3 py-1.5 text-sm text-ink-soft",
						children: h
					}, h))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-10 font-display text-2xl tracking-tight",
					children: "Qué incluye"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2",
					children: tour.includes.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-2 text-sm text-ink-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							size: 16,
							className: "mt-0.5 shrink-0 text-teal"
						}), item]
					}, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 font-display text-2xl tracking-tight",
					children: "No incluye"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 list-disc space-y-1 pl-5 text-sm text-muted",
					children: tour.notIncluded.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 font-display text-2xl tracking-tight",
					children: "Punto de encuentro"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-ink-soft",
					children: tour.meeting
				}),
				tourReviews.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight",
						children: "Reseñas de este tour"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 grid gap-4",
						children: tourReviews.map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewCard, { review }, review.id))
					})]
				}) : null
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "lg:sticky lg:top-24 lg:self-start",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-xl)] bg-bg-elevated p-5 shadow-[var(--shadow-lift)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end justify-between gap-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								tour.originalPrice && tour.originalPrice > tour.price ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted line-through",
									children: formatUsd(tour.originalPrice)
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-4xl tracking-tight",
									children: formatUsd(tour.price)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: "por adulto · niño 60%"
								})
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "date",
									children: "Fecha"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "date",
									type: "date",
									className: "mt-1.5",
									min: minDate,
									value: date,
									onChange: (e) => setDate(e.target.value)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qty, {
									label: "Adultos",
									value: adults,
									min: 1,
									onChange: setAdults
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qty, {
									label: "Niños",
									value: children,
									min: 0,
									onChange: setChildren
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "pickup",
									children: "Hotel de recogida"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "pickup",
									className: "mt-1.5",
									placeholder: "Ej. Grand Fiesta Americana",
									value: pickup,
									onChange: (e) => setPickup(e.target.value)
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex items-center justify-between border-t border-border pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl tabular-nums tracking-tight",
								children: formatUsd(total)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-4 w-full",
							size: "lg",
							onClick: book,
							disabled: adults < 1,
							children: "Reservar ahora"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-center text-xs text-muted",
							children: "Cancelación gratis hasta 24 h antes. Confirmación inmediata."
						})
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 p-3 backdrop-blur-md lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl tabular-nums leading-none",
					children: formatUsd(total)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 text-xs text-muted",
					children: [
						"total · ",
						adults + children,
						" viajeros"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					onClick: book,
					disabled: adults < 1,
					children: "Reservar"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:pb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-tight",
				children: "También te puede interesar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: related.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TourCard, { tour: t }, t.slug))
			})]
		})
	] });
}
function Meta({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-start gap-3 rounded-[var(--radius-md)] bg-bg-elevated p-3 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			size: 18,
			className: "mt-0.5 text-teal"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-ink",
			children: value
		})] })]
	});
}
//#endregion
export { TourDetail as component };
