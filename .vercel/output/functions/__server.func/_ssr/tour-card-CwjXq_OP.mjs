import { i as formatUsd, t as categoryLabel } from "./tours-CU1pddPA.mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Clock, l as MapPin } from "../_libs/lucide-react.mjs";
import { t as CircleRating } from "./traveler-rating-DRFW5lbJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tour-card-CwjXq_OP.js
var import_jsx_runtime = require_jsx_runtime();
function TourCard({ tour, featured }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-bg-elevated shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 ease-out hover:shadow-[var(--shadow-lift)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/tours/$slug",
			params: { slug: tour.slug },
			className: "flex h-full flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[3/2] overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: tour.image,
					alt: tour.name,
					className: "size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute left-3 top-3 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-bg/92 px-2.5 py-1 text-xs font-medium text-ink",
						children: categoryLabel(tour.category)
					}), tour.lastMinute ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-warn px-2.5 py-1 text-xs font-medium text-bg-elevated",
						children: [
							"Último ",
							tour.lastMinute.departs === "hoy" ? "día" : "aviso",
							" · −",
							tour.lastMinute.discountPct,
							"%"
						]
					}) : null]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col gap-3 p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl leading-snug tracking-tight text-ink",
						children: tour.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: tour.tagline
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleRating, {
								value: tour.rating,
								size: 12
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-ink-soft",
								children: tour.rating.toFixed(1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [
									"(",
									tour.reviewCount.toLocaleString("es-MX"),
									")"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto flex items-end justify-between gap-3 pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1 text-xs text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 13 }),
									" ",
									tour.duration
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 13 }),
									" ",
									tour.location
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [
								tour.originalPrice && tour.originalPrice > tour.price ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted line-through",
									children: formatUsd(tour.originalPrice)
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl leading-none tracking-tight text-ink",
									children: formatUsd(tour.price)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-xs text-muted",
									children: "por adulto"
								})
							]
						})]
					}),
					featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 inline-flex h-11 items-center justify-center rounded-[var(--radius-sm)] bg-teal text-sm font-medium text-foam",
						children: "Reservar ahora"
					}) : null
				]
			})]
		})
	});
}
//#endregion
export { TourCard as t };
