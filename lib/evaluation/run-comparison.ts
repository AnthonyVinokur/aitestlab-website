import rawBaselineResults from "@/data/baseline-results.json";
import rawLatestResults from "@/data/latest-results.json";

import { adaptEvaluationReport, compareEvaluationRuns } from "./adapter";
import type { EvaluationRunComparison } from "./types";
import { validateEvaluationReport } from "./validation";

export function getEvaluationRunComparison(): EvaluationRunComparison {
  validateEvaluationReport(rawBaselineResults);
  validateEvaluationReport(rawLatestResults);

  const baseline = adaptEvaluationReport(rawBaselineResults);
  const current = adaptEvaluationReport(rawLatestResults);

  return compareEvaluationRuns(baseline, current);
}
