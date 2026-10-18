import Link from "next/link";

export const OPEN_24_BANNER_TEXT = "NEW ! NOW OPEN 24HRS";
const [NEW_PART, REST_PART] = ["NEW !", OPEN_24_BANNER_TEXT.slice("NEW !".length)];

/** Site-wide top strip (Tri 2026-10-18). Always shown (no close button); links to /hours. */
export default function Open24Banner() {
  return <Link className="open24-banner" href="/hours" aria-label="New: now open 24 hours. See store hours"><span className="open24-new">{NEW_PART}</span><span className="open24-rest">{REST_PART}</span></Link>;
}
