# PROJECT KNOWLEDGE BASE

**Generated:** 2026-03-02
**Commit:** fa9537b
**Branch:** 2026

## OVERVIEW

F1 Radio Meme — SvelteKit app for generating F1-style radio message images (driver + team alternating chat). Users pick a driver, compose messages, preview a styled RadioBox, and copy it as a PNG via dom-to-image.

Stack: Svelte 5 runes + SvelteKit 2, TypeScript strict, Tailwind CSS v4, Paraglide.js i18n, mdsvex blog, PostHog analytics, Vercel deployment.

## STRUCTURE

```
f1-radio/
├── src/
│   ├── lib/
│   │   ├── seasons/          # Driver/team data per year; current.ts = active season
│   │   ├── renderers/        # Versioned RadioBox components; current.ts = active renderer
│   │   ├── components/       # Shared UI (Button, Select, CopyButton, Header, Footer, SEO)
│   │   ├── posthog/          # Analytics client (browser) + server (proxy handle)
│   │   ├── types.ts          # Driver, Team, Message, Name, NameDisplay
│   │   ├── seeded-random.ts  # LCG for deterministic audio waveform noise
│   │   ├── blog.ts           # Post discovery via import.meta.glob + mdsvex
│   │   └── data-formatter.ts # Intl.DateTimeFormat wrapper
│   ├── routes/               # SvelteKit file-based routing
│   │   ├── +page.svelte      # Main generator UI
│   │   ├── +page.ts          # URL param → state loader
│   │   └── blog/             # Blog listing + [slug] post pages
│   ├── posts/                # Markdown blog posts (mdsvex)
│   ├── hooks.server.ts       # Paraglide + PostHog proxy + error capture
│   ├── hooks.client.ts       # Client-side error capture
│   └── app.html              # Shell with %lang% placeholder for Paraglide
├── i18n/                     # i18n source messages (Paraglide source of truth)
├── static/                   # Fonts (formula1, kh-interference-f1), favicon
├── tests/                    # Playwright integration tests
└── scripts/                  # Build utilities
```

## WHERE TO LOOK

| Task | Location |
|------|----------|
| Add/change driver or team | `src/lib/seasons/current.ts` → edit `2026.ts` (or current year) |
| Switch active season | Edit `src/lib/seasons/current.ts` and `src/lib/renderers/current.ts` only |
| Modify RadioBox visual | `src/lib/renderers/2025-current/RadioBox.svelte` |
| Add UI component | `src/lib/components/` |
| Change URL state encoding | `src/routes/+page.ts` (load) + `+page.svelte` (goto call) |
| Add i18n string | `i18n/*.json`, then use `m['key.name']()` |
| Add blog post | New `.md` in `src/posts/` with frontmatter |
| Track analytics event | Where event fires; PostHog proxy in `hooks.server.ts` |

## SEASON / RENDERER VERSIONING

Two parallel versioning systems — keep them in sync:

- `src/lib/seasons/current.ts` → re-exports active year data
- `src/lib/renderers/current.ts` → re-exports active year component

**Never** update season data in non-current year files unless backfilling. Only edit `current.ts` files to switch seasons.

## URL STATE

All generator state lives in URL params — no client stores:

```
?d=lando_norris&m=driver:Box+box+box&m=team:Understood
```

- `d` = driver key (snake_case, matches key in season's `drivers` object)
- `m` = repeated param, format `type:text` where type is `driver` or `team`
- **Gotcha:** message text cannot contain `:` — naive `split(':')` in `+page.ts`
- State synced on every keystroke via `goto(..., { replaceState: true, keepFocus: true })`

## SVELTE 5 PATTERNS

```svelte
let { driver, children }: Props = $props();
let { name } = $derived(driver);
let el = $state<HTMLElement>();
{#snippet name(arg: Type)}...{/snippet}
{@render name(value)}
{@attach attachmentFn}   <!-- custom DOM actions (replaces Svelte 4 actions) -->
```

## I18N

```typescript
import { m } from '$lib/paraglide/messages';
m['header.title_home']()   // function call, not string
localizeHref('/blog')       // locale-aware href
```

Source files in `i18n/`. `src/lib/paraglide/*` is **auto-generated** — never edit.

## CODE STYLE

Tabs, single quotes, no trailing commas, 100 char width. `tailwind-merge` for conditional Tailwind classes.

## COMMANDS

```bash
pnpm dev                    # dev server
pnpm build && pnpm preview  # production build
pnpm check                  # Svelte type check
pnpm lint / pnpm format     # ESLint + Prettier
pnpm test:unit --run        # Vitest (no watch)
pnpm build && pnpm test:integration  # Playwright
```

## ANTI-PATTERNS

- Editing `src/lib/paraglide/*` (auto-generated)
- Editing historical season files (2024.ts, 2025.ts) to add current-year data
- Storing UI state in Svelte stores — use URL params
- Using `onchange` instead of `oninput` for real-time message sync
- Adding new renderers without following the `index.ts` + `current.ts` pattern
