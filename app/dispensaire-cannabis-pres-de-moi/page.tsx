import LandingPage, { landingMetadata } from "@/components/LandingPage";
import { getLandingCopy } from "@/lib/landing-copy";
const page = getLandingCopy("/dispensaire-cannabis-pres-de-moi");
export const metadata = landingMetadata(page);
export default function Page() { return <LandingPage page={page}/>; }
