# Preston preview QA

Executor: Agent X. Date: 2026-09-05. Scope: new isolated Preston project only.

## Completed

- Clean initial workspace confirmed before creating the new project.
- TypeScript no-emit check passed.
- ESLint passed without warnings.
- Production Next.js 16.2.6 / React 19.2.4 build passed.
- Thirteen automated checks passed: menu source identity, malformed input rejection, image allowlist, THC/nicotine split, price validity, grouped-SKU identity, source sales/date preservation, preview sitemap exclusion, future canonical sitemap generation, all five Weed names, raw inventory filter preservation, unknown tier handling and exact nonduplicated SEO titles.
- Local production server: http://localhost:3017.
- Independent read-only API check: HTTP 200, connected, CHC01 response-validated, 143 records and 143 unique product URLs; source date 2026-09-05T12:15:01.000Z.
- Parity: 84 flower plus 59 items. Source categories map to 84 flower, 2 pre-rolls, 3 THC vape disposables, 14 edibles, 4 concentrates, 8 accessories, 9 nicotine vapes, 15 cigarettes, and 4 uncategorized source entries.
- Grouped SKUs are retained without inferring individual variant availability.

## Independent browser QA

Parent tested the completed image/copy version using the browser UI:

- 390×844 homepage: all six generated illustrations loaded; all five Weed names present; one H1; no horizontal overflow; navigation and button targets at least 44px.
- Exotic Weed: 17 results; nonsense search returned zero; reset restored results; Sativa returned three; ascending source prices read 40, 40, 45.
- Product detail: Tequila Sunrise opened at 360px, image loaded, no horizontal overflow, correct Weed tier and telephone link.
- 360px menu: Edibles filter returned 14; no horizontal overflow; input, select and filter controls at least 44px.
- Contact: correct 286 Preston address, phone and owner map link. FAQ toggle worked.
- 360px homepage: all five Weed labels and no horizontal overflow.
- Desktop 1280×900: image hero visually checked, one H1, correct canonical, noindex and no browser console errors.
- Desktop age gate verified. Fresh 360×800 phone tab: dialog at x16/y146.5, width313/height506.9, entirely within viewport; Yes target48px and No target44px; visually reviewed and Yes successfully entered. Temporary viewport overrides reset by parent.
- Final production rebuild after responsive-image-size, title-helper and loading-heading refinements passed. TypeScript, ESLint and all 13 tests passed on final source.
- Final restarted-server HTTP readback: all five tier routes returned 200 with exactly one H1 containing the correct Weed name; exact absolute title `[Tier Weed] | Preston Cannabis Ottawa`; no duplicated brand suffix; noindex/nofollow/noarchive response headers.

Follow-up refinements: card-specific responsive image sizes avoid overfetching the four half-width phone cards; first two desktop cards request appropriate half-width sources. Streaming loading fallback uses H2 so it cannot add a second H1 ahead of the final route content.

## Pending

- Local application QA is complete.
- Vercel authentication, deployment and public apex HTTPS verification are complete; see the deployment receipt below. The www Vercel certificate/308 redirect passed, with ordinary local DNS cache propagation still pending at the last check.
- Canonical POD9 registration, Preston store code, FMD NAP/stock authority, opening hours and indexed-release approval.

## Corrected setup incident

Agent X mistakenly created an empty `preston-cannabis` project in CLI account `trungndesign99s-projects` after interpreting that account as verified. Parent clarified the fleet team is different. No source files, menu endpoint, deployment or user domain were uploaded. Read-only checks showed zero deployments, zero cloud environment variables, and only its automatically assigned vercel.app hostname. Following corrected read-only local environment validation, automatic review approved deletion of that exact empty project. It was removed. The generated local `.vercel` link and OIDC-only `.env.local` were also removed after exact path/project validation. No global login or existing project was changed.

## Attribution and boundaries

No commit or push. All new app files are under the isolated Preston directory. Existing FYC/CHC sources were read only. FYC live site, all other child repos, GBP, GSC, FMD, POD registry, Google Sheets, Apps Script source, DNS and production domain aliases were not changed.

## Graphics revision 2

