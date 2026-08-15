import rawLatestResults from "@/data/latest-results.json";
import { adaptEvaluationReport } from "./adapter";
import type { EvaluationRun } from "./types";
import { validateEvaluationReport } from "./validation";

export function getLatestEvaluationRun(): EvaluationRun {
  validateEvaluationReport(rawLatestResults);

  return adaptEvaluationReport(rawLatestResults);
}
