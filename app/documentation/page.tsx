import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Start with the AI Test Lab architecture, repository, and local validation workflow.",
  alternates: { canonical: "/documentation" },
};

export default function DocumentationPage() {
  return (
    <>
      <PageHero
        eyebrow="Documentation"
        title="Understand the framework from test definition to quality gate."
        description="The website provides the product map. The repository remains the source of truth for implementation details, interfaces, tests, and sprint documentation."
      />
      <section className="section section-tight">
        <Container className="docs-layout">
          <aside className="docs-nav" aria-label="Documentation sections">
            <strong>Start here</strong>
            <a href="#architecture">Architecture</a>
            <a href="#workflow">Workflow</a>
            <a href="#repository">Repository</a>
          </aside>
          <div className="prose">
            <section id="architecture">
              <p className="eyebrow">Architecture</p>
              <h2>Layered by responsibility.</h2>
              <p>
                Test definitions describe intent. Model clients execute prompts. Evaluation engines
                produce evidence. Normalization creates a stable internal result. Reporters publish
                the evidence. Quality gates convert policy into release decisions.
              </p>
            </section>
            <section id="workflow">
              <p className="eyebrow">Local workflow</p>
              <h2>Validate every change before deployment.</h2>
              <pre><code>{`npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run test:e2e`}</code></pre>
            </section>
            <section id="repository">
              <p className="eyebrow">Source of truth</p>
              <h2>Follow the implementation in GitHub.</h2>
              <p>
                Technical architecture, sprint records, test coverage, examples, and implementation
                changes should remain versioned next to the framework code.
              </p>
              <a className="button" href={siteConfig.github} target="_blank" rel="noreferrer">
                Open the repository
              </a>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
