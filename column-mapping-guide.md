# Column mapping guide

The importer compares headers case-insensitively against common AppsFlyer names such as `Install Time`, `Event Time`, `Media Source (pid)`, `Partner`, `Country Code`, `Event Name`, and standard delivery metrics. The upload response includes a 20-row preview and the proposed mapping. Extend `src/lib/column-mapping.ts` for additional automatic aliases; a complete mapping UI can save templates in `SavedMapping` per app.
