import { expect, test } from "@playwright/test";

const primaryRoutes = [
  ["Features", "/features"],
  ["Atlas", "/atlas"],
  ["Results", "/results"],
  ["Reports", "/reports"],
  ["Docs", "/documentation"],
  ["Roadmap", "/roadmap"],
] as const;

test("home page presents the product and a working primary CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/AI Test Lab/);

  await expect(page.getByRole("heading", { level: 1 }))
  .toContainText("Test AI systems with evidence, not intuition.");

  await page.getByRole("link", { name: "Explore AI Test Lab" }).click();

  await expect(page).toHaveURL(/\/features$/);
});

for (const [label, route] of primaryRoutes) {
  test(`${label} route renders`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
  });
}

test("results page renders real AI Test Lab report data", async ({ page }) => {
  await page.goto("/results");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Latest evaluation run.");
  await expect(page.getByText("71.4%", { exact: true })).toBeVisible();
  await expect(page.getByText("llama3.1:latest", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("unexpected-failure-demo", { exact: true })).toBeVisible();
  await expect(page.getByText("intentional-failure", { exact: true })).toBeVisible();
  await expect(page.locator('[data-status="FAIL"]').first()).toBeVisible();
  await expect(page.locator('[data-status="XFAIL"]').first()).toBeVisible();
});

test("results page exposes evidence for an unexpected failure", async ({ page }) => {
  await page.goto("/results");

  const failure = page.locator("details").filter({
    hasText: "unexpected-failure-demo",
  });

  await expect(failure).toHaveAttribute("open", "");
  await expect(
    failure.getByText("Start your response with the words: Python is", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    failure.getByText("This text should never match", { exact: true }),
  ).toBeVisible();
  await expect(
    failure.locator(".result-narrative").getByText(
      "Response does not start with expected text: 'This text should never match'",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(
    failure.locator(".result-evidence").getByText("starts_with", { exact: true }),
  ).toBeVisible();

  const metrics = failure.locator(".results-metrics");
  await expect(metrics.getByText("0.000", { exact: true })).toBeVisible();
  await expect(metrics.getByText("1.000", { exact: true })).toBeVisible();
});

test("unknown routes render the custom not-found experience", async ({ page }) => {
  const response = await page.goto("/definitely-not-a-real-route");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("did not pass validation");
});

test("pages do not emit uncaught runtime errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  for (const route of ["/", ...primaryRoutes.map(([, path]) => path)]) {
    await page.goto(route);
  }

  expect(errors).toEqual([]);
});


test("mobile navigation exposes the primary routes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator(".mobile-menu summary").click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Atlas" }).click();
  await expect(page).toHaveURL(/\/atlas$/);
});

test("results page exposes the normalized run decision", async ({ page }) => {
  await page.goto("/results");

  await expect(
    page.getByText("ATTENTION REQUIRED", { exact: true }),
  ).toBeVisible();

  await expect(
    page.getByText(
      "Decision: Unexpected evaluation behavior requires investigation before this run can be treated as clear.",
      { exact: true },
    ),
  ).toBeVisible();

  await expect(
    page.getByText("1 unexpected failure requires investigation.", {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    page.getByText("0 evaluation errors were recorded.", {
      exact: true,
    }),
  ).toBeVisible();
});
