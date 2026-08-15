---

title: Installation
description: Install AI Test Lab, configure the Python environment, and prepare the framework for local evaluation.
---

# Installation

This guide explains how to install AI Test Lab locally and prepare the framework for evaluation.

## Requirements

Before starting, install:

* Python 3.13 or later
* Git
* Ollama for local-model execution
* a Python IDE or editor such as PyCharm or Visual Studio Code

You should also have at least one compatible Ollama model installed if you plan to run evaluations against a local model.

## Clone the repository

```powershell
git clone https://github.com/AnthonyVinokur/AI-Test-Lab.git
cd AI-Test-Lab
```

## Create a virtual environment

Create a Python virtual environment:

```powershell
python -m venv .venv
```

Activate it in Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

After activation, your terminal should show the virtual environment:

```text
(.venv) PS C:\path\to\AI-Test-Lab>
```

## Install dependencies

Install the project's Python dependencies using the dependency configuration provided by the repository.

After installation, verify that Python is running from the virtual environment:

```powershell
python --version
```

## Prepare a local model

If you are using Ollama, verify that it is installed and available:

```powershell
ollama list
```

Make sure at least one model required by your evaluation configuration is available locally.

## Verify the framework

Run the automated test suite:

```powershell
pytest
```

The test suite verifies framework behavior independently of a normal evaluation run.

A successful test run confirms that the checked-in framework components and contracts are behaving as expected in your environment.

## Explore the CLI

AI Test Lab provides command-line options for selecting models, datasets, evaluation profiles, evaluation engines, and report outputs.

Display the currently supported options with:

---
title: Installation
description: Install AI Test Lab, configure the Python environment, and prepare the framework for local evaluation.
---
## Next steps

After installation:

1. Review the available evaluation profiles.
2. Select or prepare the prompts or dataset you want to evaluate.
3. Select the model and evaluation engine.
4. Run the evaluation.
5. Review the generated results and evidence.
6. Use the report output to understand pass, fail, and error conditions.

AI Test Lab is designed so that evaluation configuration, execution, evidence collection, and reporting remain explicit and repeatable.
