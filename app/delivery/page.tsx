import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Delivery Coming Soon | Preston Cannabis" },
  description: "Delivery is coming soon to Preston Cannabis. Shop in store at 268 Preston St, Ottawa, ON K1R 7R6, or call 343-804-9020. Adults 19+.",
  alternates: { canonical: `${SITE.domain}/delivery` },
};

export default function DeliveryComingSoon() {
  return (
    <main id="main" className="page-wrap"><section className="section">
      <span className="eyebrow">PRESTON CANNABIS · LITTLE ITALY</span>
      <h1>Delivery Coming Soon</h1>
      <p>Delivery coming soon. Shop in store at 268 Preston St, Ottawa, ON K1R 7R6.</p>
      <p>Questions? Call <a href={SITE.tel}>{SITE.phone}</a>. Adults 19+ with valid photo ID.</p>
      <p><Link className="text-link" href="/visit">Directions to the store →</Link> · <Link className="text-link" href="/hours">Store hours →</Link> · <Link className="text-link" href="/menu">In-store menu →</Link></p>
    </section></main>
  );
}
