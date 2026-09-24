# Preston Cannabis

New isolated Next.js 16 storefront; executor Agent X. Green/ivory PC-leaf visual identity and Fort York-style menu/category layout. Ottawa / desired POD9 onboarding. This is a preview, not an indexed Preston inventory launch.

## Run

Use Node 22 or newer. `npm install`, then `npm run dev`. `npm run build` builds the deployment. `npm test`, `npm run check`, and `npm run lint` verify the core adapter and app.

Set `APPS_SCRIPT_URL` in ignored `.env.local`. The storefront requests `?store=TPC01`. A missing `MENU_STORE_CODE`, or a leftover `MENU_STORE_CODE=CHC01`, still resolves to TPC01. Any other store code is rejected. On DESK, `node scripts/with-source.mjs start` can inject the approved endpoint directly into the process without creating a secret file. Response identity mismatch rejects data. Errors never fabricate stock or flower weights. Weights shown are only 3g, 5g, 14g, and 28g, and only when that source price is positive. No endpoint or secret is sent to the client. The normalized public menu endpoint is `/api/menu`.

Opening hours and delivery details remain phone-confirmed. Contact fields use 268 Preston St.

Indexing is deliberately disabled through metadata, HTTP headers and empty sitemap. Robots allows page crawling so the noindex directives can be observed, while blocking API paths. Indexing cannot be enabled just by an environment variable. See `docs/seo-coverage.md` and `docs/onboarding-manifest.json` for release gates.

Use a dedicated Vercel project and preview deploy. Do not assign prestoncannabis.com or aliases from another project as part of this preview package. No existing child source, GBP, FMD, Sheet, Apps Script or Command Center records are mutated.
