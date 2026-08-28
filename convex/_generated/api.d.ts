/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as ai from "../ai.js";
import type * as aiLeads from "../aiLeads.js";
import type * as auth from "../auth.js";
import type * as campaigns from "../campaigns.js";
import type * as chats from "../chats.js";
import type * as finder from "../finder.js";
import type * as http from "../http.js";
import type * as leadRuns from "../leadRuns.js";
import type * as leads from "../leads.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  ai: typeof ai;
  aiLeads: typeof aiLeads;
  auth: typeof auth;
  campaigns: typeof campaigns;
  chats: typeof chats;
  finder: typeof finder;
  http: typeof http;
  leadRuns: typeof leadRuns;
  leads: typeof leads;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
