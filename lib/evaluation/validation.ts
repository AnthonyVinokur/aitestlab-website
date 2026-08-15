import Ajv, { type ErrorObject } from "ajv";

import reportV1Schema from "@/contracts/report-v1.0.schema.json";
import type { RawEvaluationReport } from "./types";

const ajv = new Ajv({
  allErrors: true,
  strict: false,
});

const validateReportV1 = ajv.compile(reportV1Schema);

function formatValidationErrors(errors: ErrorObject[] | null | undefined): string {
  if (!errors?.length) {
    return "Unknown validation error";
  }

  return errors
    .map((error) => {
      const location = error.instancePath || "/";
      return `${location}: ${error.message ?? "invalid value"}`;
    })
    .join("; ");
}

export function validateEvaluationReport(
  input: unknown,
): asserts input is RawEvaluationReport {
  if (validateReportV1(input)) {
    return;
  }

  throw new Error(
    `Invalid AI Test Lab report-v1.0: ${formatValidationErrors(
      validateReportV1.errors,
    )}`,
  );
}
