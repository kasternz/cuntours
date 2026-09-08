import { i as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as getTour, d as tourPrice, i as formatUsd, n as cn, r as formatDateLong, s as lastMinuteTours } from "./tours-CU1pddPA.mjs";
import { B as require_react, _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Menu, i as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CzEyuvxd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var nav = [
	{
		kind: "route",
		to: "/tours",
		label: "Tours"
	},
	{
		kind: "hash",
		href: "/#ultimo-dia",
		label: "Último día"
	},
	{
		kind: "route",
		to: "/resenas",
		label: "Reseñas"
	}
];
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border/80 bg-bg/90 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-baseline gap-2",
					onClick: () => setOpen(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl tracking-tight text-ink",
						children: "Cuntours"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden text-xs text-muted sm:inline",
						children: "Cancún · Riviera Maya"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-7 md:flex",
					children: [nav.map((item) => item.kind === "hash" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: item.href,
						className: "text-sm text-ink-soft hover:text-ink",
						children: item.label
					}, item.href) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "text-sm text-ink-soft hover:text-ink",
						activeProps: { className: "text-sm text-ink" },
						children: item.label
					}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/tours",
						className: "inline-flex h-11 items-center rounded-[var(--radius-md)] bg-teal px-4 text-sm font-medium text-foam transition-transform duration-150 ease-out hover:bg-teal-deep active:scale-[0.96]",
						children: "Reservar"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] text-ink md:hidden",
					"aria-expanded": open,
					"aria-label": open ? "Cerrar menú" : "Abrir menú",
					onClick: () => setOpen((v) => !v),
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 22 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 22 })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("border-t border-border bg-bg px-4 py-3 md:hidden", open ? "block" : "hidden"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-col gap-1",
				children: [nav.map((item) => item.kind === "hash" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: item.href,
					className: "flex h-11 items-center text-sm text-ink",
					onClick: () => setOpen(false),
					children: item.label
				}, item.href) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					className: "flex h-11 items-center text-sm text-ink",
					onClick: () => setOpen(false),
					children: item.label
				}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/tours",
					className: "mt-2 inline-flex h-11 items-center justify-center rounded-[var(--radius-md)] bg-teal text-sm font-medium text-foam",
					onClick: () => setOpen(false),
					children: "Reservar"
				})]
			})
		})]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-auto border-t border-border bg-teal-deep text-foam",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl tracking-tight",
					children: "Cuntours"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xs text-sm leading-relaxed text-foam/75",
					children: "Operadora local en Cancún. Tours acuáticos y arqueológicos con compra directa, sin marketplace."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Explorar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm text-foam/80",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/tours",
							className: "hover:text-foam",
							children: "Todos los tours"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/tours?cat=acuatico",
							className: "hover:text-foam",
							children: "Actividades acuáticas"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/tours?cat=arqueologico",
							className: "hover:text-foam",
							children: "Tours arqueológicos"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/resenas",
							className: "hover:text-foam",
							children: "Reseñas de viajeros"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#ultimo-dia",
							className: "hover:text-foam",
							children: "Ofertas de último día"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Operación"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm leading-relaxed text-foam/75",
					children: [
						"Cancún, Quintana Roo",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Recogida en zona hotelera, downtown y Riviera Maya",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Cancelación gratis hasta 24 h antes"
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-foam/10 px-4 py-4 text-center text-xs text-foam/55",
			children: "Cuntours · Cancún tours · reseñas de viajeros al estilo de las plataformas de la Riviera Maya."
		})]
	});
}
function deadlineFor(departs) {
	const d = /* @__PURE__ */ new Date();
	if (departs === "manana") d.setDate(d.getDate() + 1);
	d.setHours(18, 0, 0, 0);
	if (d.getTime() < Date.now()) d.setHours(23, 59, 59, 0);
	return d;
}
function pad(n) {
	return String(n).padStart(2, "0");
}
function Countdown({ departs }) {
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	const ms = Math.max(0, deadlineFor(departs).getTime() - now);
	const h = Math.floor(ms / 36e5);
	const m = Math.floor(ms % 36e5 / 6e4);
	const s = Math.floor(ms % 6e4 / 1e3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "tabular-nums",
		children: [
			pad(h),
			":",
			pad(m),
			":",
			pad(s)
		]
	});
}
function LastMinuteStrip() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const flash = lastMinuteTours();
	if (!flash.length) return null;
	if (pathname.startsWith("/checkout") || pathname.startsWith("/confirmacion")) return null;
	const soonest = flash.find((t) => t.lastMinute?.departs === "hoy") ?? flash[0];
	const seats = flash.reduce((s, t) => s + (t.lastMinute?.seats ?? 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-teal-deep text-foam",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-sm sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: "Último día."
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-foam/80",
						children: [
							seats,
							" asientos · cierra en",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Countdown, { departs: soonest.lastMinute.departs })
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				hash: "ultimo-dia",
				className: "shrink-0 font-medium text-foam underline-offset-4 hover:underline",
				children: "Ver ofertas"
			})]
		})
	});
}
var styles_default = "/assets/styles-C6HM-PXh.css";
var APP_NAME = "Cuntours";
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Cuntours: tours en Cancún y Riviera Maya. Actividades acuáticas, zonas arqueológicas y ofertas de último día con compra directa."
			},
			{
				name: "theme-color",
				content: "#0D6E6A"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Outfit:wght@400;500;600&display=swap"
			}
		]
	}),
	component: RootLayout
});
function RootLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		suppressHydrationWarning: true,
		className: "antialiased",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "flex min-h-dvh flex-col bg-bg text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LastMinuteStrip, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$4 = () => import("./routes-DljKBsVu.mjs");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,color] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal", {
	variants: {
		variant: {
			primary: "bg-teal text-foam hover:bg-teal-deep",
			inverse: "bg-bg text-ink hover:bg-bg-elevated",
			outline: "bg-transparent text-ink shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-lift)]",
			ghost: "bg-transparent text-ink hover:bg-surface",
			warn: "bg-warn text-bg-elevated hover:opacity-90"
		},
		size: {
			sm: "h-10 rounded-[var(--radius-sm)] px-3.5 text-sm",
			md: "h-11 rounded-[var(--radius-md)] px-5 text-sm",
			lg: "h-12 rounded-[var(--radius-md)] px-6 text-base"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = (0, import_react.forwardRef)(({ className, variant, size, type = "button", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	ref,
	type,
	className: cn(buttonVariants({
		variant,
		size
	}), className),
	...props
}));
Button.displayName = "Button";
var Input = (0, import_react.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	ref,
	className: cn("h-11 w-full rounded-[var(--radius-sm)] bg-bg-elevated px-3.5 text-base text-ink shadow-[var(--shadow-border)] placeholder:text-muted", "transition-[box-shadow] duration-150 ease-out", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal", className),
	...props
}));
Input.displayName = "Input";
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("block text-sm font-medium text-ink-soft", className),
		...props
	});
}
var STORAGE_KEY = "cuntours-last-booking";
var emptyGuest = {
	name: "",
	email: "",
	phone: "",
	notes: "",
	payAtPickup: true
};
function bookingId() {
	return `CT-${Math.floor(1e4 + Math.random() * 9e4)}`;
}
var useCart = create((set, get) => ({
	draft: null,
	guest: emptyGuest,
	lastBooking: null,
	setDraft: (draft) => set({ draft }),
	patchDraft: (patch) => {
		const current = get().draft;
		if (!current) return;
		set({ draft: {
			...current,
			...patch
		} });
	},
	patchGuest: (patch) => set({ guest: {
		...get().guest,
		...patch
	} }),
	confirm: () => {
		const { draft, guest } = get();
		if (!draft) return null;
		const tour = getTour(draft.tourSlug);
		if (!tour) return null;
		const booking = {
			...draft,
			...guest,
			id: bookingId(),
			tourName: tour.name,
			total: tourPrice(tour, draft.adults, draft.children),
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		try {
			sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
		} catch {}
		set({
			lastBooking: booking,
			draft: null
		});
		return booking;
	},
	loadLast: () => {
		if (get().lastBooking) return;
		try {
			const raw = sessionStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			set({ lastBooking: JSON.parse(raw) });
		} catch {}
	}
}));
var Route$4 = createFileRoute("/checkout")({ component: CheckoutPage });
function CheckoutPage() {
	const navigate = useNavigate();
	const draft = useCart((s) => s.draft);
	const guest = useCart((s) => s.guest);
	const patchGuest = useCart((s) => s.patchGuest);
	const confirm = useCart((s) => s.confirm);
	const [card, setCard] = (0, import_react.useState)("");
	const [expiry, setExpiry] = (0, import_react.useState)("");
	const [cvc, setCvc] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const tour = draft ? getTour(draft.tourSlug) : void 0;
	const total = (0, import_react.useMemo)(() => {
		if (!tour || !draft) return 0;
		return tourPrice(tour, draft.adults, draft.children);
	}, [tour, draft]);
	if (!draft || !tour) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg px-4 py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "No hay reserva en curso"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "Elige un tour y pulsa Reservar ahora para comprar directo."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/tours",
				className: "mt-6 inline-flex h-11 items-center rounded-[var(--radius-md)] bg-teal px-5 text-sm font-medium text-foam",
				children: "Ver tours"
			})
		]
	});
	function onSubmit(e) {
		e.preventDefault();
		setError("");
		if (!guest.name.trim() || !guest.email.trim() || !guest.phone.trim()) {
			setError("Nombre, correo y teléfono son obligatorios.");
			return;
		}
		if (!guest.email.includes("@")) {
			setError("Revisa el correo.");
			return;
		}
		if (!guest.payAtPickup) {
			if (card.replace(/\s/g, "").length < 15) {
				setError("Número de tarjeta incompleto.");
				return;
			}
			if (!/^\d{2}\/\d{2}$/.test(expiry)) {
				setError("Vencimiento en formato MM/AA.");
				return;
			}
			if (cvc.length < 3) {
				setError("CVC incompleto.");
				return;
			}
		}
		setSubmitting(true);
		if (!confirm()) {
			setSubmitting(false);
			setError("No se pudo confirmar. Intenta de nuevo.");
			return;
		}
		navigate({ to: "/confirmacion" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto grid w-full max-w-5xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium uppercase tracking-[0.16em] text-teal",
					children: "Compra directa"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl tracking-tight",
					children: "Datos de la reserva"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "font-display text-xl tracking-tight",
							children: "Viajero principal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "name",
							children: "Nombre completo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "name",
							className: "mt-1.5",
							autoComplete: "name",
							value: guest.name,
							onChange: (e) => patchGuest({ name: e.target.value }),
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email",
								children: "Correo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "email",
								className: "mt-1.5",
								autoComplete: "email",
								value: guest.email,
								onChange: (e) => patchGuest({ email: e.target.value }),
								required: true
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "phone",
								children: "Teléfono / WhatsApp"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "phone",
								type: "tel",
								className: "mt-1.5",
								autoComplete: "tel",
								value: guest.phone,
								onChange: (e) => patchGuest({ phone: e.target.value }),
								required: true
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "notes",
							children: "Notas (alergias, silla de ruedas, habitación)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "notes",
							className: "mt-1.5",
							value: guest.notes,
							onChange: (e) => patchGuest({ notes: e.target.value })
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "font-display text-xl tracking-tight",
							children: "Pago"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] bg-bg-elevated px-4 shadow-[var(--shadow-border)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "pay",
									checked: guest.payAtPickup,
									onChange: () => patchGuest({ payAtPickup: true }),
									className: "accent-teal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: "Pagar al recoger en el hotel"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] bg-bg-elevated px-4 shadow-[var(--shadow-border)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "pay",
									checked: !guest.payAtPickup,
									onChange: () => patchGuest({ payAtPickup: false }),
									className: "accent-teal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: "Pagar ahora con tarjeta"
								})]
							})]
						}),
						!guest.payAtPickup ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 rounded-[var(--radius-lg)] bg-bg-elevated p-4 shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "card",
									children: "Número de tarjeta"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "card",
									className: "mt-1.5",
									inputMode: "numeric",
									autoComplete: "cc-number",
									placeholder: "4242 4242 4242 4242",
									value: card,
									onChange: (e) => setCard(e.target.value)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "exp",
										children: "Vence"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "exp",
										className: "mt-1.5",
										placeholder: "MM/AA",
										autoComplete: "cc-exp",
										value: expiry,
										onChange: (e) => setExpiry(e.target.value)
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "cvc",
										children: "CVC"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "cvc",
										className: "mt-1.5",
										inputMode: "numeric",
										autoComplete: "cc-csc",
										value: cvc,
										onChange: (e) => setCvc(e.target.value)
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: "En esta reserva de muestra el cargo no se procesa con un banco real."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "El conductor confirma el pago en efectivo o tarjeta al recoger. Sin cargo hoy."
						})
					]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-warn",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "lg",
					className: "w-full sm:w-auto",
					disabled: submitting,
					children: submitting ? "Confirmando…" : `Confirmar · ${formatUsd(total)}`
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "h-fit rounded-[var(--radius-xl)] bg-bg-elevated p-5 shadow-[var(--shadow-border)] lg:sticky lg:top-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: tour.image,
					alt: "",
					className: "h-36 w-full rounded-[var(--radius-md)] object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-xl tracking-tight",
					children: tour.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Fecha",
							v: formatDateLong(draft.date)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Viajeros",
							v: `${draft.adults} adultos${draft.children ? `, ${draft.children} niños` : ""}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Recogida",
							v: draft.pickup
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-between border-t border-border pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: "Total"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl tabular-nums",
						children: formatUsd(total)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/tours/$slug",
					params: { slug: tour.slug },
					className: "mt-4 inline-block text-sm text-teal",
					children: "Cambiar tour"
				})
			]
		})]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-right text-ink",
			children: v
		})]
	});
}
var $$splitComponentImporter$3 = () => import("./confirmacion-UqcijxQW.mjs");
var Route$3 = createFileRoute("/confirmacion")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./resenas-COUwwW2z.mjs");
var Route$2 = createFileRoute("/resenas")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./tours-DwCWtD6i.mjs");
var Route$1 = createFileRoute("/tours")({
	validateSearch: (search) => {
		const cat = search.cat;
		if (cat === "acuatico" || cat === "arqueologico" || cat === "ultimo" || cat === "todos") return { cat };
		return {};
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./tours._slug-QW6xTgWV.mjs");
var Route = createFileRoute("/tours/$slug")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var CheckoutRoute = Route$4.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$6
});
var ConfirmacionRoute = Route$3.update({
	id: "/confirmacion",
	path: "/confirmacion",
	getParentRoute: () => Route$6
});
var ResenasRoute = Route$2.update({
	id: "/resenas",
	path: "/resenas",
	getParentRoute: () => Route$6
});
var ToursRoute = Route$1.update({
	id: "/tours",
	path: "/tours",
	getParentRoute: () => Route$6
});
var ToursRouteChildren = { ToursSlugRoute: Route.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => ToursRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	CheckoutRoute,
	ConfirmacionRoute,
	ResenasRoute,
	ToursRoute: ToursRoute._addFileChildren(ToursRouteChildren)
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Label as a, Countdown as c, useCart as i, Route as n, Input as o, Route$1 as r, Button as s, router_exports as t };
