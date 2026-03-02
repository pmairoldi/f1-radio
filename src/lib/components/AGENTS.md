# Components

Shared UI primitives and layout components used across the app and blog.

## Overview

General-purpose components that are not season- or renderer-specific. All use Svelte 5 runes syntax.

## Components

| Name | Key Props | Purpose |
|---|---|---|
| `Button.svelte` | Extends `HTMLButtonAttributes`; `children: Snippet` | Styled button with red bg (`bg-red-700` / `#b91c1c`); enforces disabled guard |
| `Select.svelte` | Extends `HTMLSelectAttributes`; `children: Snippet` | Styled select with red bg and custom CSS-gradient chevron |
| `CopyButton.svelte` | `element: HTMLElement \| undefined`; `onCopy(duration)`; `onError(error, duration)` | Exports a DOM element as PNG via dom-to-image at 3x scale; shows spinner during export |
| `Header.svelte` | none | Sticky nav with F1 Radio Meme branding; Home, Blog, and Buy me a coffee links; uses `localizeHref()` |
| `Footer.svelte` | none | X social link with theme-aware icon (light/dark via `<picture>`); disclaimer text via i18n |
| `SEO.svelte` | `title`, `description`, `name`, `url`, `imageUrl` | Injects OG and Twitter Card meta tags into `<svelte:head>` |
| `ArticleRadioBox.svelte` | none | Wrapper for embedding a RadioBox in blog posts; red border (light) / gray border (dark), flex-centered |

## Conventions

- Form elements (`Button`, `Select`) spread their HTML attribute base type so callers can pass any native attribute.
- `CopyButton` calls `onCopy` or `onError` with an elapsed duration (ms) so the parent can display timed feedback.
- `Header` and `Footer` are app-wide singletons rendered in the root layout; do not instantiate them elsewhere.
- `SEO` is placed in page-level `+page.svelte` files, not in the layout, so each route controls its own metadata.
- Theme-sensitive assets use a `<picture>` element with separate sources per color scheme rather than CSS filters.

## Anti-Patterns

- Do not hardcode color values; use the Tailwind tokens already established (`bg-red-700`, etc.).
- Do not add season- or renderer-specific logic here; that belongs in `src/lib/seasons/` or `src/lib/renderers/`.
- Do not import from `$lib/paraglide/*` directly; use the `m` helper imported from `$lib/paraglide/messages`.
- Do not skip the disabled guard in `Button`; all button actions must respect the disabled state.
- Do not call dom-to-image outside of `CopyButton`; PNG export logic is intentionally centralised there.
