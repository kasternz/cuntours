import { a as getTour, o as initials } from "./tours-CU1pddPA.mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as CircleRating } from "./traveler-rating-DRFW5lbJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/review-card-DN8dg_mq.js
var import_jsx_runtime = require_jsx_runtime();
function ReviewCard({ review }) {
	const tour = getTour(review.tourSlug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex h-full flex-col rounded-[var(--radius-lg)] bg-bg-elevated p-5 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-foam text-sm font-medium text-teal-deep",
						"aria-hidden": true,
						children: initials(review.author)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-ink",
							children: review.author
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								review.origin,
								" · ",
								review.date
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-surface px-2.5 py-1 text-xs text-ink-soft",
						children: review.travelerType
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleRating, {
					value: review.rating,
					size: 13
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 font-display text-lg leading-snug tracking-tight text-ink",
				children: review.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 flex-1 text-sm leading-relaxed text-ink-soft",
				children: review.body
			}),
			tour ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/tours/$slug",
				params: { slug: tour.slug },
				className: "mt-4 text-sm font-medium text-teal hover:text-teal-deep",
				children: tour.name
			}) : null
		]
	});
}
//#endregion
export { ReviewCard as t };
