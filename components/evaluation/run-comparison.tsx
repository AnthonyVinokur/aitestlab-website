import type {
  EvaluationComparisonChange,
  EvaluationRunComparison,
  EvaluationComparisonEvidence,
  EvaluationRegressionDiagnosis,
  EvaluationRegressionImpact,
  EvaluationRegressionAction,
} from "@/lib/evaluation/types";

interface EvaluationRunComparisonProps {
  comparison: EvaluationRunComparison;
}

function RegressionDiagnosis({
  diagnosis,
}: {
  diagnosis: EvaluationRegressionDiagnosis | null;
}) {
  if (!diagnosis) {
    return null;
  }

  return (
    <section
      className="run-comparison-diagnosis"
      aria-label="Regression diagnosis"
    >
      <span className="run-comparison-evidence-label">
        Regression diagnosis
      </span>

      <p>
        <strong>Cause:</strong> {diagnosis.cause}
      </p>

      {diagnosis.assertionType ? (
        <p>
          <strong>Assertion:</strong> {diagnosis.assertionType}
        </p>
      ) : null}

      {diagnosis.expected ? (
        <p>
          <strong>Expected:</strong> <code>{diagnosis.expected}</code>
        </p>
      ) : null}

      {diagnosis.reason ? (
        <p>
          <strong>Current evidence:</strong> {diagnosis.reason}
        </p>
      ) : null}
    </section>
  );
}

function formatDelta(value: number, suffix = "") {
  if (value === 0) {
    return `0${suffix}`;
  }

  return `${value > 0 ? "+" : ""}${value}${suffix}`;
}

function RegressionImpact({
  impact,
}: {
  impact: EvaluationRegressionImpact | null;
}) {
  if (!impact) {
    return null;
  }

  return (
    <section
      className="run-comparison-impact"
      aria-label="Regression impact"
      data-impact={impact.level}
    >
      <span className="run-comparison-evidence-label">Regression impact</span>

      <div className="run-comparison-impact-content">
        <strong>{impact.level}</strong>
        <p>{impact.reason}</p>
      </div>
    </section>
  );
}

function RegressionAction({
  action,
}: {
  action: EvaluationRegressionAction | null;
}) {
  if (!action) {
    return null;
  }

  return (
    <section className="run-comparison-action" aria-label="Recommended action">
      <span className="run-comparison-evidence-label">Recommended action</span>

      <div className="run-comparison-action-content">
        <div>
          <small>Investigate</small>
          <strong>{action.category}</strong>
        </div>

        <div>
          <small>Why</small>
          <p>{action.reason}</p>
        </div>

        <div>
          <small>Next step</small>
          <p>{action.nextStep}</p>
        </div>
      </div>
    </section>
  );
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

function ComparisonEvidence({
  label,
  evidence,
}: {
  label: string;
  evidence: EvaluationComparisonEvidence | null;
}) {
  return (
    <section className="run-comparison-evidence-panel">
      <span className="run-comparison-evidence-label">{label}</span>

      {evidence ? (
        <>
          <div>
            <small>Actual response</small>
            <pre>{evidence.actualResponse || "—"}</pre>
          </div>

          <div>
            <small>Expected</small>
            <code>{evidence.expected || "—"}</code>
          </div>

          <div>
            <small>Assertion</small>
            <strong>{evidence.assertionType || "—"}</strong>
          </div>

          <div>
            <small>Evaluation reason</small>
            <p>{evidence.reason || "—"}</p>
          </div>
        </>
      ) : (
        <p className="run-comparison-evidence-missing">
          Not present in this run.
        </p>
      )}
    </section>
  );
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

        {comparison.cases.map((item) => {
          const changed = item.change !== "UNCHANGED";

          if (!changed) {
            return (
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
            );
          }

          return (
            <details
              className="run-comparison-diagnostic"
              data-change={item.change}
              key={item.id}
              open={item.change === "REGRESSED"}
            >
              <summary className="run-comparison-case">
                <div>
                  <strong>{item.name}</strong>
                  <code>{item.id}</code>
                </div>

                <span>{item.baselineStatus ?? "—"}</span>
                <span>{item.currentStatus ?? "—"}</span>

                <strong className="run-comparison-change">
                  {changeLabel(item.change)}
                </strong>
              </summary>

              <RegressionImpact impact={item.impact} />

              <RegressionDiagnosis diagnosis={item.diagnosis} />

              <RegressionAction action={item.action} />

              <div className="run-comparison-evidence">
                <ComparisonEvidence
                  label="Baseline evidence"
                  evidence={item.baselineEvidence}
                />

                <ComparisonEvidence
                  label="Current evidence"
                  evidence={item.currentEvidence}
                />
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
