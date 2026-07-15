# F1 Radio Meme

SvelteKit app for composing F1-style driver/team radio conversations and exporting the rendered
RadioBox as a PNG. The project uses Svelte 5 runes, strict TypeScript, Tailwind CSS 4,
Paraglide.js, mdsvex, PostHog, Vitest, and Playwright.

## Key Locations

- `src/routes/+page.svelte` and `+page.ts`: generator UI and URL-state serialization
- `src/lib/seasons/`: versioned driver/team data; `current.ts` selects the active season
- `src/lib/renderers/`: versioned RadioBox UI; `current.ts` selects the active renderer
- `src/lib/components/`: shared UI and PNG export behavior
- `src/lib/posthog/`, `src/hooks.server.ts`, `src/hooks.client.ts`: analytics and error capture
- `src/posts/` and `src/routes/blog/`: mdsvex posts and prerendered blog routes
- `i18n/`: translation source; `src/lib/paraglide/` is generated output

## Project Invariants

- Generator state belongs in URL parameters: `d` selects a driver and repeated `m` values encode
  `type:text`. Update parsing and serialization together when changing this format.
- Preserve `oninput` synchronization with the 200 ms trailing debounce. Structural message changes
  such as add/remove flush immediately.
- Import season and renderer data through their `current.ts` modules. Switch seasons by updating
  both selectors; change current roster data in the active year file, not historical files.
- Edit messages in `i18n/*.json`. Never edit generated `src/lib/paraglide/*` files.
- Keep blog routes statically prerendered unless a task explicitly changes that architecture.
- Follow existing Svelte 5 patterns: runes, snippets, and attachments rather than legacy APIs.

## Style

- Tabs, single quotes, no trailing commas, and 100-character lines
- Use `tailwind-merge` for conditional Tailwind class composition
- Follow nearby code and avoid unrelated refactors

## Commands

- `pnpm dev`: start the development server
- `pnpm check`: run Svelte and TypeScript checks
- `pnpm lint`: run Prettier and ESLint checks
- `pnpm test:unit --run`: run unit tests once
- `pnpm test:integration`: run Playwright tests
- `pnpm build`: create a production build
- `pnpm test`: run the full test suite

Every source or test change must pass `pnpm check` before finishing. Run `pnpm lint` and relevant
tests proportional to the change. Review the final diff for generated or unrelated changes before
finishing.
