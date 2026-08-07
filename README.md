# AI Test Lab Website

Production-oriented website foundation for `aitestlab.dev`.

## Foundation goals

- Explain the AI Test Lab value proposition clearly.
- Preserve the product routes already established: Features, Atlas, Reports, Documentation, and Roadmap.
- Keep the site lightweight and maintainable with Next.js App Router, TypeScript, and plain CSS.
- Build in SEO, accessibility, security headers, responsive navigation, and automated quality checks from the start.
- Remain ready for future Cloudflare Workers deployment and full-stack features.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript strict mode
- ESLint Core Web Vitals rules
- Playwright desktop and mobile smoke tests
- GitHub Actions quality pipeline
- No third-party UI framework

## Local development

Use Node.js 24 LTS.

```powershell
npm install
# Commit the generated package-lock.json for reproducible CI builds.
npm run dev
```

Open `http://localhost:3000`.

## Validation

```powershell
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

To install Playwright browsers the first time:

```powershell
npx playwright install chromium
```

## Environment

Copy the example file when the canonical site URL differs from the default:

```powershell
Copy-Item .env.example .env.local
```

## Cloudflare Workers

The current Cloudflare workflow can configure an existing Next.js project automatically. Review the proposed changes before deployment:

```powershell
npx wrangler setup --dry-run
npx wrangler setup
```

Then use the generated preview and deploy scripts. Keep deployment configuration in version control after it has been reviewed against the active Cloudflare account.

## Replacement procedure

1. Commit the current website so it remains recoverable.
2. Keep the existing `.git` directory.
3. Replace the remaining project files with this foundation.
4. Run `npm install`.
5. Run the full validation sequence.
6. Review the content and replace any illustrative report values with real project evidence before public launch.

## Important content rule

The Reports page explicitly labels its values as illustrative. Do not publish invented performance, customer, adoption, or quality claims as real evidence.
