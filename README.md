# Preston Cannabis

New isolated Next.js 16 storefront; executor Agent X. Green/ivory PC-leaf visual identity and Fort York-style menu/category layout. Ottawa / desired POD9 onboarding. This is a preview, not an indexed Preston inventory launch.

## Run

Use Node 22 or newer. `npm install`, then `npm run dev`. `npm run build` builds the deployment. `npm test`, `npm run check`, and `npm run lint` verify the core adapter and app.

Set only the approved `APPS_SCRIPT_URL` in ignored `.env.local`, and `MENU_STORE_CODE=CHC01`. On DESK, `node scripts/with-source.mjs start` can instead inject that one approved endpoint directly into the process without creating a secret file. Server runtime requests `?store=CHC01`; response identity mismatch rejects data, errors never fabricate stock. No endpoint or secret is sent to the client. The normalized public preview endpoint is `/api/menu`. The current adapter deliberately accepts CHC01 only; switching to Preston requires an approved source-code/identity update, not just an environment change.

All menu records are explicitly CHC01 previews. Opening hours, delivery, store code, inventory verification and POD canonical registration remain pending. Contact fields use the latest owner-supplied 286 Preston address; older 268 graphic mockups are excluded.

Indexing is deliberately disabled through metadata, HTTP headers and empty sitemap. Robots allows page crawling so the noindex directives can be observed, while blocking API paths. Indexing cannot be enabled just by an environment variable. See `docs/seo-coverage.md` and `docs/onboarding-manifest.json` for release gates.

Use a dedicated Vercel project and preview deploy. Do not assign prestoncannabis.com or aliases from another project as part of this preview package. No existing child source, GBP, FMD, Sheet, Apps Script or Command Center records are mutated.
