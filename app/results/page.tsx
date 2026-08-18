import type { Metadata } from "next";
import { Container } from "@/components/container";
import { EvaluationResultList } from "@/components/evaluation/result-list";
import { EvaluationRunSummary } from "@/components/evaluation/run-summary";
import { getLatestEvaluationRun } from "@/lib/evaluation/latest-run";
import { EvaluationDecisionLineage } from "@/components/evaluation/decision-lineage";
import { EvaluationRunComparison } from "@/components/evaluation/run-comparison";
import { getEvaluationRunComparison } from "@/lib/evaluation/run-comparison";

export const metadata: Metadata = {
  title: "Evaluation Results | AI Test Lab",
  description:
    "Explore real AI Test Lab evaluation evidence, model performance, normalized metrics, prompts, responses, and regression outcomes.",
  alternates: { canonical: "/results" },
};

export default function ResultsPage() {
  const run = getLatestEvaluationRun();
  const comparison = getEvaluationRunComparison();

  return (
    <>
      <section className="results-hero">
        <Container>
          <EvaluationRunSummary run={run} />
        </Container>
      </section>

      <section className="section results-lineage-section">
        <Container>
          <EvaluationDecisionLineage run={run} />
        </Container>
      </section>

      <section className="section results-comparison-section">
        <Container>
          <EvaluationRunComparison comparison={comparison} />
        </Container>
      </section>

      <section className="section results-evidence-section">
        <Container>
          <div className="results-section-heading">
            <div>
              <p className="eyebrow">Individual evidence</p>
              <h2>Inspect the behavior behind the score.</h2>
            </div>
            <p>
              Each record preserves the prompt, model output, assertion,
              normalized evaluator evidence, reason, and operational telemetry.
            </p>
          </div>

          <EvaluationResultList results={run.results} />
        </Container>
      </section>
    </>
  );
}
