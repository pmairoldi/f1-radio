# seasons/

## OVERVIEW

Driver and team data keyed by season year; `current.ts` points to the active year.

## WHERE TO LOOK

- `current.ts` — re-exports the active season (e.g. `export * from './2026'`)
- `2026.ts`, `2025.ts`, `2024.ts` — season-specific data files
- Logo assets live alongside the season files; filenames include the year (e.g. `williams-logo-2026.png`)

## DATA SHAPE

Each season file exports `teams` and `drivers` as `as const satisfies Record<string, Team | Driver>`.

```ts
// teams
export const teams = {
  williams: {
    name: 'Williams',
    color: '#00A0DD',
    logo: williamsLogo, // imported PNG
  },
} as const satisfies Record<string, Team>

// drivers
export const drivers = {
  george_russell: {
    number: 63,
    name: {
      first: 'George',
      last: 'Russell',
      display: 'last', // 'first' | 'last'
    },
    team: teams.williams,
  },
} as const satisfies Record<string, Driver>
```

## CONVENTIONS

- All keys are `snake_case` (e.g. `racing_bulls`, `max_verstappen`).
- `display` controls which part of the name is shown in the UI; set to `'first'` only when a driver is commonly known by first name.
- Logo imports are static (not dynamic); add a new import at the top of the file for each logo.
- To switch the active season, edit only `current.ts`. Do not change the year-specific files for this purpose.
- When adding a new season, copy the previous year's file, update data, and re-point `current.ts`.

## ANTI-PATTERNS

- Do not import from a year-specific file (e.g. `2025.ts`) anywhere outside `current.ts`; always import from `current.ts` or via the `$lib/seasons` alias.
- Do not share logo assets across years; duplicate and rename them per year so older seasons remain self-contained.
- Do not add runtime logic or computed values inside season files; they are pure data.
- Do not use `camelCase` or `PascalCase` for object keys.
