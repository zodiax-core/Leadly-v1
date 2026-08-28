import { n as __exportAll$1 } from "../_runtime.mjs";
import { d as anyApi } from "../_libs/@convex-dev/auth+[...].mjs";
import { t as componentsGeneric } from "../_libs/convex.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-xr_VpTVu.js
var api_xr_VpTVu_exports = /* @__PURE__ */ __exportAll$1({
	n: () => api_exports,
	t: () => api
});
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
/**
* Generated `api` utility.
*
* THIS CODE IS AUTOMATICALLY GENERATED.
*
* To regenerate, run `npx convex dev`.
* @module
*/
var api_exports = /* @__PURE__ */ __exportAll({ api: () => api });
/**
* A utility for referencing Convex functions in your app's API.
*
* Usage:
* ```js
* const myFunctionReference = api.myModule.myFunction;
* ```
*/
var api = anyApi;
componentsGeneric();
//#endregion
export { api_xr_VpTVu_exports as n, api as t };
