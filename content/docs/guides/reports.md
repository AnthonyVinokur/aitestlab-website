---

title: Test Reports
description: Understand AI Test Lab reports, evaluation results, metrics, evidence, and the public report boundary.
---

# Test Reports

AI Test Lab reports turn evaluation execution into inspectable evidence.

A useful report should do more than state whether an evaluation passed or failed. It should preserve enough information for engineers and other authorized consumers to understand what was evaluated, what happened, and why the framework produced the recorded result.

![AI Test Lab evaluation report](/ai-test-lab-report.png)

*Example AI Test Lab evaluation report showing evaluation status and execution information.*

## Report purpose

Reports provide a durable representation of an evaluation run.

Depending on the evaluation and report version, report data can describe:

* evaluation status
* tested model information
* individual test results
* assertion outcomes
* configured metric results
* thresholds
* response and execution measurements
* token information
* model responses
* supporting evaluation evidence

The exact fields available to consumers are defined by the applicable public report contract.

## Evaluation status

Individual evaluations can result in statuses such as:

* `PASS`
* `FAIL`
* `ERROR`

These statuses represent different conditions.

`PASS` indicates that the evaluated behavior satisfied the applicable evaluation requirements.

`FAIL` indicates that execution completed but one or more requirements used for the verdict were not satisfied.

`ERROR` indicates that the evaluation could not complete normally because an execution or evaluation error occurred.

Consumers should preserve this distinction rather than treating every non-passing result as the same type of failure.

## Assertions and metrics

An evaluation can contain evidence from more than one evaluation mechanism.

Deterministic assertions can verify explicitly testable behavior, while configured metrics can evaluate characteristics that cannot be represented adequately by exact string comparisons alone.

Metric evidence can include information such as:

* metric name
* score
* applicable threshold
* pass/fail result
* supporting evaluation information exposed by the public report contract

This allows a report to explain more than a single aggregate score.

## Performance evidence

Evaluation reports can also preserve execution measurements useful for engineering analysis.

Examples may include:

* end-to-end response time
* prompt latency
* generation latency
* model-load time
* prompt token count
* output token count
* prompt processing speed
* generation speed

These measurements help distinguish response-quality problems from runtime-performance problems.

## Individual results

Each executed test should remain independently inspectable.

A detailed result may contain information such as:

* test identifier
* model and provider information
* evaluation status
* original input
* actual model response
* deterministic assertion evidence
* metric evidence
* thresholds
* timing measurements
* token measurements
* supporting metadata

The available fields depend on the report contract used by that evaluation.

## Evidence-first reporting

A report should not merely say:

```text
FAIL
```

It should provide enough public evidence to understand the recorded decision.

Conceptually:

```text
Test input
    +
Model response
    +
Assertion / metric evidence
    +
Thresholds and measurements
        ↓
Evaluation result
        ↓
Report evidence
```

This makes failures more useful for debugging, regression analysis, model comparison, and release decisions.

## Multi-model evaluation

When the same test inputs are evaluated against multiple models, report data can be used to compare their behavior under the same evaluation conditions.

Useful comparison dimensions can include:

* pass/fail behavior
* metric results
* response time
* token usage
* generation performance
* error behavior

Model comparison should preserve the underlying evidence rather than relying exclusively on a single ranking.

## Public report contract

AI Test Lab separates internal evaluation implementation from externally consumable report data.

The intended boundary is:

```text
Internal evaluation models
        ↓
Explicit report transformation
        ↓
Versioned public report contract
        ↓
JSON report
        ↓
Website / tooling / other consumers
```

A consumer should depend on the public report contract rather than importing or serializing proprietary internal evaluation structures directly.

This creates a stable integration boundary while allowing the framework's internal implementation to evolve independently.

## Website consumption

The standalone AI Test Lab website can consume public report data to present evaluation results visually.

The direction of dependency should remain:

```text
AI Test Lab framework
        ↓
Public report artifact
        ↓
AI Test Lab website
        ↓
Results and evidence UI
```

The website is a consumer of evaluation evidence. It should not reimplement the framework's evaluation logic.

## Why this boundary matters

Separating evaluation internals from report presentation provides several benefits:

* stable integration contracts
* clearer versioning
* easier compatibility testing
* independent framework and website development
* reduced coupling between Python and Next.js
* controlled exposure of internal implementation details

The report therefore serves two purposes:

1. preserve useful evaluation evidence;
2. provide a controlled interface between AI Test Lab and downstream consumers.

That boundary becomes increasingly important as the framework grows.