Owner screenshot feedback addressed by four mature trimmed-bud tier illustrations, six category-specific still lifes and one abstract emerald brand panel. Hero and Exotic are byte-for-byte unchanged; all original variants are preserved. New assets use distinct v2 WebP filenames. No SEO copy, Weed names, canonical slugs, stock filters, price logic, NAP or noindex policy changed.

Modified source: `lib/artwork.ts`, `components/CategoryCollections.tsx`, `components/LocalArtwork.tsx`, `app/page.tsx`, `app/globals.css`, `.vercelignore`; added `scripts/export-artwork-v2.mjs` and eleven files under `public/artwork/`. Artwork prompts/source receipt updated in `artwork-prompts.md`.

Revision 2 TypeScript, ESLint, all 13 automated checks and production rebuild passed. The updated server is ready at localhost:3017.

Independent parent browser QA passed:

- 390px: all five tier images loaded, including the unchanged Exotic plus four v2 illustrations; all six category images loaded with correct category links.
- 360px: new Preston panel visible with readable live text; all 13 page images loaded with zero broken images and no horizontal overflow.
- 1280px desktop: category grid visually reviewed; 13/13 images loaded; all five Weed labels present; exactly one H1; no horizontal overflow; browser console errors empty.
- Temporary viewport overrides reset after verification.

Revision 2 is complete locally. Hero, Exotic, SEO copy, Weed names, canonicals, feed/filter and price logic, NAP and noindex behavior remain unchanged. No publication, deployment, commit, push or external-service mutation occurred in this revision.

## Approved deployment attempt: authorization pending

On 2026-09-05 the parent relayed the owner's explicit approval for the new Preston project in fleet team `athenashopvn888-2439s-projects` (`team_IqYig3d4WKblBzRjJ50L7GEc`) and eventual connection of `prestoncannabis.com` and `www.prestoncannabis.com`, retaining noindex. Approval is recorded separately in `deployment-approval-2026-09-05.md`; successful authentication and deployment are not implied by approval.

- Global CLI identity belongs to a different account and was not changed or used to deploy. Two device-login attempts used only the isolated `.vercel-auth-preston` configuration. The first pending process was canceled on the parent's instruction; the second process, session 96297, was left available for owner authorization without further polling at handoff.
- Parent verified the intended Athena account in the browser, but Allow Access remained disabled on both device pages. No authentication bypass or credential extraction was attempted.
- `.vercel-auth-preston/` is excluded by `.gitignore` and `.vercelignore`; these protections were installed before the isolated login attempts. Secret values were not printed, committed or uploaded.
- The connected deployment alternative was invoked with the exact Preston path and approved fleet team. Automatic review rejected it before execution because it did not recognize exact-destination/source-egress authorization. No retry or alternate upload was attempted after rejection. Parent is handing authorization back to the owner.
- No source deployment, cloud environment provisioning, custom-domain assignment, DNS change, global login change, commit or push occurred during these attempts. Existing projects and mail records were not touched. Local noindex safeguards and the previously tested application are unchanged.

Files changed in this deployment/authentication turn: `.gitignore`, `.vercelignore`, `docs/deployment-approval-2026-09-05.md`, and this QA report. The final paused handoff changed only this QA report. Local isolated CLI configuration may exist in the ignored auth directory; it is not a publishable artifact. Live verification and exact Vercel DNS records remain pending successful authorized access and deployment.

## Deployment retry: authentication and candidate verification succeeded

The owner requested another attempt. Fresh scoped device authorization succeeded normally; isolated CLI identity is `athenashopvn888-2439`, with OWNER access to the exact approved fleet team. Global CLI login was not changed. Historical blocked attempts above remain an audit trail, not current deployment status.

