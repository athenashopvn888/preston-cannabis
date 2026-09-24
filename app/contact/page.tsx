import LandingPage, { landingMetadata } from "@/components/LandingPage";
import { getLandingCopy } from "@/lib/landing-copy";
const page = getLandingCopy("/contact");
export const metadata = landingMetadata(page);
export default function Page() { return <LandingPage page={page}/>; }
