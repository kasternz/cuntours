import { i as __toESM } from "../_runtime.mjs";
import { f as tours, i as formatUsd, n as cn, s as lastMinuteTours, t as categoryLabel, u as totalReviewCount } from "./tours-CU1pddPA.mjs";
import { B as require_react, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Shield, d as Clock, f as ChevronDown, h as ArrowRight, n as Waves, p as Check } from "../_libs/lucide-react.mjs";
import { c as Countdown } from "./router-CzEyuvxd.mjs";
import { a as ratingLabel, i as ratingDistribution, n as TravelerRating, o as reviews, r as averageRating, t as CircleRating } from "./traveler-rating-DRFW5lbJ.mjs";
import { t as ReviewCard } from "./review-card-DN8dg_mq.mjs";
import { t as TourCard } from "./tour-card-CwjXq_OP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DljKBsVu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var faqs = [
	{
		q: "¿Puedo salir hoy o mañana?",
		a: "Sí. Las ofertas de último día son salidas con asientos libres para hoy o mañana. Cierra la venta a las 18:00. El resto del catálogo se reserva con cualquier fecha."
	},
	{
		q: "¿La compra es directa?",
		a: "Sí. Operamos desde Cancún: eliges el tour, pagas aquí o al recoger en el hotel, y recibes un folio CT al instante. Sin marketplace ni comisión de tercero."
	},
	{
		q: "¿Las reseñas son de TripAdvisor?",
		a: "Mostramos reseñas de viajeros de la Riviera Maya redactadas al estilo de las plataformas de opiniones (TripAdvisor y similares): pareja, familia, amigos o solo. No es un widget oficial de TripAdvisor."
	},
	{
		q: "¿Qué incluye la recogida?",
		a: "Zona hotelera de Cancún, downtown y buena parte de la Riviera Maya. Indica el nombre del hotel al reservar. Si estás en Airbnb, usa el hotel más cercano o un punto de encuentro."
	},
	{
		q: "¿Puedo cancelar?",
		a: "Cancelación gratis hasta 24 horas antes. Si el mar o el INAH cierran el sitio, se reprograma o se devuelve el 100%. Niños pagan el 60% del adulto."
	}
];
function FaqList() {
	const [open, setOpen] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y divide-border rounded-[var(--radius-lg)] bg-bg-elevated shadow-[var(--shadow-border)]",
		children: faqs.map((item, i) => {
			const isOpen = open === i;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "flex min-h-12 w-full items-center justify-between gap-4 px-5 py-4 text-left",
				"aria-expanded": isOpen,
				onClick: () => setOpen(isOpen ? null : i),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-ink",
					children: item.q
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					size: 18,
					className: cn("shrink-0 text-muted transition-transform duration-200 ease-out", isOpen && "rotate-180")
				})]
			}), isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 pb-5 text-sm leading-relaxed text-muted",
				children: item.a
			}) : null] }, item.q);
		})
	});
}
function Home() {
	const flash = lastMinuteTours();
	const avg = averageRating();
	const dist = ratingDistribution();
	const featured = tours.filter((t) => !t.lastMinute).slice(0, 6);
	const published = totalReviewCount();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative min-h-[78vh] overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/hero-riviera.jpg",
					alt: "Costa de la Riviera Maya vista desde el aire",
					className: "absolute inset-0 size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium uppercase tracking-[0.18em] text-foam/80",
							children: "Cancún · Riviera Maya"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-foam sm:text-6xl",
							children: "Tours de último día, compra directa."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xl text-base leading-relaxed text-foam/85 sm:text-lg",
							children: "Catamarán, cenotes, Chichén Itzá y Tulum. Operadora local: eliges, pagas aquí y mañana estás en el agua o frente a la pirámide."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#ultimo-dia",
								className: "inline-flex h-12 items-center rounded-[var(--radius-md)] bg-bg px-5 text-sm font-medium text-ink transition-transform duration-150 ease-out hover:bg-bg-elevated active:scale-[0.96]",
								children: "Ofertas de hoy"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/tours",
								className: "inline-flex h-12 items-center gap-2 rounded-[var(--radius-md)] px-5 text-sm font-medium text-foam ring-1 ring-foam/35 transition-transform duration-150 ease-out hover:bg-foam/10 active:scale-[0.96]",
								children: ["Ver catálogo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 flex flex-wrap items-center gap-4 text-sm text-foam/85",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex h-10 min-w-10 items-center justify-center rounded-[var(--radius-sm)] bg-teal px-2 font-medium tabular-nums text-foam",
									children: avg.toFixed(1)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleRating, {
										value: avg,
										size: 12,
										className: "[&_.bg-surface]:bg-foam/25 [&_.bg-teal]:bg-foam"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foam",
										children: ratingLabel(avg)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-0.5 block text-foam/70",
									children: [published.toLocaleString("es-MX"), " reseñas de viajeros · Riviera Maya"]
								})] })]
							})
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border bg-bg-elevated",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl gap-6 px-4 py-5 sm:grid-cols-3 sm:px-6",
				children: [
					{
						icon: Clock,
						t: "Último día",
						d: "Asientos que salen hoy o mañana"
					},
					{
						icon: Shield,
						t: "Compra directa",
						d: "Sin marketplace. Confirmación al instante"
					},
					{
						icon: Waves,
						t: "Mar y ruinas",
						d: "Acuáticos y arqueológicos, un solo operador"
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
						className: "mt-0.5 size-5 text-teal",
						strokeWidth: 1.7
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-ink",
						children: item.t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: item.d
					})] })]
				}, item.t))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "ultimo-dia",
			className: "scroll-mt-24 mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium uppercase tracking-[0.16em] text-teal",
					children: "Último día"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl tracking-tight sm:text-4xl",
					children: "Sale hoy. Quedan asientos."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-sm text-sm leading-relaxed text-muted",
					children: "Precio de cierre para salidas con lugares libres. El reloj corre hasta las 18:00."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 md:grid-cols-3",
				children: flash.map((tour) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-bg-elevated shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/tours/$slug",
						params: { slug: tour.slug },
						className: "block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[16/10] overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: tour.image,
								alt: tour.name,
								className: "size-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "absolute left-3 top-3 rounded-full bg-warn px-2.5 py-1 text-xs font-medium text-bg-elevated",
								children: [
									"−",
									tour.lastMinute?.discountPct,
									"% ·",
									" ",
									tour.lastMinute?.departs === "hoy" ? "Hoy" : "Mañana"
								]
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col gap-3 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-muted",
								children: categoryLabel(tour.category)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl leading-snug tracking-tight",
								children: tour.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									"Quedan ",
									tour.lastMinute?.seats,
									" asientos · cierra en",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Countdown, { departs: tour.lastMinute.departs })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-auto flex items-end justify-between pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted line-through",
									children: formatUsd(tour.originalPrice ?? tour.price)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-3xl tracking-tight",
									children: formatUsd(tour.price)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/tours/$slug",
									params: { slug: tour.slug },
									className: "inline-flex h-11 items-center rounded-[var(--radius-md)] bg-teal px-4 text-sm font-medium text-foam transition-transform duration-150 ease-out hover:bg-teal-deep active:scale-[0.96]",
									children: "Comprar"
								})]
							})
						]
					})]
				}, tour.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-teal-deep text-foam",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/tours",
					search: { cat: "acuatico" },
					className: "group relative min-h-64 overflow-hidden rounded-[var(--radius-xl)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/cenotes.jpg",
							alt: "Cenote en la selva de Quintana Roo",
							className: "absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-ink/45" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex h-full min-h-64 flex-col justify-end p-7",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm uppercase tracking-[0.16em] text-foam/80",
									children: "Agua"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 font-display text-3xl tracking-tight",
									children: "Actividades acuáticas"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-sm text-sm text-foam/80",
									children: "Catamarán, arrecife, tiburón ballena, cenotes y Cozumel."
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/tours",
					search: { cat: "arqueologico" },
					className: "group relative min-h-64 overflow-hidden rounded-[var(--radius-xl)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/chichen-itza.jpg",
							alt: "Pirámide de Chichén Itzá al amanecer",
							className: "absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-ink/45" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex h-full min-h-64 flex-col justify-end p-7",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm uppercase tracking-[0.16em] text-foam/80",
									children: "Piedra"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 font-display text-3xl tracking-tight",
									children: "Tours arqueológicos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-sm text-sm text-foam/80",
									children: "Chichén Itzá, Tulum, Cobá y Ek Balam con guía certificado."
								})
							]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight sm:text-4xl",
					children: "El catálogo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/tours",
					className: "inline-flex items-center gap-1 text-sm font-medium text-teal",
					children: ["Ver todos ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: featured.map((tour) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TourCard, { tour }, tour.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-bg-elevated",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: "Tres pasos, sin WhatsApp eterno"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-8 grid gap-6 md:grid-cols-3",
					children: [
						{
							n: "01",
							t: "Elige",
							d: "Acuático o arqueológico. Filtra por último día si sales mañana."
						},
						{
							n: "02",
							t: "Compra",
							d: "Fecha, hotel de recogida y pago aquí. Confirmación al instante."
						},
						{
							n: "03",
							t: "Sale",
							d: "Te recogemos. Guía certificado. Cancelación gratis 24 h antes."
						}
					].map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-[var(--radius-lg)] bg-bg p-6 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-sm tabular-nums text-teal",
								children: step.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-display text-2xl tracking-tight",
								children: step.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: step.d
							})
						]
					}, step.n))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "resenas",
			className: "scroll-mt-24 mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-[minmax(0,300px)_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TravelerRating, {
					average: avg,
					count: published,
					distribution: dist
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/resenas",
					className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal",
					children: ["Ver todas las reseñas ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: reviews.slice(0, 6).map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewCard, { review }, review.id))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 pb-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl tracking-tight",
				children: "Preguntas de último minuto"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqList, {})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-ink text-foam",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl tracking-tight",
						children: "¿Llegaste ayer y no tienes plan?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-lg text-sm leading-relaxed text-foam/75",
						children: "Las ofertas de último día se liberan cada mañana. Recogida en hotel incluida."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-1.5 text-sm text-foam/80",
						children: [
							"Guía certificado INAH / marina",
							"Grupos chicos",
							"Cancelación 24 h"
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									size: 16,
									className: "text-lagoon"
								}),
								" ",
								t
							]
						}, t))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#ultimo-dia",
					className: "inline-flex h-12 items-center rounded-[var(--radius-md)] bg-foam px-6 text-sm font-medium text-ink transition-transform duration-150 ease-out hover:bg-bg active:scale-[0.96]",
					children: "Ver salidas de hoy"
				})]
			})
		})
	] });
}
//#endregion
export { Home as component };
