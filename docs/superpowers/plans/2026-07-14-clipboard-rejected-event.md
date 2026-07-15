# Clipboard Rejected Event Implementation Plan

**Goal:** Capture a PostHog custom event with error details when an attempted clipboard image write
rejects, while preserving the PNG download fallback.

**Architecture:** The `copy-image` helper owns the clipboard attempt and download decision.
`CopyButton` captures the rejection event directly through the helper's rejection callback. The
generator route is not involved.

**Tech Stack:** Svelte 5, strict TypeScript, PostHog JS, Vitest, Playwright

## Constraints

- Fire `copy_button.clipboard_rejected` only when `navigator.clipboard.write()` rejects.
- Do not fire it when the Clipboard API or `ClipboardItem` is unavailable.
- Attach `error_name`, `error_message`, and `error_stack` when available.
- Do not attach driver or message state.
- Do not call `posthog.captureException` for this handled rejection.
- Preserve the successful PNG download fallback and `copy_button.success` event.

## Tasks

### 1. Specify the component-owned event

- Add a focused `CopyButton` unit test that mocks `posthog-js`.
- Assert the custom event contains only normalized error details.
- Verify the test fails before the component exports the capture function.

### 2. Capture directly in `CopyButton`

- Define `captureClipboardRejected(error)` in `CopyButton.svelte`.
- Pass it to the clipboard helper as the rejection observer.
- Remove the `onClipboardRejected` component prop.
- Remove the route-level handler and standalone PostHog event helper.

### 3. Verify fallback behavior

- Keep unit coverage for rejected, unavailable, and throwing-observer paths.
- Keep Playwright coverage that rejected and unavailable clipboard writes download the PNG.
- Run `pnpm check`, `pnpm lint`, and the relevant unit and integration tests.
