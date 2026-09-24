# Preston Google Search Console verification receipt

Receipt recorded 2026-09-06 (Asia/Bangkok) by Agent X from the parent's independent authenticated UI execution/readback. Parent performed the Google/Namecheap operations; this receipt-only phase performs no external writes.

## Verified identity and properties

- Google account: AthenaShopVn, `athenashopvn888@gmail.com`, verified in the Google UI before execution.
- Domain property: `sc-domain:prestoncannabis.com`.
- Domain property: `sc-domain:prestoncannabis.ca`.
- Both properties' Settings pages read “You are a verified owner”; Users lists AthenaShopVn.
- The .ca property displays an added date of September 5 in Google's local date display.
- The .com Overview is processing initial data. Registration is not evidence of indexing, impressions, rankings or strategy success.

## DNS verification evidence

Parent added a separate Google ownership TXT record at @ on each Namecheap domain. Values were not printed and are not copied into this receipt. The .com Namecheap page was fully reloaded and the saved TXT matched the requested ownership record exactly. Successful ownership readback is recorded independently for both properties.

Final independent OS DNS readback via Resolve-DnsName found exactly one Google verification TXT record on each domain, without printing either value. Both domains still resolve all five forwarding MX records: eforward1/2/3 at priority 10, eforward4 at priority 15, and eforward5 at priority 20. Parent reloaded the primary .com Search Console Settings page and left it open after verification.

Existing website A/CNAME records, all five email-forwarding MX records and registrar nameservers were preserved. The .ca website configuration remains one apex A `216.150.1.1` plus www CNAME `ca902283f0c5a6ae.vercel-dns-016.com.`; the .com website retains its previously verified records.

## Public domain evidence and limits

Parent normally opened each of these HTTPS URLs in the in-app browser:

- `https://prestoncannabis.ca/menu/flower?source=domain-check`
- `https://www.prestoncannabis.ca/menu/flower?source=domain-check`

Both reached `https://prestoncannabis.com/menu/flower?source=domain-check`, title Flower, with no TLS warning or bypass. Vercel domain records remain direct 308 redirects to the .com apex. Earlier stale-resolver and apex certificate-pending observations are superseded by this later normal-browser verification.

.com remains the sole canonical site; .ca has no duplicate content. Existing noindex policy remains unchanged. No empty sitemap submission, manual indexing request or Change of Address was performed.

The new SCC/near-me/50 km rollout is explicitly PAUSED and its implementation is unstarted. This receipt completes only the original domain/GSC setup; it does not resume that rollout or assert canonical fleet registration, confirmed Preston inventory, indexing approval or search-performance outcomes.
