import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { LatestEvaluationPreview } from "@/components/evaluation/latest-evaluation-preview";

export const metadata: Metadata = {
  title: "AI Test Lab | Automated LLM Evaluation & AI Quality Engineering",
  description:
    "AI Test Lab is an engineering framework for repeatable LLM evaluation, prompt regression, model comparison, normalized evidence, and CI/CD quality gates.",
  alternates: { canonical: "/" },
};

const capabilities = [
  {
    number: "01",
    title: "Prompt regression",
    text: "Turn expected AI behavior into repeatable tests and detect regressions before they reach production.",
  },
  {
    number: "02",
    title: "Model evaluation",
    text: "Run the same datasets and evaluation criteria across models to compare behavior with consistent evidence.",
  },
  {
    number: "03",
    title: "Evaluation engines",
    text: "Keep the core lightweight while enabling specialized evaluators through clear plugin boundaries.",
  },
  {
    number: "04",
    title: "CI/CD quality gates",
    text: "Convert evaluation outcomes into deployment evidence that engineering teams can enforce in delivery pipelines.",
  },
];

const principles = [
  {
    title: "Repeatable",
    text: "AI quality decisions should be based on reproducible evaluation evidence, not one-off prompt experiments.",
  },
  {
    title: "Engine-agnostic",
    text: "Specialized evaluation engines remain optional. The framework normalizes their output without coupling the core to one vendor.",
  },
  {
    title: "CI-native",
    text: "Evaluation belongs inside the software delivery lifecycle, where regressions can block releases before customers see them.",
  },
];

const direction = [
  "Prompt testing",
  "Multi-model evaluation",
  "External evaluation engines",
  "LLM-as-a-Judge",
  "Enterprise governance",
];

