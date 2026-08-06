import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore AI Test Lab capabilities for repeatable LLM evaluation and AI quality engineering.",
  alternates: { canonical: "/features" },
};

const featureGroups = [
  {
    title: "Test definition",
    items: [
      "Versionable YAML and JSON evaluation profiles",
      "Deterministic assertions for predictable checks",
      "Reusable datasets for prompt and model regression",
    ],
  },
  {
    title: "Evaluation execution",
    items: [
      "Provider-neutral model client architecture",
      "Pluggable external evaluation engines",
      "Normalized results across heterogeneous evaluators",
    ],
  },
  {
    title: "Evidence and release control",
    items: [
      "Human-readable HTML and machine-readable JSON reports",
      "Latency, token, and execution metadata",
      "CI/CD-ready pass, fail, error, and quality-gate decisions",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Framework capabilities"
        title="Evaluation infrastructure built for engineering workflows."
        description="AI Test Lab separates test definition, model execution, evaluation, reporting, and policy so teams can evolve each layer without rewriting the entire system."
      />
      <section className="section section-tight">
        <Container className="feature-stack">
          {featureGroups.map((group, index) => (
            <article className="feature-row" key={group.title}>
              <span className="feature-index">0{index + 1}</span>
              <div>
                <h2>{group.title}</h2>
                <ul className="check-list">
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </Container>
      </section>
      <section className="section section-surface">
        <Container className="inline-cta">
          <div>
            <p className="eyebrow">Designed to stay extensible</p>
            <h2>Use the engines you need—without bloating the core.</h2>
          </div>
          <Link className="button" href="/documentation">Read the architecture</Link>
        </Container>
      </section>
    </>
  );
}
