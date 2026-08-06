export type AtlasStatus = "not-started" | "in-progress" | "blocked" | "done";

export type AtlasTask = {
  id: string;
  title: string;
  area: "AI Test Lab" | "Website" | "GitHub" | "LinkedIn" | "Learning";
  estimateHours: number;
  actualHours: number;
  status: AtlasStatus;
  completedAt?: string;
  notes?: string;
};

export type AtlasSprint = {
  id: string;
  name: string;
  objective: string;
  startDate: string;
  targetDate: string;
  tasks: AtlasTask[];
};

export const atlasPlan: AtlasSprint[] = [
  {
    id: "sprint-8",
    name: "Sprint 8 — Professional Evaluation Framework",
    objective:
      "Polish AI Test Lab into a public, documented evaluation framework and synchronize GitHub, website, and LinkedIn.",
    startDate: "2026-08-01",
    targetDate: "2026-09-30",
    tasks: [
      {
        id: "atlas-mvp",
        title: "Launch Project Atlas MVP",
        area: "Website",
        estimateHours: 8,
        actualHours: 0,
        status: "in-progress",
        notes: "Dashboard, roadmap, task status, estimates, and actual hours.",
      },
      {
        id: "dataset-management",
        title: "Build dataset management",
        area: "AI Test Lab",
        estimateHours: 20,
        actualHours: 0,
        status: "not-started",
      },
      {
        id: "dataset-versioning",
        title: "Add dataset versioning",
        area: "AI Test Lab",
        estimateHours: 10,
        actualHours: 0,
        status: "not-started",
      },
      {
        id: "evaluation-metrics",
        title: "Expand evaluation metrics",
        area: "AI Test Lab",
        estimateHours: 20,
        actualHours: 0,
        status: "not-started",
      },
      {
        id: "multi-model",
        title: "Add multi-model comparison",
        area: "AI Test Lab",
        estimateHours: 20,
        actualHours: 0,
        status: "not-started",
      },
      {
        id: "dashboard",
        title: "Build evaluation dashboard",
        area: "Website",
        estimateHours: 30,
        actualHours: 0,
        status: "not-started",
      },
      {
        id: "readme",
        title: "Publish professional repository README",
        area: "GitHub",
        estimateHours: 8,
        actualHours: 0,
        status: "not-started",
      },
      {
        id: "linkedin-profile",
        title: "Complete LinkedIn profile update",
        area: "LinkedIn",
        estimateHours: 5,
        actualHours: 0,
        status: "not-started",
      },
      {
        id: "linkedin-post",
        title: "Publish Sprint 8 technical post",
        area: "LinkedIn",
        estimateHours: 3,
        actualHours: 0,
        status: "not-started",
      },
      {
        id: "learning",
        title: "Study LLM evaluation and gateway architecture",
        area: "Learning",
        estimateHours: 12,
        actualHours: 0,
        status: "not-started",
      },
    ],
  },
  {
    id: "sprint-9",
    name: "Sprint 9 — AI Gateway",
    objective:
      "Introduce a provider-neutral gateway with logging, retries, rate limiting, cost tracking, and tracing.",
    startDate: "2026-10-01",
    targetDate: "2026-11-30",
    tasks: [
      {
        id: "gateway-architecture",
        title: "Design gateway architecture",
        area: "AI Test Lab",
        estimateHours: 15,
        actualHours: 0,
        status: "not-started",
      },
      {
        id: "provider-interface",
        title: "Create provider-neutral model interface",
        area: "AI Test Lab",
        estimateHours: 20,
        actualHours: 0,
        status: "not-started",
      },
      {
        id: "request-logging",
        title: "Add request logging and tracing",
        area: "AI Test Lab",
        estimateHours: 20,
        actualHours: 0,
        status: "not-started",
      },
      {
        id: "retry-fallback",
        title: "Add retries and provider fallback",
        area: "AI Test Lab",
        estimateHours: 20,
        actualHours: 0,
        status: "not-started",
      },
      {
        id: "gateway-docs",
        title: "Publish gateway documentation and diagram",
        area: "Website",
        estimateHours: 12,
        actualHours: 0,
        status: "not-started",
      },
      {
        id: "gateway-release",
        title: "Create GitHub gateway milestone release",
        area: "GitHub",
        estimateHours: 8,
        actualHours: 0,
        status: "not-started",
      },
      {
        id: "gateway-post",
        title: "Publish AI Gateway architecture post",
        area: "LinkedIn",
        estimateHours: 4,
        actualHours: 0,
        status: "not-started",
      },
    ],
  },
];

export const dailyTargetHours = 5;
export const weeklyTargetHours = 30;
