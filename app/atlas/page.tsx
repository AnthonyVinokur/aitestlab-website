import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Atlas",
  description: "Atlas is the structured evaluation catalog for reusable AI quality scenarios and evidence.",
  alternates: { canonical: "/atlas" },
};

const layers = [
  { title: "Scenario", text: "The user intent, risk, task category, and expected behavior under test." },
  { title: "Dataset", text: "Prompts, context, expected evidence, assertions, and relevant metadata." },
  { title: "Evaluation profile", text: "The engines, thresholds, metrics, and execution policy applied to the case." },
  { title: "Result evidence", text: "Normalized outcomes that can be compared, reported, and audited over time." },
];

export default function AtlasPage() {
  return (
    <>
      <PageHero
        eyebrow="Evaluation catalog"
        title="Atlas organizes AI quality work into reusable evidence."
        description="Instead of keeping evaluation knowledge in isolated scripts, Atlas provides a structured catalog for scenarios, datasets, profiles, and comparable results."
      />
      <section className="section section-tight">
        <Container>
          <div className="atlas-grid">
            {layers.map((layer, index) => (
              <article className="atlas-card" key={layer.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{layer.title}</h2>
                <p>{layer.text}</p>
              </article>
            ))}
          </div>
          <div className="note-panel">
            <strong>Foundation status</strong>
            <p>
              This page defines the product direction. Concrete catalog schemas and examples should
              be connected directly to the framework repository as those interfaces stabilize.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
