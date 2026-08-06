# Project Atlas MVP

This package adds the first Project Atlas dashboard to the `aitestlab-website`
Next.js application.

## Install

Copy these two files into the project root:

```text
app/atlas/page.tsx
data/atlas.ts
```

Then run:

```powershell
npm run dev
```

Open:

```text
http://localhost:3000/atlas
```

## Daily updates

Edit `data/atlas.ts`.

For each task, update:

```ts
actualHours: 3.5,
status: "done",
completedAt: "2026-08-03",
notes: "Added dataset schema, validation, and unit tests.",
```

Valid statuses:

```text
not-started
in-progress
blocked
done
```

## Recommended first validation

```powershell
npm run lint
npm run build
```

## Next release

The second version should add:

1. Interactive checkbox and time-entry forms.
2. Persistence using SQLite, PostgreSQL, or a hosted database.
3. GitHub commit and release synchronization.
4. Weekly hour charts.
5. Sprint burndown charts.
6. Public/private dashboard modes.