- New project: `prj_i4GLP2Okj1j6fmS6xyHFZUqg5mz1`, team `team_IqYig3d4WKblBzRjJ50L7GEc`.
- Deployment: `dpl_DFLXFcbMytnjxhuz8Ki1ncjqyE6Z`, READY; Next.js webpack cloud build succeeded in 36 seconds.
- Candidate: https://preston-cannabis-ch3fbddhh-athenashopvn888-2439s-projects.vercel.app
- Fresh local typecheck, ESLint and all 13 automated checks passed before upload. Dry-run verified 62 uploaded files, approximately 2.8 MB; env files, auth configuration, internal documentation and private source/provisioning helpers were excluded.
- Only APPS_SCRIPT_URL and MENU_STORE_CODE were added as sensitive encrypted variables to Preston preview and production, privately through stdin. Link generated an ignored local OIDC environment file; it was not uploaded.
- Parent independently verified the protected candidate in the authenticated Athena browser: exact home title, one H1, apex canonical, noindex/nofollow, all 13 images loaded, original Exotic retained; 390px home/menu without overflow; 143 CHC01 entries; search 24K GOLD returned one $45 source entry; product route `/products/24k-gold-flower-546` loaded correct source/tier/details and explicit temporary inventory notice; browser console errors empty.
- After this verification, only the approved apex and www domains were attached. www redirects to apex with 308. The validated candidate was promoted successfully. DNS and public TLS verification remain pending the parent's registrar change.
- Installed CLI58.9 protected-fetch command forwards its global-config option incorrectly; protection was not disabled. Parent browser verification supplied independent end-to-end evidence instead.

Live REST domain configuration recommends apex A `216.150.1.1` and `216.150.16.1` (rank 1) and www CNAME `ca902283f0c5a6ae.vercel-dns-016.com.` (rank 1). CLI58.9 still displays legacy `76.76.21.21`, which the live REST response ranks second. Parent owns Namecheap updates and preserves mail/NS records.

An initial team-details read unexpectedly included an invite code and billing metadata in tool output; it was reported to the parent and not repeated in this receipt. Subsequent API reads select only necessary public deployment/domain fields. No login-token or stock-endpoint value was printed.

New/updated local deployment artifacts: `.vercelignore`, `scripts/provision-approved-vercel.mjs`, `docs/onboarding-manifest.json`, this QA report, plus ignored CLI-generated `.vercel/`, `.vercel-auth-preston/` and `.env.local`. No commit or push. No other site, shared registry, GBP, GSC, Sheets or Apps Script mutation. Noindex and temporary-source labeling remain unchanged.

## Custom-domain verification

Parent reported saving Namecheap www CNAME `ca902283f0c5a6ae.vercel-dns-016.com.`, replacing the apex URL redirect with A `216.150.1.1` (30-minute TTL), and adding apex A `216.150.16.1` (Automatic TTL). Independent registrar reload and mail-record verification are owned by the parent; Agent X made no DNS edits.

- Vercel live domain configuration reports apex configured by A and www by CNAME, both `misconfigured: false`.
- Deployment alias API confirms both approved domains on `dpl_DFLXFcbMytnjxhuz8Ki1ncjqyE6Z`; www redirect target is the apex. No manual alias repair was needed.
- Ordinary public `https://prestoncannabis.com` returned 200 with exact home title and `X-Robots-Tag: noindex, nofollow, noarchive`.
- Public menu API returned 200: connected, CHC01, response-validated source identity, 143 entries, source stockDate `2026-09-05T12:15:01.000Z`, and the exact all-entries temporary-inventory notice.
- All five tier pages returned 200 with their exact Weed SEO title, exactly one H1, and noindex headers. Contact returned 200. Robots permits crawling `/` to read noindex and disallows `/api/`; sitemap returned 200 with zero URLs.
- Ordinary www fetch on this machine still reached cached Namecheap addresses (`104.219.250.36`, `2.59.170.19`) and failed TLS. A diagnostic HTTPS request for the real www hostname with DNS lookup directed to the recommended Vercel address `216.150.1.1` passed normal certificate validation (`authorized: true`) and returned 308 to `https://prestoncannabis.com/`. TLS verification was never disabled. This proves the Vercel certificate and redirect work, but does not claim every recursive DNS cache has refreshed.

Public apex launch is verified. Remaining domain caveat is cached www DNS propagation; canonical fleet onboarding and indexed-release authorization remain separate pending work.

### Independent registrar and browser receipt

Parent confirmed a full Namecheap page reload after saving, with exactly three host records:

- Apex A `216.150.1.1`, TTL 30 minutes.
- Apex A `216.150.16.1`, TTL Automatic.
- www CNAME `ca902283f0c5a6ae.vercel-dns-016.com.`, TTL 30 minutes.

