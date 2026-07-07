# AGENTS.md Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generated root agent guide with a short, accurate source of durable project instructions.

**Architecture:** Keep a single root `AGENTS.md` containing repository-wide guidance. Prefer source paths and invariants over inventories and volatile metadata; add nested guidance only if a subtree later needs materially different rules.

**Tech Stack:** Markdown, SvelteKit 2, Svelte 5, TypeScript, Tailwind CSS 4, Paraglide.js, pnpm

**Spec:** `docs/superpowers/specs/2026-07-06-agents-md-rewrite-design.md`

## Global Constraints

- Do not restore the deleted nested instruction files.
- Do not modify application code or generated files.
- Keep every documented path, command, and behavior aligned with the current working tree.

---

### Task 1: Replace and verify the root agent guide

**Files:**

- Modify: `AGENTS.md`

**Interfaces:**

- Consumes: Current repository layout, `package.json` scripts, URL-state implementation, and active season/renderer exports
- Produces: Repository-wide instructions loaded by coding agents from the project root

- [ ] **Step 1: Replace `AGENTS.md`**

Use this complete content:

```markdown
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

Run checks proportional to the change. For application changes, run `pnpm check` and
`pnpm lint` at minimum, plus the relevant tests. Review the final diff for generated or unrelated
changes before finishing.
```

- [ ] **Step 2: Verify formatting and stale metadata removal**

Run:

```bash
pnpm exec prettier --check AGENTS.md
rg -n '^\*\*(Generated|Commit|Branch):' AGENTS.md
```

Expected: Prettier reports `All matched files use Prettier code style!`; `rg` exits with status 1 and prints no matches.

- [ ] **Step 3: Verify documented paths and the diff**

Run:

```bash
for path in src/routes/+page.svelte src/routes/+page.ts src/lib/seasons/current.ts src/lib/renderers/current.ts src/lib/components src/lib/posthog src/hooks.server.ts src/hooks.client.ts src/posts src/routes/blog i18n src/lib/paraglide; do test -e "$path" || exit 1; done
git diff --check -- AGENTS.md
git diff -- AGENTS.md
```

Expected: the path loop and `git diff --check` exit successfully; the diff contains only the intended root guide rewrite.

- [ ] **Step 4: Commit the rewrite without including unrelated staged changes**

```bash
git add AGENTS.md
git commit AGENTS.md -m "docs: streamline agent guidance"
```

Expected: one commit containing only `AGENTS.md`; the nested instruction file removal remains in its
separate commit.
