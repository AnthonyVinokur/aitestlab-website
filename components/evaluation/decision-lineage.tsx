import type { EvaluationRun } from "@/lib/evaluation/types";

export function EvaluationDecisionLineage({ run }: { run: EvaluationRun }) {
  const attentionCases = run.results.filter(
    (result) =>
      result.status === "FAIL" ||
      result.status === "XPASS" ||
      result.status === "ERROR",
  );

  return (
    <section
      className="results-lineage"
      aria-label="Evaluation decision lineage"
    >
      <div className="results-section-heading">
        <div>
          <p className="eyebrow">Decision lineage</p>
          <h2>Trace the evidence behind the run decision.</h2>
        </div>

        <p>
          Follow the recorded evaluation outcomes that contribute to the
          normalized run-level decision.
        </p>
      </div>

      <div className="results-lineage-flow">
        <div className="results-lineage-node">
          <span>Run</span>
          <strong>{run.runId}</strong>
          <small>{run.total} evaluation cases</small>
        </div>

        <span className="results-lineage-arrow" aria-hidden="true">
          ↓
        </span>

        <div className="results-lineage-node">
          <span>Observed outcomes</span>
          <strong>
            {run.unexpectedFailures} unexpected · {run.errors} errors
          </strong>
          <small>
            {attentionCases.length
              ? attentionCases.map((result) => result.id).join(", ")
              : "No unexpected cases recorded"}
          </small>
        </div>

        <span className="results-lineage-arrow" aria-hidden="true">
          ↓
        </span>

        <div className="results-lineage-node">
          <span>Decision rule</span>
          <strong>Unexpected failures or errors require attention</strong>
          <small>Derived from normalized report outcomes</small>
        </div>

        <span className="results-lineage-arrow" aria-hidden="true">
          ↓
        </span>

        <div
          className={`results-lineage-node results-lineage-decision ${
            run.decision.status === "ATTENTION_REQUIRED"
              ? "results-lineage-decision-attention"
              : "results-lineage-decision-clear"
          }`}
        >
          <span>Run decision</span>
          <strong>{run.decision.status.replace("_", " ")}</strong>
          <small>{run.decision.explanation}</small>
        </div>
      </div>
    </section>
  );
}