The old apex URL redirect is gone. All five mail-forwarding MX records remain unchanged: eforward1/2/3 priority 10, eforward4 priority 15, eforward5 priority 20. Nameservers remain `dns1.registrar-servers.com` and `dns2.registrar-servers.com`.

Independent public in-app browser navigation to the HTTPS apex opened Preston with the correct H1, title and noindex. Parent additionally confirmed the deployed candidate has 13/13 loaded images, no horizontal overflow at 390px, 143 menu entries, working search and product navigation, and no browser console errors. This independent readback completes the registrar and public-apex launch receipt. No further external writes were performed by Agent X for this receipt.

## Flower weight-price display update

Owner authorized a Preston-only update and deployment to show every source-listed flower weight/price instead of only a lowest-price summary. Live apex/API were checked first; 84 flower entries exposed one to three valid weight options. A fresh read-only raw CHC01 response confirmed the exact available price fields are price3g, price5g, price14g and price28g. No extra weight options were inferred.

- Shared `FlowerPrices` component displays each normalized weight/current price on flower cards and product detail, preserving valid source sale and regular prices. Missing/zero/invalid options remain excluded; empty pricing is explicitly unconfirmed. Non-flower rendering, sorting semantics, source identity, NAP, SEO, images and noindex are unchanged.
- Compact card rows wrap price pairs on narrow screens; detail rows use the same source data. No new client fetching or interactive controls were introduced.
- `flowerPrices` extraction retains the existing normalization rules with explicit unique source-field mappings. Three added regression tests cover every valid weight, missing/zero/malformed values, sale validity, unique mapping and duplicate source rows. All 16 tests, TypeScript, ESLint and local production build passed.
- Feature-branch creation was attempted but parent repository `.git/HEAD.lock` is read-only; the root remains unborn on master. No escalation, commit, push, forced Git write or unrelated output change was made. New Preston source remains isolated and untracked as before.
- Preview deployment `dpl_T3NPLHLM31JPcbxa55Bo9LTVn1NP` is READY at https://preston-cannabis-qcn4yzvwb-athenashopvn888-2439s-projects.vercel.app . Cloud build passed in 19 seconds. Production promotion awaits independent parent browser QA.

Changed files: `lib/menu-core.mjs`, new `components/FlowerPrices.tsx`, `components/MenuGrid.tsx`, `app/products/[slug]/page.tsx`, `app/globals.css`, `tests/menu.test.mjs`, and this QA report. No DNS, .ca, GSC, endpoint or other-site changes in this update.

Parent's candidate browser QA paused when automatic review rejected interacting with the 19+ age gate in this run. Parent requested owner authorization for that UI step. No gate bypass or alternate entry was attempted; promotion is held until that authorization and independent visual QA are complete. The previous public deployment remains active.

### Flower update released after owner-approved QA

Owner explicitly approved the age-gate QA step. Parent entered through the normal UI and verified the candidate: 390px MKU card and detail both show 3g $20, 5g $30, 14g $70; 360px 24K GOLD shows 5g regular $60 struck through and current $45; neither viewport overflows; browser console errors empty; noindex retained.

Agent X promoted the approved preview. Vercel created production rebuild `dpl_Fmg6CHSs1nN6FMjrwnYBFWDWEyVb`, which reached READY and acquired the .com aliases. Production URL: https://preston-cannabis-3b9b7om7i-athenashopvn888-2439s-projects.vercel.app . Public .com readback confirms `/menu/flower` HTTP 200 with all 177 source-listed weight rows across 84 flowers, MKU detail exactly 3g $20 / 5g $30 / 14g $70, and 24K GOLD detail 5g regular $60 / current $45. All retain noindex response headers. The historical QA hold is resolved.

Only after live pricing verification, the approved .ca redirect setup began. Both `prestoncannabis.ca` and `www.prestoncannabis.ca` are now attached to the existing Preston project and configured for 308 directly to `prestoncannabis.com`. Ownership verified; DNS/TLS/path-and-query readback pending the parent's registrar changes. See `domain-strategy-2026-09-06.md` for the PINKY strategy and scoped records. No GSC, DNS, copy or environment writes were performed by Agent X in this phase.

