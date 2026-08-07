import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusIndicator } from "@/components/ui/status-indicator";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Review the strategic development direction for AI Test Lab.",
  alternates: { canonical: "/roadmap" },
};

const phases = [
  {
    number: "01",
    label: "Foundation",
    title: "Repeatable core evaluation",
    text: "Deterministic assertions, datasets, model execution, normalized results, reports, and CLI workflows.",
    status: "Established",
    statusType: "pass" as const,
  },
  {
    number: "02",
    label: "Extensibility",
    title: "Profiles and evaluation engines",
    text: "Reusable evaluation profiles and plugin boundaries for specialized RAG, quality, and model-judge evaluators.",
    status: "Active direction",
    statusType: "warning" as const,
  },
  {
    number: "03",
    label: "Operations",
    title: "CI quality gates and trend evidence",
    text: "Release policies, baseline comparison, historical regression evidence, and engineering workflow integrations.",
    status: "Planned",
    statusType: "neutral" as const,
  },
  {
    number: "04",
    label: "Governance",
    title: "Enterprise evidence and controls",
    text: "Audit-oriented reporting, policy packs, drift evidence, access controls, and governance integrations.",
    status: "Long-term",
    statusType: "neutral" as const,
  },
];

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        eyebrow="Product roadmap"
        title="Build the evidence layer first."
        description="AI Test Lab prioritizes a dependable evaluation core before expanding into enterprise integrations, governance controls, and broader platform capabilities."
      >
        <Card className="roadmap-overview-card" elevated>
          <div className="roadmap-overview-header">
            <div>
              <span className="panel-kicker">current development focus</span>
              <strong>Evaluation profiles</strong>
            </div>

            <StatusIndicator
              status="warning"
              label="IN PROGRESS"
            />
          </div>

          <div className="roadmap-overview-metrics">
            <div>
              <span>Current phase</span>
              <strong>Extensibility</strong>
            </div>

            <div>
              <span>Core direction</span>
              <strong>Lightweight</strong>
            </div>

            <div>
              <span>Architecture</span>
              <strong>Plugin-based</strong>
            </div>
          </div>

          <div className="roadmap-overview-actions">
            <Button href="/documentation" size="small">
              View architecture
            </Button>

            <Button
              href="/features"
              variant="secondary"
              size="small"
            >
              Explore features
            </Button>
          </div>
        </Card>
      </PageHero>

      <section className="section section-tight">
        <Container>
          <div className="roadmap-intro">
            <div>
              <p className="eyebrow">Development sequence</p>
              <h2>Expand capability without weakening the core.</h2>
            </div>

            <p>
              Each phase builds on normalized evaluation evidence. New engines,
              workflows, and governance controls remain optional rather than
              becoming mandatory dependencies.
            </p>
          </div>

          <div className="roadmap-grid">
            {phases.map((phase) => (
              <Card className="roadmap-phase-card" key={phase.number}>
                <div className="roadmap-phase-top">
                  <Badge>{phase.number}</Badge>

                  <StatusIndicator
                    status={phase.statusType}
                    label={phase.status}
                  />
                </div>

                <div className="roadmap-phase-content">
                  <p className="roadmap-phase-label">
                    {phase.label}
                  </p>

                  <h2>{phase.title}</h2>
                  <p>{phase.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
