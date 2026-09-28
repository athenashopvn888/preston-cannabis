import { HOURS_STATUS } from "../../lib/content-hub.mjs";
import { SITE } from "../../lib/site";
import { buildTvStore } from "./tvStoreFacts.js";

/**
 * Header facts for /tv and /tv2. Address and hours come from this store's
 * own published data. The 24-hour alert is on only when those hours cover
 * every day as an all-day window.
 */
export const tvStore = buildTvStore({
  name: SITE.name,
  streetAddress: SITE.address,
  city: SITE.city,
  weekly: HOURS_STATUS.weekly,
  summary: HOURS_STATUS.summary,
});
