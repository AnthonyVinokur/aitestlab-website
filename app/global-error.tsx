"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, color: "#f4f8fc", background: "#07111f", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px" }}>
          <div style={{ maxWidth: "760px" }}>
            <p style={{ color: "#55d6be", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em" }}>Application error</p>
            <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: 1.05 }}>AI Test Lab could not render this request.</h1>
            <p style={{ color: "#aab8c8", fontSize: "1.1rem" }}>Retry once. If the failure persists, inspect the deployment logs.</p>
            <button
              type="button"
              onClick={reset}
              style={{ minHeight: "48px", padding: "0 20px", border: 0, borderRadius: "10px", background: "#55d6be", color: "#04120f", fontWeight: 800, cursor: "pointer" }}
            >
              Retry
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
