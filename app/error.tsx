"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="page-hero error-page">
      <div className="container">
        <p className="eyebrow">Runtime error</p>
        <h1>The page could not complete its evaluation.</h1>
        <p className="page-lead">Retry the request. If the failure continues, review the browser console and deployment logs.</p>
        <button className="button" type="button" onClick={reset}>Retry</button>
      </div>
    </section>
  );
}
