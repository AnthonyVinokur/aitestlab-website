import rawLatestResults from "@/data/latest-results.json";
import { adaptEvaluationReport } from "./adapter";
import type { EvaluationRun, RawEvaluationReport } from "./types";

export function getLatestEvaluationRun(): EvaluationRun {
  return adaptEvaluationReport(rawLatestResults as RawEvaluationReport);
}
