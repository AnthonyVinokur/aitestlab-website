import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About",
  description: "Why AI Test Lab is being built and the engineering principles behind it.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the project"
        title="AI reliability should be demonstrated, not assumed."
        description="AI Test Lab applies established test-automation discipline to systems whose outputs are probabilistic, model-dependent, and sensitive to prompt and context changes."
      />
      <section className="section section-tight">
        <Container className="about-layout">
          <div className="prose">
            <h2>The problem</h2>
            <p>
              Conventional software tests compare deterministic behavior against explicit expectations.
              AI systems require a broader evidence model: deterministic checks where possible,
              statistical or evaluator-based evidence where necessary, and clear policy for release decisions.
            </p>
            <h2>The approach</h2>
            <p>
              Keep the core framework understandable. Separate responsibilities. Store test intent in
              version control. Normalize results. Preserve the reason behind every decision. Add external
              evaluation engines through explicit plugin boundaries rather than hard-coding one stack.
            </p>
          </div>
          <aside className="principles-card">
            <p className="eyebrow">Engineering principles</p>
            <ul>
              <li>Evidence over impressions</li>
              <li>Small, explicit interfaces</li>
              <li>Provider-neutral architecture</li>
              <li>Reproducible test definitions</li>
              <li>Automation-ready outputs</li>
              <li>Incremental complexity</li>
            </ul>
          </aside>
        </Container>
      </section>
    </>
  );
}
