import LandingPage, { landingMetadata } from "@/components/LandingPage";
import { getLandingCopy } from "@/lib/landing-copy";
const page = getLandingCopy("/faq");
export const metadata = landingMetadata(page);
export default function Page() { return <LandingPage page={page}/>; }
