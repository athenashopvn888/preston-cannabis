# Preston canonical domain and .ca redirects

Executor: Agent X. Owner explicitly approved this Preston-only phase. Parent handles Namecheap DNS and GSC; Agent X handles only the existing Vercel project `prj_i4GLP2Okj1j6fmS6xyHFZUqg5mz1` in team `team_IqYig3d4WKblBzRjJ50L7GEc`.

## Paid PINKY consultation

Parent consulted the verified Trung Nguyen paid Pro profile in the existing [PINKY consultation](https://chatgpt.com/c/6a9c1c32-460c-83ec-a46e-4a198f579396). Verdict: GO with .com as the sole canonical content site. Both .ca hostnames permanently redirect in a single 308 hop to the matching .com path and query. No duplicated .ca content, no Change of Address request, noindex retained, no empty-sitemap submission or indexing requests. Google Search Console DNS Domain properties for both root domains belong to the parent/Athena lane, subject to account authentication.

This is a domain-routing strategy only. No editorial or keyword text was revised; existing Weed/cannabis/dispensary keyword set and PINKY copy remain unchanged. Format constraint: host-level 308 redirects preserving path/query, not a second website or landing-page silo.

## Vercel implementation

- Existing .com is canonical; existing www.com remains a 308 to the apex.
- Added only `prestoncannabis.ca` and `www.prestoncannabis.ca` to the same existing project after the flower-price update was verified live.
- Both domain records read back `verified: true`, redirect `prestoncannabis.com`, status 308.
- Exact live REST rank-1 DNS recommendations: apex A `216.150.1.1` and `216.150.16.1`; www CNAME `ca902283f0c5a6ae.vercel-dns-016.com.`.
- Parent preserves Namecheap nameservers and all existing MX/mail records. Agent X does not edit DNS.

## Verification status

Vercel configuration is applied. Both .ca records initially report DNS misconfigured pending registrar updates. Public HTTPS, one-hop redirect, matching nested paths and query-string preservation must be verified after DNS/certificate readiness; configuration alone is not reported as completed live verification.

Parent reported Google/Athena reauthentication requires owner completion. No GSC property or DNS verification changes are claimed here. Fleet POD9 registration, official Preston code, Preston inventory authority and indexed-release approval remain pending separately.

## Saved DNS and bounded verification receipt

Parent independently reloaded Namecheap and verified exactly two .ca host records: apex A `216.150.1.1`, TTL 30 minutes; www CNAME `ca902283f0c5a6ae.vercel-dns-016.com.`, TTL 30 minutes. No URL redirect remains. The attempted second A record never persisted; its empty UI row was canceled. The actual configuration has one A record, not two.

Vercel accepts this single rank-1 A address: apex configuredBy A, www configuredBy CNAME, both misconfigured false. Both .ca aliases are attached to current production deployment `dpl_Fmg6CHSs1nN6FMjrwnYBFWDWEyVb` and redirect directly to the .com apex. Parent confirmed all five baseline MX forwarding records and their priorities remain unchanged, along with dns1/dns2.registrar-servers.com nameservers.

At the final bounded check, local DNS still cached the former Namecheap addresses. A diagnostic request directed only DNS resolution to the configured Vercel address, while retaining the real hostname and full certificate verification: www.ca passed authorized TLS and returned HTTP 308 directly to `https://prestoncannabis.com/menu/flower?source=domain-check&test=1`. The apex .ca request still returned `ERR_TLS_CERT_ALTNAME_INVALID`; apex certificate readiness remains pending and a complete live .ca launch is not claimed. TLS verification was never disabled. No additional DNS or GSC writes were made by Agent X.

## Final independent completion receipt

The earlier certificate/authentication holds are resolved by the parent's later independent browser readback. Normal in-app HTTPS navigation to `https://prestoncannabis.ca/menu/flower?source=domain-check` reached `https://prestoncannabis.com/menu/flower?source=domain-check`, title Flower. The same test on www.ca reached the same .com path and query. Neither navigation showed a TLS warning or used a bypass. This complements the configured 308 records and earlier www edge-status verification; earlier command-line failures reflected stale local DNS and are retained above as historical evidence.

Parent completed DNS Domain-property registration for both .com and .ca in the verified AthenaShopVn Google account. Both Search Console Settings pages read “You are a verified owner,” with AthenaShopVn in Users. Separate Google ownership TXT records were added at @ on each Namecheap domain; values are deliberately not included in these receipts. Existing A/CNAME, MX and nameservers were preserved. Detailed evidence is in `gsc-verification-2026-09-06.md`.

.com remains the only canonical content site. Noindex remains in effect; no empty sitemap was submitted, no indexing requests were sent, and no Change of Address was used. The new SCC-equivalent near-me/50 km landing-page rollout is PAUSED with implementation unstarted; none of its proposed content or schema was deployed during this original setup completion.
