# Clipboard Rejected Event Implementation Plan

**Goal:** Capture a PostHog custom event with error details when an attempted clipboard image write
rejects, while preserving the PNG download fallback.

**Architecture:** The `copy-image` helper owns the clipboard attempt, rejection event, and download
decision. The component and generator route are not involved in rejection tracking.

**Tech Stack:** Svelte 5, strict TypeScript, PostHog JS, Vitest, Playwright

## Constraints

- Fire `copy_button.clipboard_rejected` only when `navigator.clipboard.write()` rejects.
- Do not fire it when the Clipboard API or `ClipboardItem` is unavailable.
- Attach `error_name`, `error_message`, and `error_stack` when available.
- Do not attach driver or message state.
- Do not call `posthog.captureException` for this handled rejection.
- Preserve the successful PNG download fallback and `copy_button.success` event.

## Tasks

### 1. Specify the helper-owned event

- Add a focused `copy-image` unit test that mocks `posthog-js`.
- Assert the custom event contains only normalized error details.
- Verify the download fallback still succeeds.

### 2. Capture directly in `copyImage`

- Capture the PostHog event when `navigator.clipboard.write()` rejects.
- Keep the analytics helper private to `copy-image.ts`.
- Do not expose a rejection callback through the helper, component, or route.

### 3. Verify fallback behavior

- Keep unit coverage for rejected, unavailable, and throwing-analytics paths.
- Keep Playwright coverage that rejected and unavailable clipboard writes download the PNG.
- Run `pnpm check`, `pnpm lint`, and the relevant unit and integration tests.
