//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-BkJ23pHF.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/",
			"/checkout",
			"/confirmacion",
			"/resenas",
			"/tours"
		],
		preloads: [
			"/assets/index-D1tWh1Hw.js",
			"/assets/tours-CGLhFRSq.js",
			"/assets/preload-helper-DnZXO4jr.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-D1tWh1Hw.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-CQYl2_RT.js",
			"/assets/check-YVYTeaBc.js",
			"/assets/tour-card-BYvs8u8H.js",
			"/assets/traveler-rating-8PzgdTgZ.js",
			"/assets/review-card-BhaYOvx_.js"
		]
	},
	"/confirmacion": {
		filePath: "/workspace/src/routes/confirmacion.tsx",
		children: void 0,
		preloads: [
			"/assets/confirmacion-CH8EmHFW.js",
			"/assets/check-YVYTeaBc.js",
			"/assets/map-pin-BHXWQM5C.js",
			"/assets/users-giWNr71f.js"
		]
	},
	"/resenas": {
		filePath: "/workspace/src/routes/resenas.tsx",
		children: void 0,
		preloads: [
			"/assets/resenas-yYBxyA9o.js",
			"/assets/traveler-rating-8PzgdTgZ.js",
			"/assets/review-card-BhaYOvx_.js"
		]
	},
	"/tours": {
		filePath: "/workspace/src/routes/tours.tsx",
		children: ["/tours/$slug"],
		preloads: ["/assets/tours-DlK2ivDo.js", "/assets/tour-card-BYvs8u8H.js"]
	},
	"/tours/$slug": {
		filePath: "/workspace/src/routes/tours.$slug.tsx",
		children: void 0,
		preloads: [
			"/assets/tours._slug-DwgeoxYL.js",
			"/assets/check-YVYTeaBc.js",
			"/assets/map-pin-BHXWQM5C.js",
			"/assets/users-giWNr71f.js",
			"/assets/traveler-rating-8PzgdTgZ.js",
			"/assets/review-card-BhaYOvx_.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
