import type {
  EvaluationComparisonChange,
  EvaluationRunComparison,
} from "@/lib/evaluation/types";

interface EvaluationRunComparisonProps {
  comparison: EvaluationRunComparison;
}

function formatDelta(value: number, suffix = "") {
  if (value === 0) {
    return `0${suffix}`;
  }

  return `${value > 0 ? "+" : ""}${value}${suffix}`;
}

function changeLabel(change: EvaluationComparisonChange) {
  switch (change) {
    case "IMPROVED":
      return "Improved";
    case "REGRESSED":
      return "Regressed";
    case "ADDED":
      return "Added";
    case "REMOVED":
      return "Removed";
    default:
      return "Unchanged";
  }
}

export function EvaluationRunComparison({
  comparison,
}: EvaluationRunComparisonProps) {
  return (
    <section
      className="run-comparison"
      aria-labelledby="run-comparison-heading"
    >
      <div className="run-comparison-heading">
        <div>
          <p className="eyebrow">Regression analysis</p>
          <h2 id="run-comparison-heading">Compare evaluation runs.</h2>
        </div>

        <p>
          Compare the current evaluation with its baseline and identify
          regressions, improvements, additions, and removed test cases.
        </p>
      </div>

      <div className="run-comparison-runs">
        <article className="ui-card run-comparison-run">
          <span className="run-comparison-label">Baseline</span>

          <strong>{comparison.baselineRunId}</strong>

          <dl>
            <div>
              <dt>Decision</dt>
              <dd>{comparison.baselineDecision.replace("_", " ")}</dd>
            </div>

            <div>
              <dt>Passed</dt>
              <dd>{comparison.baselinePassed}</dd>
            </div>

            <div>
              <dt>Unexpected failures</dt>
              <dd>{comparison.baselineUnexpectedFailures}</dd>
            </div>

            <div>
              <dt>Errors</dt>
              <dd>{comparison.baselineErrors}</dd>
            </div>

            <div>
              <dt>Pass rate</dt>
              <dd>{comparison.baselinePassRatePercent.toFixed(2)}%</dd>
            </div>
          </dl>
        </article>

        <div className="run-comparison-arrow" aria-hidden="true">
          →
        </div>

        <article className="ui-card run-comparison-run">
          <span className="run-comparison-label">Current</span>

          <strong>{comparison.currentRunId}</strong>

          <dl>
            <div>
              <dt>Decision</dt>
              <dd>{comparison.currentDecision.replace("_", " ")}</dd>
            </div>

            <div>
              <dt>Passed</dt>
              <dd>
                {comparison.currentPassed}
                <span className="run-comparison-delta">
                  {formatDelta(comparison.passedDelta)}
                </span>
              </dd>
            </div>

            <div>
              <dt>Unexpected failures</dt>
              <dd>
                {comparison.currentUnexpectedFailures}
                <span className="run-comparison-delta">
                  {formatDelta(comparison.unexpectedFailuresDelta)}
                </span>
              </dd>
            </div>

            <div>
              <dt>Errors</dt>
              <dd>
                {comparison.currentErrors}
                <span className="run-comparison-delta">
                  {formatDelta(comparison.errorsDelta)}
                </span>
              </dd>
            </div>

            <div>
              <dt>Pass rate</dt>
              <dd>
                {comparison.currentPassRatePercent.toFixed(2)}%
                <span className="run-comparison-delta">
                  {formatDelta(comparison.passRateDelta, " pts")}
                </span>
              </dd>
            </div>
          </dl>
        </article>
      </div>

      <div className="run-comparison-summary" aria-label="Comparison summary">
        <div>
          <span>Regressed</span>
          <strong>{comparison.summary.regressed}</strong>
        </div>

        <div>
          <span>Improved</span>
          <strong>{comparison.summary.improved}</strong>
        </div>

        <div>
          <span>Unchanged</span>
          <strong>{comparison.summary.unchanged}</strong>
        </div>

        <div>
          <span>Added</span>
          <strong>{comparison.summary.added}</strong>
        </div>

        <div>
          <span>Removed</span>
          <strong>{comparison.summary.removed}</strong>
        </div>
      </div>

      <div className="run-comparison-cases">
        <div className="run-comparison-case run-comparison-case-header">
          <span>Test case</span>
          <span>Baseline</span>
          <span>Current</span>
          <span>Change</span>
        </div>

        {comparison.cases.map((item) => (
          <div
            className="run-comparison-case"
            data-change={item.change}
            key={item.id}
          >
            <div>
              <strong>{item.name}</strong>
              <code>{item.id}</code>
            </div>

            <span>{item.baselineStatus ?? "—"}</span>
            <span>{item.currentStatus ?? "—"}</span>

            <strong className="run-comparison-change">
              {changeLabel(item.change)}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}
