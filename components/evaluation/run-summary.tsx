import type { EvaluationRun } from "@/lib/evaluation/types";
import {
  formatGeneratedAt,
  formatPercent,
  formatSeconds,
  formatThroughput,
  formatUsd,
} from "@/lib/evaluation/formatters";

export function EvaluationRunSummary({ run }: { run: EvaluationRun }) {
  const model = run.modelComparison[0];
  const requiresAttention = run.decision.status === "ATTENTION_REQUIRED";

  const profile = run.context.profileName
    ? `${run.context.profileName}${
        run.context.profileVersion ? ` · ${run.context.profileVersion}` : ""
      }`
    : "Not reported";

  return (
    <section className="results-overview" aria-label="Evaluation run summary">
      <div className="results-overview-copy">
        <p className="eyebrow">Measured evidence</p>
        <h1>Latest evaluation run.</h1>
        <p>
          Inspect the measured behavior behind this run before making a quality
          decision. AI Test Lab preserves the evaluation evidence, expected
          failures, unexpected failures, and runtime telemetry separately.
        </p>

        <dl className="results-run-context" aria-label="Run traceability">
          <div>
            <dt>Run ID</dt>
            <dd>{run.runId}</dd>
          </div>

          <div>
            <dt>Executed</dt>
            <dd>{formatGeneratedAt(run.generatedAt)}</dd>
          </div>

          <div>
            <dt>Model</dt>
            <dd>{run.context.model ?? run.models[0] ?? "Not reported"}</dd>
          </div>

          <div>
            <dt>Provider</dt>
            <dd>{run.context.provider ?? "Not reported"}</dd>
          </div>

          <div>
            <dt>Evaluation profile</dt>
            <dd>{profile}</dd>
          </div>

          <div>
            <dt>Report contract</dt>
            <dd>
              schema {run.schemaVersion} · {run.reportType}
            </dd>
          </div>
        </dl>
      </div>

      <div className="results-score-field">
        <span className="results-score-kicker">RUN OUTCOME</span>

        <strong>{formatPercent(run.passRatePercent)}</strong>

        <span>
          {run.passed} of {run.total} evaluations passed normally
        </span>

        <span
          className={`results-run-signal ${
            requiresAttention
              ? "results-run-signal-attention"
              : "results-run-signal-clear"
          }`}
        >
          {run.decision.status === "ATTENTION_REQUIRED"
            ? "ATTENTION REQUIRED"
            : "CLEAR"}
        </span>
      </div>

      <div className="results-count-ribbon">
        <span>
          <b>{run.passed}</b>
          <small>PASS</small>
        </span>

        <span>
          <b>{run.expectedFailures}</b>
          <small>XFAIL</small>
        </span>

        <span>
          <b>{run.unexpectedFailures}</b>
          <small>FAIL</small>
        </span>

        <span>
          <b>{run.errors}</b>
          <small>ERROR</small>
        </span>
      </div>

      <div
        className="results-outcome-notes"
        aria-label="Run outcome interpretation"
      >
        <p>
          <strong>Decision:</strong> {run.decision.explanation}
        </p>
        <p>
          <strong>{run.unexpectedFailures}</strong>{" "}
          {run.unexpectedFailures === 1
            ? "unexpected failure requires"
            : "unexpected failures require"}{" "}
          investigation.
        </p>

        <p>
          <strong>{run.expectedFailures}</strong>{" "}
          {run.expectedFailures === 1
            ? "expected failure behaved"
            : "expected failures behaved"}{" "}
          as configured.
        </p>

        <p>
          <strong>{run.errors}</strong>{" "}
          {run.errors === 1 ? "evaluation error was" : "evaluation errors were"}{" "}
          recorded.
        </p>
      </div>

      <div className="results-performance-ribbon">
        <span>
          <small>Avg response</small>
          <strong>
            {formatSeconds(model?.averageResponseTimeSeconds ?? null)}
          </strong>
        </span>

        <span>
          <small>Generation latency</small>
          <strong>
            {formatSeconds(model?.averageGenerationLatencySeconds ?? null)}
          </strong>
        </span>

        <span>
          <small>Generation speed</small>
          <strong>
            {formatThroughput(model?.averageGenerationTokensPerSecond ?? null)}
          </strong>
        </span>

        <span>
          <small>Avg output tokens</small>
          <strong>{model?.averageOutputTokens?.toFixed(1) ?? "—"}</strong>
        </span>

        <span>
          <small>Estimated cost</small>
          <strong>{formatUsd(run.totalEstimatedCostUsd)}</strong>
        </span>
      </div>
    </section>
  );
}
