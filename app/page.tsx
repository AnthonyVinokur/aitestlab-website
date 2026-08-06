import Link from "next/link";
import { Container } from "@/components/container";
import { SoftwareJsonLd } from "@/components/software-json-ld";
import { siteConfig } from "@/lib/site";

const outcomes = [
  {
    number: "01",
    title: "Detect prompt regressions",
    text: "Run versioned test cases before a prompt change reaches users or production workflows.",
  },
  {
    number: "02",
    title: "Compare models consistently",
    text: "Evaluate the same dataset across providers and normalize the evidence into one result model.",
  },
  {
    number: "03",
    title: "Enforce release quality",
    text: "Convert evaluation evidence into transparent pass, fail, and quality-gate decisions in CI/CD.",
  },
];

const workflow = ["Dataset", "Model", "Evaluation", "Metrics", "Report", "Quality gate"];

export default function HomePage() {
  return (
    <>
      <SoftwareJsonLd />
      <section className="hero">
        <Container className="hero-grid">
          <div className="hero-content">
            <p className="eyebrow">Automated LLM evaluation</p>
            <h1>Reliable AI needs evidence, not guesswork.</h1>
            <p className="hero-copy">
              AI Test Lab helps engineering teams test prompts, compare models, detect regressions,
              and turn evaluation results into repeatable release decisions.
            </p>
            <div className="button-row">
              <Link className="button" href="/features">Explore the framework</Link>
              <a className="button button-secondary" href={siteConfig.github} target="_blank" rel="noreferrer">
                Review the source
              </a>
            </div>
            <ul className="technology-list" aria-label="Core technologies">
              <li>Python</li>
              <li>Pytest</li>
              <li>YAML / JSON</li>
              <li>Ollama</li>
              <li>CI/CD</li>
            </ul>
          </div>

          <div className="evidence-panel" aria-label="Illustrative AI Test Lab evaluation summary">
            <div className="panel-header">
              <div>
                <span className="panel-kicker">illustrative evaluation / release-candidate</span>
                <strong>Quality gate</strong>
              </div>
              <span className="status-badge">PASS</span>
            </div>
            <dl className="metric-list">
              <div><dt>Deterministic checks</dt><dd>24 / 24</dd></div>
              <div><dt>Model evaluations</dt><dd>8 / 8</dd></div>
              <div><dt>Regression delta</dt><dd>Within policy</dd></div>
            </dl>
            <div className="terminal-block">
              <span>$ aitl evaluate --profile fast-ci</span>
              <span className="terminal-success">✓ evidence normalized</span>
              <span className="terminal-success">✓ report generated</span>
              <span className="terminal-success">✓ quality gate approved</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Engineering outcomes</p>
              <h2>Turn AI behavior into a testable system.</h2>
            </div>
            <p>
              A lightweight core for deterministic assertions, extensible evaluation engines,
              normalized evidence, and automated reporting.
            </p>
          </div>
          <div className="outcome-grid">
            {outcomes.map((item) => (
              <article className="outcome-card" key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-surface">
        <Container className="workflow-layout">
          <div>
            <p className="eyebrow">Evaluation pipeline</p>
            <h2>One evidence path from test data to release decision.</h2>
            <p className="section-copy">
              Keep the framework core compact. Enable specialized evaluation engines only when a
              project needs them, without coupling the entire test system to one vendor.
            </p>
            <Link className="text-link" href="/documentation">See the architecture →</Link>
          </div>
          <ol className="workflow-list">
            {workflow.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section">
        <Container className="cta-panel">
          <div>
            <p className="eyebrow">Build with evidence</p>
            <h2>Start with objective AI quality checks.</h2>
            <p>Review the open framework, inspect the roadmap, or discuss a practical use case.</p>
          </div>
          <div className="button-row">
            <Link className="button" href="/contact">Discuss a use case</Link>
            <Link className="button button-secondary" href="/roadmap">View the roadmap</Link>
          </div>
        </Container>
      </section>
    </>
  );
}
