"use client";
export default function ErrorPage({ reset }: { reset: () => void }) { return <main id="main" className="page-wrap"><div className="page-heading"><h1>Let’s try that again.</h1><p>This page could not load. Please retry in a moment.</p><button className="button" onClick={reset}>Try again</button></div></main>; }
