import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Review the strategic development direction for AI Test Lab.",
  alternates: { canonical: "/roadmap" },
};

const phases = [
  {
    label: "Foundation",
    title: "Repeatable core evaluation",
    text: "Deterministic assertions, datasets, model execution, normalized results, reports, and CLI workflows.",
    status: "Established direction",
  },
  {
    label: "Extensibility",
    title: "Profiles and evaluation engines",
    text: "Reusable evaluation profiles and plugin boundaries for specialized engines such as RAG, quality, and model-judge evaluators.",
    status: "Active development direction",
  },
  {
    label: "Operations",
    title: "CI quality gates and trend evidence",
    text: "Release policies, baseline comparison, historical regression evidence, and engineering workflow integrations.",
    status: "Planned direction",
  },
  {
    label: "Governance",
    title: "Enterprise evidence and controls",
    text: "Audit-oriented reporting, policy packs, drift evidence, access controls, and governance integrations.",
    status: "Long-term direction",
  },
];

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        eyebrow="Product direction"
        title="Build the evidence layer first. Expand without losing clarity."
        description="The roadmap prioritizes a dependable evaluation core before adding enterprise integrations, governance controls, and broader platform capabilities."
      />
      <section className="section section-tight">
        <Container className="roadmap-list">
          {phases.map((phase, index) => (
            <article className="roadmap-item" key={phase.label}>
              <span className="roadmap-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="eyebrow">{phase.label}</p>
                <h2>{phase.title}</h2>
                <p>{phase.text}</p>
              </div>
              <span className="roadmap-status">{phase.status}</span>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
