import { u as totalReviewCount } from "./tours-CU1pddPA.mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as ratingDistribution, n as TravelerRating, o as reviews, r as averageRating } from "./traveler-rating-DRFW5lbJ.mjs";
import { t as ReviewCard } from "./review-card-DN8dg_mq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resenas-COUwwW2z.js
var import_jsx_runtime = require_jsx_runtime();
function ResenasPage() {
	const avg = averageRating();
	const dist = ratingDistribution();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium uppercase tracking-[0.16em] text-teal",
				children: "Viajeros"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight",
				children: "Reseñas de la Riviera Maya"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-base leading-relaxed text-muted",
				children: "Opiniones de parejas, familias y viajeros solos que recorrieron Cancún, Tulum, Chichén Itzá y el arrecife — al estilo de las reseñas de TripAdvisor de la zona."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-10 lg:grid-cols-[minmax(0,300px)_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TravelerRating, {
					average: avg,
					count: totalReviewCount(),
					distribution: dist
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-sm text-muted",
					children: [
						"¿Sales mañana?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							hash: "ultimo-dia",
							className: "font-medium text-teal",
							children: "Ofertas de último día"
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: reviews.map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewCard, { review }, review.id))
				})]
			})
		]
	});
}
//#endregion
export { ResenasPage as component };