The earlier www.com DNS cache caveat is now resolved on ordinary public HTTPS: `https://www.prestoncannabis.com/menu/flower?source=domain-check` returned 308 directly to `https://prestoncannabis.com/menu/flower?source=domain-check`, preserving path and query with normal TLS validation.

### .ca DNS readback and certificate status

Parent's full Namecheap reload confirmed exactly two host records: @ A `216.150.1.1` and www CNAME `ca902283f0c5a6ae.vercel-dns-016.com.`, both TTL 30 minutes. No URL redirect; the second A input never saved and its empty row was canceled. All five MX forwarding records/priorities and both registrar nameservers remain unchanged. Vercel reports both hostnames correctly configured, so a second A is not required for valid routing.

Both .ca redirect aliases belong to the current production deployment. Final bounded edge check with normal hostname/certificate verification: www.ca HTTP 308 directly to the matching .com path and query, authorized TLS true. Apex .ca still reports `ERR_TLS_CERT_ALTNAME_INVALID` at Vercel; apex certificate readiness remains pending. Ordinary local DNS also still caches old Namecheap addresses. No TLS bypass, further DNS edits or GSC writes occurred. Detailed strategy and actual-record receipt: `domain-strategy-2026-09-06.md`.

### Original domain/GSC setup: final independent completion

Parent's later normal HTTPS browser navigation verified both .ca hostnames reach the matching .com page with the query preserved: `/menu/flower?source=domain-check`, title Flower. No TLS warning or bypass occurred. The earlier apex-certificate pending status is resolved by this independent browser evidence; previous command-line failures used stale local DNS.

Parent verified AthenaShopVn identity in Google and registered both `sc-domain:prestoncannabis.com` and `sc-domain:prestoncannabis.ca`. Both Search Console Settings read “You are a verified owner”; Users identifies AthenaShopVn. Separate ownership TXT records were added at @ on each domain without printing their values; .com full-reload readback matched the exact requested TXT. Existing A/CNAME, MX and nameservers remained unchanged. .com Overview reports initial data processing, not search-performance results. See `gsc-verification-2026-09-06.md`.

Noindex is unchanged. No empty-sitemap submission, indexing request or Change of Address was made. Recent read-only .com check still returned 200 with 177 rendered flower weight-price rows and noindex/nofollow/noarchive. The new `PRESTON_NEAR_ME_50KM_VARIANT_V1` rollout is PAUSED; only initial read-only discovery occurred before the pause, and content/schema/code implementation remains unstarted.

This final receipt changed only QA, domain strategy, onboarding metadata and the GSC verification document. No app/SEO source, GSC, DNS, environment, deployment or other-store mutation was performed by Agent X in this receipt-only phase. No commit or push.

Additional final independent DNS readback: Resolve-DnsName sees exactly one Google ownership TXT on each .com/.ca domain, values withheld. Both domains retain eforward1/2/3 MX priority 10, eforward4 priority 15 and eforward5 priority 20. Parent reloaded and left the primary .com Search Console Settings page open after verified-owner readback.

## Owner address correction: 268 Preston St

On 2026-09-06 the owner explicitly corrected the website street address from 286 Preston St to 268 Preston St. This supersedes earlier address receipts without rewriting their historical evidence. Ottawa, ON K1R 7R6, phone 343-804-9020 and canonical domain remain unchanged; no new postal-code confirmation is claimed.

Narrow runtime changes: `lib/site.ts`, `lib/editorial.ts`, `app/contact/page.tsx`, `app/page.tsx`. Existing metadata, shared location displays, homepage caption and quick link now use 268. The old map shortlink pointed to 286 and is replaced by a Google Maps address query for 268 Preston St, Ottawa, ON K1R 7R6; no coordinates were guessed. No new structured-data entity or promotional copy was added.

Added `tests/address.test.mjs` to guard the corrected address/map query and unchanged phone, postal code, domain and noindex. All 17 tests, TypeScript and lint pass. The SCC/near-me rollout remains PAUSED: only read-only audit work and an excluded internal audit script existed; no new landing page, public copy or schema was implemented or included in this address correction. Current onboarding manifest updated; historical receipts preserved. Deployment/live readback follows below once verified.

