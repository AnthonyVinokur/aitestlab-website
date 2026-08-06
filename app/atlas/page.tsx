import Link from "next/link";
import {
  atlasPlan,
  dailyTargetHours,
  weeklyTargetHours,
  type AtlasStatus,
} from "@/data/atlas";

const statusLabels: Record<AtlasStatus, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  blocked: "Blocked",
  done: "Done",
};

const statusClasses: Record<AtlasStatus, string> = {
  "not-started": "border-zinc-700 bg-zinc-900 text-zinc-300",
  "in-progress": "border-blue-500/40 bg-blue-500/10 text-blue-300",
  blocked: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  done: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
};

function percent(done: number, total: number) {
  if (total === 0) return 0;
  return Math.round((done / total) * 100);
}

export default function AtlasPage() {
  const tasks = atlasPlan.flatMap((sprint) => sprint.tasks);
  const completedTasks = tasks.filter((task) => task.status === "done").length;
  const actualHours = tasks.reduce((sum, task) => sum + task.actualHours, 0);
  const estimatedHours = tasks.reduce((sum, task) => sum + task.estimateHours, 0);
  const overallProgress = percent(completedTasks, tasks.length);

  return (
    <main className="min-h-screen bg-[#070b14] text-zinc-100">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <header className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
              AI Test Lab Control Center
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Project Atlas
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
              One operating dashboard for development, website work, GitHub,
              LinkedIn, learning, estimates, and actual time.
            </p>
          </div>
          <Link
            href="/"
            className="w-fit rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-blue-400 hover:text-white"
          >
            Back to website
          </Link>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="Overall progress" value={`${overallProgress}%`} />
          <Metric label="Tasks completed" value={`${completedTasks} / ${tasks.length}`} />
          <Metric label="Actual hours" value={`${actualHours}`} />
          <Metric label="Estimated hours" value={`${estimatedHours}`} />
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.035] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Operating targets</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Sustainable delivery pace for development and public visibility.
              </p>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2">
                {dailyTargetHours} hours/day
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2">
                {weeklyTargetHours} hours/week
              </span>
            </div>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </section>

        <section className="mt-10 space-y-8">
          {atlasPlan.map((sprint) => {
            const sprintDone = sprint.tasks.filter(
              (task) => task.status === "done",
            ).length;
            const sprintProgress = percent(sprintDone, sprint.tasks.length);

            return (
              <article
                key={sprint.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]"
              >
                <div className="border-b border-white/10 p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold">{sprint.name}</h2>
                      <p className="mt-2 max-w-4xl leading-7 text-zinc-400">
                        {sprint.objective}
                      </p>
                    </div>
                    <div className="shrink-0 text-sm text-zinc-400">
                      <div>{sprint.startDate}</div>
                      <div>to {sprint.targetDate}</div>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-4">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${sprintProgress}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-sm font-semibold">
                      {sprintProgress}%
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[920px] text-left text-sm">
                    <thead className="bg-black/20 text-xs uppercase tracking-wider text-zinc-500">
                      <tr>
                        <th className="px-6 py-4">Task</th>
                        <th className="px-4 py-4">Area</th>
                        <th className="px-4 py-4">Estimate</th>
                        <th className="px-4 py-4">Actual</th>
                        <th className="px-4 py-4">Status</th>
                        <th className="px-6 py-4">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {sprint.tasks.map((task) => (
                        <tr key={task.id} className="hover:bg-white/[0.025]">
                          <td className="px-6 py-4 font-medium text-zinc-100">
                            {task.title}
                          </td>
                          <td className="px-4 py-4 text-zinc-400">{task.area}</td>
                          <td className="px-4 py-4 text-zinc-300">
                            {task.estimateHours}h
                          </td>
                          <td className="px-4 py-4 text-zinc-300">
                            {task.actualHours}h
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${statusClasses[task.status]}`}
                            >
                              {statusLabels[task.status]}
                            </span>
                          </td>
                          <td className="max-w-sm px-6 py-4 text-zinc-500">
                            {task.notes ?? "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            );
          })}
        </section>

        <section className="mt-10 rounded-2xl border border-blue-500/20 bg-blue-500/[0.06] p-6">
          <h2 className="text-xl font-semibold">How to update Atlas</h2>
          <p className="mt-2 leading-7 text-zinc-300">
            Edit <code className="rounded bg-black/30 px-2 py-1">data/atlas.ts</code>.
            Change a task status, add actual hours, record completion dates, and
            write a short note describing what was delivered.
          </p>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
