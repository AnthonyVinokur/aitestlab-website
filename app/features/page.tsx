import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore AI Test Lab capabilities for repeatable LLM evaluation and AI quality engineering.",
  alternates: { canonical: "/features" },
};

const featureGroups = [
  {
    number: "01",
    eyebrow: "Definition layer",
    title: "Define tests as engineering assets.",
    description:
      "Keep evaluation inputs versionable, reusable, and reviewable alongside application code.",
    items: [
      "Versionable YAML and JSON evaluation profiles",
      "Deterministic assertions for predictable checks",
      "Reusable datasets for prompt and model regression",
    ],
  },
  {
    number: "02",
    eyebrow: "Execution layer",
    title: "Run evaluations without locking the framework to one engine.",
    description:
      "Separate model execution from evaluation logic so specialized engines can be enabled only when needed.",
    items: [
      "Provider-neutral model client architecture",
      "Pluggable external evaluation engines",
      "Normalized results across heterogeneous evaluators",
    ],
  },
  {
    number: "03",
    eyebrow: "Evidence layer",
    title: "Turn model behavior into release evidence.",
    description:
      "Capture evaluation results in formats that both engineers and CI systems can act on.",
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
      >
        <Card className="feature-architecture-card" elevated>
          <p className="panel-kicker">framework model</p>

          <div className="feature-layer-list">
            <div>
              <span>01</span>
              <strong>Test definition</strong>
            </div>
            <div>
              <span>02</span>
              <strong>Evaluation execution</strong>
            </div>
            <div>
              <span>03</span>
              <strong>Evidence + release control</strong>
            </div>
          </div>

          <p className="feature-architecture-note">
            Each layer remains independently extensible.
          </p>
        </Card>
      </PageHero>

      <section className="section section-tight">
        <Container>
          <div className="feature-capability-grid">
            {featureGroups.map((group) => (
              <Card className="feature-capability-card" key={group.number}>
                <div className="feature-capability-top">
                  <Badge>{group.number}</Badge>
                  <span className="feature-layer-label">{group.eyebrow}</span>
                </div>

                <div>
                  <h2>{group.title}</h2>
                  <p className="feature-capability-description">
                    {group.description}
                  </p>
                </div>

                <ul className="check-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-surface">
        <Container className="feature-cta-panel">
          <div>
            <p className="eyebrow">Designed to stay extensible</p>
            <h2>Use the engines you need—without bloating the core.</h2>
            <p>
              Keep deterministic evaluation lightweight and add RAG,
              model-judge, or enterprise evaluation engines only where they
              provide value.
            </p>
          </div>

          <div className="button-row">
            <Button href="/documentation">
              Read the architecture
            </Button>

            <Button href="/roadmap" variant="secondary">
              View roadmap
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