Local production build passed. Upload dry-run verified 63 app files and excluded internal audit script, docs, tests and private env/auth files. Production deployment `dpl_ADcwXrDZc1HcCL2MEeEDHdiFUM7T` reached READY (cloud build 18 seconds), aliased to https://prestoncannabis.com . Candidate/artifact URL: https://preston-cannabis-qvxblajph-athenashopvn888-2439s-projects.vercel.app .

Agent X's normal public HTTPS readback of `/`, `/contact`, `/faq`, `/weed-dispensary-ottawa`, `/resources/first-visit` and `/menu/flower` returned 200, each displaying 268 Preston St with no old 286 Preston St or old map shortlink. Home/contact include the new 268 address-query map. Every route retains noindex/nofollow/noarchive; flower menu still renders 177 weight-price rows. No DNS, GSC, inventory, hours, other-site or paused-landing-rollout change occurred. No commit or push. Awaiting the parent's independent completion readback.

Parent's independent live QA now passes all 12 routes: `/`, `/contact`, `/faq`, `/weed-dispensary-ottawa`, `/resources/first-visit`, `/menu`, `/menu/flower`, `/exotic`, `/premium`, `/aaa`, `/aa`, `/budget`. Each returned 200 with correct 268 address, no old 286 address or old map link, the correct .com canonical, and noindex/nofollow/noarchive. Parent also reloaded the contact page in the actual browser and saw 268 in the main content and footer plus the 268 map query. .ca/www redirect checks for `/contact` returned 308 to .com/contact under normal TLS. The address correction is complete; the broader landing-page rollout remains paused.

Address-task files changed: `lib/site.ts`, `lib/editorial.ts`, `app/contact/page.tsx`, `app/page.tsx`, new `tests/address.test.mjs`, `docs/onboarding-manifest.json`, and `docs/qa-report.md`. Previously paused audit artifacts were preserved and excluded from deployment, not part of this runtime correction.

Handoff clarification: `docs/approval-continuity.md` now explicitly labels its original 286 paragraph as historical/superseded and identifies the dated 268 owner instruction as current authority. Historical evidence is preserved to prevent accidental future reversion.

## Resumed near-me variant: local candidate, 2026-09-06

Owner resumed PRESTON_NEAR_ME_50KM_VARIANT_V1; this supersedes earlier PAUSED status. Read-only current LIVE SCC audit found40stable sitemap routes, one additional branded contact alias, and blog308redirects;67flower and61item-detail sitemap entries inventoried without copying source inventory. Live resources/grabba are newer than the clean local SCC checkout. Full evidence and proposed mapping are preserved; final PINKY applicability explicitly supersedes the proposed broad matrix.

Implemented11approved landing routes with exact PINKY packets, one server renderer and stable business/website identities. Seven geographic pages use address-based50000metre GeoCircle under WebPage.spatialCoverage→Place, not a delivery/service area. No numeric coordinates, hours, offers, product schema, stock claims or new inventory SEO. Exact268NAP; canonical.com and noindex throughout. Old /weed-dispensary-ottawa is now308→/weed-dispensary-near-me; all existing internal hrefs target the new owner. Resource directory uses approved packet H1 labels for discoverability, with resource/status links in footer.

QA: npm run build, npm run check, npm run lint and24tests PASS. Tests include exact raw-to-runtime copy parity, unique route/title/meta/H1, all approved internal links, geographic eligibility, exactFAQschema parity, one identity and forbidden-schema guards, plus all prior inventory/weight-price/NAP/tier tests. An initial typecheck saw stale generated .next references to the removed old route; the successful production build regenerated these and subsequent typecheck passes.

Local production server restarted on3017 after verifying the old listener belonged to this Preston app. HTTP readback passed12checks for each of11pages (132checks):200, exacttitle/H1, singleH1, selfcanonical, noindex, visiblecopy, correct268NAP, singlebusiness, pageidentity, radiuseligibility and FAQparity. Redirect308preservesquery; sitemap remains empty. Machine evidence: preston-near-me-local-readback.json. Homepage fresh HTTP also confirms268present,286absent, oldhrefabsent,newhrefpresent. Historical286 literals in tests are negative regression assertions, never public text.

