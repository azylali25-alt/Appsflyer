# Architecture

The app uses Next.js App Router as a single deployable web/API service, PostgreSQL via Prisma, server-side XLSX parsing, stateless signed cookie sessions, and normalized facts for analytics.

## Data flow
1. User authenticates. The server issues an httpOnly SameSite session cookie.
2. Analyst uploads an XLSX. Signature/extension/size are validated.
3. SheetJS parses each sheet, headers are normalized and matched against known AppsFlyer synonyms, rows are trimmed and exact duplicates removed.
4. The normalized rows are persisted into `Fact`, linked to `Upload`. Raw row JSON is retained for traceability.
5. `/api/analytics` aggregates data only from uploads owned by the current user.
6. Action requests run a transparent rule engine and are persisted in `Action` with evidence and parameters.

## Scale path
For datasets well beyond the starter deployment, replace synchronous import with a Redis-backed worker and write pre-aggregated daily/weekly rollup tables. The schema deliberately keeps uploads and facts separate so deletion and reprocessing are straightforward.

## Security boundaries
Every mutation resolves the session first; viewer cannot upload or trigger actions. Cookies are httpOnly/SameSite and secure in production. Passwords are Argon2id hashes. Uploads are bounded and checked for XLSX ZIP magic bytes. Exports must call `safeExportValue` to neutralize spreadsheet formula injection.
