# PulseFly — AppsFlyer Analytics Platform

A complete Next.js + TypeScript analytics website for AppsFlyer XLSX exports. The application includes secure credential authentication, per-user PostgreSQL storage, XLSX validation and normalization, interactive performance dashboards, source/channel decision actions, upload quality reporting, CSV export, payable-event analysis, responsive light/dark UI, Docker deployment and tests.

## Run the full website

```bash
cp .env.example .env
# set a strong SESSION_SECRET in .env
docker compose up --build
```

Open `http://localhost:3000`.

Seeded local login:

- Email: `demo@example.com`
- Password: `DemoPassword123!`

For a non-Docker setup:

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

## Product areas

- **Authentication:** register, login, logout; Argon2id password hashing; signed httpOnly session cookies; generic login failures and basic backoff.
- **Overview:** KPI cards for installs, cost, revenue, ROAS, CPI and payers; revenue trend; acquisition funnel; top-source analysis.
- **Daily:** cost/revenue overlay, best/worst day and pacing table.
- **Weekly:** ISO-style weekly aggregation with ROAS and week-over-week change.
- **Sources & Channels:** searchable global filters, cost/revenue chart, spend share, CPI-vs-retention scatter, detailed source/channel/campaign table.
- **Decision actions:** Test, Push, Optimize and Extend timeframe use the selected row's metrics, produce transparent recommendations and save them to Action History.
- **Trends:** trend classification plus a 14-day directional forecast.
- **Geography:** country intensity grid, installs, cost, revenue, ROAS and CPI by geography.
- **Payable Events:** event funnel, revenue, unique users, install conversion and user-side payable toggles.
- **Uploads:** drag-and-drop XLSX import, signature/size validation, multi-sheet parsing, duplicate removal, auto mapping, mapping/quality summary and upload history.
- **Settings:** action thresholds, language preference and theme selection.
- **Exports:** table views can be exported to CSV from the browser.

## AppsFlyer ingestion

The importer detects common AppsFlyer fields case-insensitively, including Date / Install Time / Event Time, Media Source, Channel, Campaign, Country, platform/app fields, impressions, clicks, installs, cost, revenue, event name/count and unique users. Exact duplicate rows are removed per sheet. Original normalized rows are retained in `Fact.raw` for auditability.

Uploaded `.xlsx` files are checked for extension, configured size limit, and ZIP/XLSX magic bytes before parsing.

## Data model

Prisma models cover users, uploads, normalized facts, payable events, saved mappings, actions and audit logs. Facts are indexed on date, media source, channel and country, and are always reached through uploads owned by the current user.

## Demo behavior

The UI contains a realistic generated AppsFlyer dataset so the dashboards are useful before a first upload. For an authenticated user, persisted uploaded data automatically replaces demo analytics as soon as a successful import exists.

If you deliberately want to run the UI without authentication while developing, add this to `.env`:

```bash
DEMO_MODE=true
```

Do not use `DEMO_MODE=true` in production.

## Security

Use a unique `SESSION_SECRET` of at least 32 random characters. Production deployments should terminate HTTPS before the app so secure cookies and HSTS can be enabled at the edge. Security headers are configured in `next.config.ts`; state-changing API routes require an authenticated owner/analyst session.

## Tests and verification

```bash
npm test
npm run test:e2e
npm run i18n:check
npm run build
```

The repository includes Vitest metric/mapping tests and Playwright smoke coverage. CI should run the complete command set above against PostgreSQL.

## Project structure

```text
src/app/              pages and API routes
src/components/       dashboard UI, charts, filters and actions
src/lib/              parser, metrics, recommendations and demo data
src/server/           database, sessions and analytics aggregation
src/locales/          locale JSON resources
prisma/               schema and seed data
tests/                unit and browser tests
docs/                 architecture, metrics and mapping documentation
```

## Production integrations

The platform intentionally does **not** pretend to mutate live AppsFlyer/ad-network campaigns. Test/Push/Optimize generate persisted decision plans from uploaded data. A real campaign connector can be added through an adapter without changing the analytics domain.

Likewise, password-reset/verification email delivery requires an outbound email provider. The credential auth, session, database and UI foundations are present; plug the provider into dedicated auth routes before enabling those email-dependent flows in production.