export default function HomePage() {
  return (
    <>
      <PageHero
  eyebrow="AI QUALITY ENGINEERING"
  title="Test AI systems with evidence, not intuition."
  description="AI Test Lab turns prompts, models, evaluators, and quality thresholds into repeatable engineering tests that can run before every release."
>
  <div className="home-hero-product">
    <LatestEvaluationPreview />
  </div>

  <div className="home-hero-actions">
    <Button href="/features">Explore AI Test Lab</Button>

    <Button
      href="https://github.com/AnthonyVinokur/AI-Test-Lab"
      variant="secondary"
      external
    >
      View on GitHub
    </Button>
  </div>

  <div className="home-hero-stack" aria-label="AI Test Lab technology">
    <span>Python</span>
    <span>Pytest</span>
    <span>Ollama</span>
    <span>Ragas</span>
    <span>DeepEval</span>
    <span>CI/CD</span>
  </div>
</PageHero>

<section className="section section-tight home-proof-section">
  <Container>
    <SectionHeading
      eyebrow="How AI Test Lab works"
      title="From AI output to engineering evidence."
    >
      <p>
        AI Test Lab turns test definitions, model responses, and evaluator
        results into normalized evidence that engineering teams can use for
        repeatable release decisions.
      </p>
    </SectionHeading>

    <div
      className="home-pipeline"
      aria-label="AI Test Lab evaluation pipeline"
    >
      {[
        "Test Cases",
        "Models",
        "Evaluators",
        "Normalized Results",
        "Quality Gate",
      ].map((step, index, items) => (
        <div className="home-pipeline-step" key={step}>
          <span>{step}</span>

          {index < items.length - 1 ? (
            <span className="home-pipeline-arrow" aria-hidden="true">
              →
            </span>
          ) : null}
        </div>
      ))}
    </div>

    <div className="home-proof-grid">
      <Card className="home-proof-card">
        <Badge>01</Badge>
        <h3>Repeatable</h3>
        <p>
          Run version-controlled evaluation definitions repeatedly as prompts,
          models, and application behavior change.
        </p>
      </Card>

      <Card className="home-proof-card">
        <Badge>02</Badge>
        <h3>Engine-agnostic</h3>
        <p>
          Combine native assertions with specialized evaluation engines while
          keeping their results behind one normalized evidence model.
        </p>
      </Card>

      <Card className="home-proof-card">
        <Badge>03</Badge>
        <h3>Release-ready</h3>
        <p>
          Convert evaluation outcomes into structured evidence that reporting
          and CI/CD quality gates can consume.
        </p>
      </Card>
    </div>
  </Container>
</section>

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Core capabilities"
            title="Evaluation infrastructure for engineering teams."
          >
            <p>
              AI Test Lab focuses on the evidence layer between model behavior and
              release decisions.
            </p>
          </SectionHeading>

          <div className="home-capability-grid">
            {capabilities.map((capability) => (
              <Card className="home-capability-card" key={capability.number}>
                <Badge>{capability.number}</Badge>
                <h3>{capability.title}</h3>
                <p>{capability.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="home-architecture-layout">
            <SectionHeading
              eyebrow="Architecture"
              title="A lightweight core with pluggable evaluation depth."
            >
              <p>
                Test definitions enter one evaluation pipeline. Native and external
                evaluators produce normalized evidence that reports and quality gates
                can consume consistently.
              </p>
            </SectionHeading>

            <Card elevated className="home-architecture">
              <div className="home-architecture-node home-architecture-source">
                <span>01</span>
                <strong>Test definitions</strong>
                <small>YAML / JSON / datasets</small>
              </div>

              <div className="home-architecture-connector" aria-hidden="true">
                ↓
              </div>

              <div className="home-architecture-node">
                <span>02</span>
                <strong>Evaluation pipeline</strong>
                <small>Execution + orchestration</small>
              </div>

              <div className="home-architecture-connector" aria-hidden="true">
                ↓
              </div>

              <div className="home-engine-grid">
                <div>
                  <small>Native</small>
                  <strong>Assertions</strong>
                </div>
                <div>
                  <small>Plugin</small>
                  <strong>Ragas</strong>
                </div>
                <div>
                  <small>Plugin</small>
                  <strong>DeepEval</strong>
                </div>
                <div>
                  <small>Plugin</small>
                  <strong>Judge / custom</strong>
                </div>
              </div>

              <div className="home-architecture-connector" aria-hidden="true">
                ↓
              </div>

              <div className="home-architecture-node">
                <span>03</span>
                <strong>Normalized results</strong>
                <small>Scores + evidence + status</small>
              </div>

              <div className="home-architecture-output">
                <div>
                  <small>Output</small>
                  <strong>Reports</strong>
                </div>
                <div>
                  <small>Decision</small>
                  <strong>Quality gate</strong>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Engineering principles"
            title="Built around how software teams already work."
          />

          <div className="home-principles-grid">
            {principles.map((principle, index) => (
              <Card className="home-principle-card" key={principle.title}>
                <span className="home-principle-number">0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="home-evidence-layout">
            <SectionHeading
              eyebrow="Evaluation as code"
              title="Define behavior once. Evaluate it repeatedly."
            >
              <p>
                Evaluation definitions belong beside application code so teams can
                version, review, reproduce, and automate AI quality expectations.
              </p>
              <div className="home-evidence-actions">
                <Button href="/documentation" size="small">
                  Read documentation
                </Button>
                <Button href="/reports" variant="secondary" size="small">
                  Explore reports
                </Button>
              </div>
            </SectionHeading>

            <Card elevated className="home-code-card">
              <div className="home-code-header">
                <span>evaluation.yaml</span>
                <Badge variant="success">versioned</Badge>
              </div>
              <pre>
                <code>{`id: support-answer-001
prompt: "How do I reset my password?"

assertions:
  - type: contains
    value: "reset"

evaluators:
  - correctness
  - relevance

quality_gate:
  min_score: 0.85`}</code>
              </pre>
            </Card>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Project direction"
            title="From deterministic prompt tests to enterprise evidence."
          >
            <p>
              The roadmap expands evaluation depth without abandoning the same
              normalized evidence model.
            </p>
          </SectionHeading>

          <div className="home-direction">
            {direction.map((item, index) => (
              <div className="home-direction-item" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
                {index < direction.length - 1 ? (
                  <span className="home-direction-line" aria-hidden="true" />
                ) : null}
              </div>
            ))}
          </div>

          <div className="home-roadmap-action">
            <Button href="/roadmap" variant="secondary" size="small">
              View full roadmap
            </Button>
          </div>
        </Container>
      </section>

      <section className="section home-final-section">
        <Container>
          <Card elevated className="home-final-cta">
            <div>
              <p className="eyebrow">AI Test Lab</p>
              <h2>Build measurable confidence into AI releases.</h2>
              <p>
                Move AI quality from subjective review to repeatable engineering
                evidence.
              </p>
            </div>

            <div className="home-final-actions">
              <Button href="/documentation">Explore the architecture</Button>
              <Button
                href="https://github.com/AnthonyVinokur/AI-Test-Lab"
                variant="secondary"
                external
              >
                View repository
              </Button>
            </div>
          </Card>
        </Container>
      </section>
    </>
  );
}
