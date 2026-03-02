# AGENTS.md — src/routes/

SvelteKit routes for the F1 Radio Meme app: the main generator, blog listing, and individual blog posts.

## OVERVIEW

All user-facing pages live here. The main page is a stateless UI driven entirely by URL params; the blog is statically prerendered from markdown files in `src/posts/`.

## ROUTES

| Path | Files | Purpose |
|---|---|---|
| `/` | `+layout.svelte`, `+layout.ts` | Root layout (renders children only); initializes PostHog |
| `/` | `+page.svelte`, `+page.ts` | Main generator: driver select, message inputs, RadioBox preview, CopyButton |
| `/blog` | `blog/+page.svelte`, `blog/+page.server.ts`, `blog/+layout.server.ts` | Post listing; loaded via `getPosts()`; `prerender: true` |
| `/blog/[slug]` | `blog/[slug]/+page.svelte`, `blog/[slug]/+page.ts`, `blog/[slug]/+page.server.ts` | Individual post; dynamic import of `src/posts/${slug}.md`; entries generator for static prerendering |

## URL STATE

State lives entirely in URL search params. `+page.ts` parses them; `+page.svelte` syncs changes back via `goto()`.

### Params

- `?d=driver_key` — selects a driver via `drivers[d]`; an unrecognized key silently produces `null` (no error thrown)
- `?m=type:text` — repeated param; each value becomes a `Message` with `type` (`driver` or `team`) and `text`
- Default when no `m` params: `[{ type: 'driver', text: '' }]`

### Gotchas

- `?m` is parsed with a naive `.split(':')` — **colons in message text will corrupt parsing** (the first `:` is the delimiter; anything after is treated as text, but multiple colons will not split further since only the first is used as separator — verify this if changing the format)
- State is synced on `oninput` (not `onchange`) for real-time URL updates
- `goto()` is called with `{ replaceState: true, keepFocus: true, noScroll: true, invalidateAll: true }` — omitting any of these flags can cause scroll jumps, focus loss, or stale data
- New message inputs are auto-focused via `{@attach init}`, which checks a `mounted` flag to skip focus on initial render

### PostHog Events

Copy success and error both fire a PostHog event with the current URL params logged as properties.

## HOOKS

`hooks.server.ts` runs `sequence(paraglideHandle, posthogHandle)`:

- **paraglideHandle** — i18n locale negotiation (do not reorder; must run before app handlers)
- **posthogHandle** — proxies `/relay-ujOT/*` to `us.i.posthog.com`; static asset paths route to `us-assets` subdomain instead
- **handleError** — skips 404s silently; captures all other exceptions to PostHog, then calls `posthog.shutdown()`

`hooks.client.ts` — skips 404s; calls `posthog.captureException` for all other client-side errors.

## ANTI-PATTERNS

- Do not add server-side `load` functions to the main `/` route — state must remain in URL params only
- Do not use `onchange` for message inputs; use `oninput` to keep URL in sync in real time
- Do not add `prerender = false` to blog routes — the entire blog is statically generated
- Do not reorder `sequence(...)` in `hooks.server.ts`; paraglide must initialize before other handlers
- Do not parse `?m` values by splitting on all colons — the format is `type:text` where only the first colon is the delimiter; changing this requires updating both `+page.ts` and the serialization in `+page.svelte`
