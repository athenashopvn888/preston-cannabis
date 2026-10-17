import Link from "next/link";

export const OPEN_24_BANNER_TEXT = "NEW ! NOW OPEN 24HRS";

/** Site-wide top strip (Tri 2026-10-18). Always shown (no close button); links to /hours. */
export default function Open24Banner() {
  return <Link className="open24-banner" href="/hours" aria-label="New: now open 24 hours. See store hours">{OPEN_24_BANNER_TEXT}</Link>;
}
