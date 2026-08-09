import Link from "next/link";
import { getLatestEvaluationRun } from "@/lib/evaluation/latest-run";
import {
  formatGeneratedAt,
  formatPercent,
  formatSeconds,
  formatThroughput,
} from "@/lib/evaluation/formatters";
import { EvaluationStatusPill } from "./status-pill";

export function LatestEvaluationPreview() {
  const run = getLatestEvaluationRun();
  const model = run.modelComparison[0];
  const noteworthy =
    run.results.find((result) => result.status === "FAIL") ??
    run.results.find((result) => result.status === "XFAIL") ??
    run.results[0];

  return (
    <div className="live-evaluation" aria-label="Latest AI Test Lab evaluation">
      <div className="live-evaluation-orbit" aria-hidden="true" />
      <div className="live-evaluation-header">
        <div>
          <span className="live-label">LATEST EVALUATION</span>
          <strong>{model?.model ?? run.models[0] ?? "AI model"}</strong>
          <small>{model?.provider ?? "provider"} · {formatGeneratedAt(run.generatedAt)}</small>
        </div>
        <span className="live-signal"><i /> real report data</span>
      </div>

      <div className="live-score-layout">
        <div className="live-score">
          <strong>{formatPercent(run.passRatePercent)}</strong>
          <span>overall pass rate</span>
        </div>
        <div className="live-status-rail" aria-label="Evaluation outcome counts">
          <span><b>{run.passed}</b> PASS</span>
          <span><b>{run.expectedFailures}</b> XFAIL</span>
          <span><b>{run.unexpectedFailures}</b> FAIL</span>
          <span><b>{run.errors}</b> ERROR</span>
        </div>
      </div>

      {noteworthy ? (
        <div className="live-evidence">
          <div className="live-evidence-heading">
            <div>
              <span>Evidence sample</span>
              <strong>{noteworthy.id}</strong>
            </div>
            <EvaluationStatusPill status={noteworthy.status} />
          </div>
          <p>{noteworthy.reason}</p>
          <div className="live-evidence-meta">
            <span>{noteworthy.assertionType}</span>
            <span>{formatSeconds(noteworthy.responseTimeSeconds)}</span>
            <span>{noteworthy.metrics[0]?.engine ?? "builtin"}</span>
          </div>
        </div>
      ) : null}

      <div className="live-performance">
        <span><small>Avg response</small><strong>{formatSeconds(model?.averageResponseTimeSeconds ?? null)}</strong></span>
        <span><small>Generation</small><strong>{formatThroughput(model?.averageGenerationTokensPerSecond ?? null)}</strong></span>
        <span><small>Evaluations</small><strong>{run.total}</strong></span>
      </div>

      <Link className="live-results-link" href="/results">
        Explore complete evaluation evidence <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