React/Next review: server-only renderer, no new client bundles/fetchwaterfalls, native JSON-LD escaping, native accessible FAQ details, oneH1, responsive wrapping and44pxlinks; existinggraphics unchanged. Independent browser QA pending. **No deployment/publishing of this variant yet.** No DNS/GSC/env/inventory/Sheet/AppsScript/other-store writes; SCC untouched. No commit/push; existing root untracked source/output preserved.

Runtime files: new components/LandingPage.tsx; lib/landing-contract.mjs, landing-schema.mjs, landing-types.ts, landing-copy.json, landing-copy.ts;11app route wrappers (including replacements contact,faq,first-visit); removed old app/weed-dispensary-ottawa/page.tsx; updates app/layout.tsx, app/globals.css, app/page.tsx, app/[tier]/page.tsx, app/menu/[category]/page.tsx, components/Chrome.tsx, lib/route-registry.mjs and next.config.ts. Menu/tier edits are link-target-only; copy, raw filters and price logic preserved.

Tests/receipts: tests/landing-copy.test.mjs, tests/landing-schema.test.mjs; scripts/audit-scc-live.mjs and scripts/verify-landings.mjs; .vercelignore excludesaudit/verification scripts. Docs: scc-live-architecture-evidence.json, preston-near-me-mapping-proposed.md, preston-near-me-final-applicability.md, both raw pinky-preston-copy-batch JSON packets supplied byroot, pinky-consultation.md, preston-near-me-local-readback.json, onboarding-manifest.json and thisQA report.

### Candidate approval and production completion

Root independent local candidate QA PASSED: fresh homepage268fiveinstances/zero286/newcorelink; coreandresources desktop+390/360px visual review,nohorizontaloverflow/erroroverlay;all11routes200,uniqueH1/canonical/noindex;oneLocalBusiness/WebSite,50000onlysevengeographicpages,noareaServed/coords;old308querypreserved;independentcheck/lint/24tests pass. Earlier stalebrowserDOMshowedold286; normalreload/freshHTTPprovedcurrent268 andresolvedit withoutunnecessarysourcechanges.

After explicit owner production authorization, verified existing scopedAthena identity and exactPrestonproject prj_i4GLP2Okj1j6fmS6xyHFZUqg5mz1 on fleet team team_IqYig3d4WKblBzRjJ50L7GEc. Uploaddryrun excludes env/auth/docs/tests/audithelpers; additionallyexcluded*.tsbuildinfo. Productiondeploy downloaded76files, cloudbuild20seconds, READY deployment **dpl_FpPjUEf7ko4wGtqSFbFmaH1BGCLg**, artifact https://preston-cannabis-rn017m08x-athenashopvn888-2439s-projects.vercel.app, aliased https://prestoncannabis.com.

Live .com checks PASS for all11approved pages (132checks) plushomepage. ExactPINKYtitles/H1/body/FAQ,oneH1,268NAP,canonical.com,noindex/nofollow/noarchive,onebusinessandwebsite identity,exactFAQschema andsevenaddress-based50000metre geographic scopes verified. No radius onhomepage/contact/FAQ/delivery/resourceshub. Old /weed-dispensary-ottawa?qa=keep returns308to /weed-dispensary-near-me?qa=keep. Empty sitemap preserved.

NormalTLS redirectspotchecks: www.prestoncannabis.com,prestoncannabis.ca,www.prestoncannabis.ca eachreturn308directto https://prestoncannabis.com/resources/first-visit?qa=domain-check. NoDNSwriteorredirectconfigurationchange was required.

Fresh menu changed naturally withCHC01source:138products,83flowers,stockDate2026-09-06T00:53:37.000Z. APIstateconnected/sourceCHC01/response-validated;175normalizedflowerprice options match175renderedweightrows. Earlier177countis historical, not hardcoded expectation. Sourceattributionandnoindex retained. No menu/pricinglogic change. Deployment-scoped errorlogquery last30minutes returnedzeroentries; this is a bounded check, not ongoingmonitoring.

Final machine receipt: preston-near-me-production-receipt.json. CurrentmanifestandPINKYreceipt updated. No commit/push; no SCC/FYC/otherstores, GSC/DNS/GBP, Sheet/AppsScript, hours/inventorysource orindexing changes. Variant label retained for future comparison; no GSCperformance/indexing/ranking success asserted.
