import { f as tours, n as cn } from "./tours-CU1pddPA.mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Route$1 } from "./router-CzEyuvxd.mjs";
import { t as TourCard } from "./tour-card-CwjXq_OP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tours-DwCWtD6i.js
var import_jsx_runtime = require_jsx_runtime();
var filters = [
	{
		id: "todos",
		label: "Todos"
	},
	{
		id: "acuatico",
		label: "Acuáticos"
	},
	{
		id: "arqueologico",
		label: "Arqueológicos"
	},
	{
		id: "ultimo",
		label: "Último día"
	}
];
function ToursPage() {
	const { cat } = Route$1.useSearch();
	const active = cat ?? "todos";
	const list = tours.filter((t) => {
		if (active === "todos") return true;
		if (active === "ultimo") return Boolean(t.lastMinute);
		return t.category === active;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium uppercase tracking-[0.16em] text-teal",
				children: "Catálogo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight",
				children: "Tours en Cancún y Riviera Maya"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-base leading-relaxed text-muted",
				children: "Compra directa. Recogida en hotel. Elige agua o piedra — o quédate con lo que sale hoy."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex gap-2 overflow-x-auto pb-1",
				children: filters.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/tours",
					search: f.id === "todos" ? {} : { cat: f.id },
					className: cn("inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm font-medium transition-colors duration-150", active === f.id ? "bg-teal text-foam" : "bg-surface text-ink-soft hover:text-ink"),
					children: f.label
				}, f.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-sm text-muted",
				children: [
					list.length,
					" ",
					list.length === 1 ? "tour" : "tours"
				]
			}),
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-muted",
				children: "No hay tours en este filtro."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: list.map((tour) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TourCard, { tour }, tour.slug))
			})
		]
	});
}
//#endregion
export { ToursPage as component };
