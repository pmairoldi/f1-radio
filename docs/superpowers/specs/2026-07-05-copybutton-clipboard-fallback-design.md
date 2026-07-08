# CopyButton clipboard fallback — design

**Date:** 2026-07-05
**Branch:** fix-errors
**Status:** Approved

## Problem

The "copy as PNG" feature fails silently for many users. `CopyButton.svelte` calls
`navigator.clipboard.write([new ClipboardItem({ 'image/png': getImage(output) })])`
with no fallback — on failure the user gets nothing and the error is reported to
PostHog via `captureException`.

PostHog evidence (project 115317, last 90 days):

| Issue                                                                                                      | Cause                                             | Impact                     |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | -------------------------- |
| `NotAllowedError: Write permission denied.` (019a2ef2)                                                     | Chrome/Android denies image clipboard writes      | 135 occurrences / 14 users |
| `NotAllowedError: Clipboard write is not allowed.` (019a44c1)                                              | Safari denial variant                             | 6 / 5                      |
| `NotAllowedError: request not allowed by user agent` (019a7b71)                                            | Firefox denial variant                            | 1 / 1                      |
| `TypeError: Failed to construct 'ClipboardItem': Failed to convert value to 'Blob'.` (019edf1d + 019ce799) | Chrome ≤~105 rejects Promise-valued ClipboardItem | 5 / 2                      |

Firefox < 127 also lacks `ClipboardItem` entirely.

## Decisions

1. **Fallback UX: silent auto-download.** When the clipboard write fails or the API
   is unavailable, download the PNG as `f1-radio-meme.png`. The browser's download
   UI is the feedback. No toast, no button label change, no new i18n strings.
2. **One code path, no compat retry.** The old-Chrome Promise TypeError lands in the
   same catch as permission denials and falls back to download. No UA sniffing, no
   resolved-Blob retry (only 2 users in 90 days hit that case).

## Design

All changes live in `src/lib/components/CopyButton.svelte` (PNG export stays
centralized there) plus a small callback-signature change in `src/routes/+page.svelte`.

### Flow in `execute()`

1. Start the render synchronously inside the click gesture:
   `const blobPromise = getImage(output)` — Safari requires the `ClipboardItem` to be
   constructed with a Promise during the gesture.
2. **Clipboard attempt:** if `navigator.clipboard?.write` and `ClipboardItem` are both
   available, `await navigator.clipboard.write([new ClipboardItem({ 'image/png': blobPromise })])`.
   Success → `onCopy(duration, 'clipboard')`.
3. **Fallback:** missing API or any clipboard error → `const blob = await blobPromise`,
   then download via object URL + temporary `<a download="f1-radio-meme.png">` click
   (revoke the URL after). Success → `onCopy(duration, 'download')`.
4. **Real errors:** if `blobPromise` itself rejects (dom-to-image render failure), the
   fallback's `await blobPromise` re-throws the same rejection → `onError(error, duration)`.
   No special casing needed. `captureException` now only ever reports genuine render
   bugs; expected clipboard denials no longer create PostHog exceptions.

### API change

- `CopyButton` prop: `onCopy: (duration: number, method: 'clipboard' | 'download') => void`.
- `+page.svelte`: add `method` to the existing `copy_button.success` capture so
  fallback frequency is observable in PostHog.
- `onError` signature unchanged.

## Testing

Playwright integration tests in `tests/copy-button.test.ts`:

- **Existing test (currently failing):** `navigator.clipboard` and `ClipboardItem`
  undefined → clicking Copy downloads `f1-radio-meme.png`. Goes green with this change.
- **New test:** clipboard API present but `write` rejects with `NotAllowedError` →
  same download assertion. Covers the dominant Chrome/Android failure.

Run with `pnpm build && pnpm test:integration`.

## Out of scope

- Toast/feedback system, adaptive button labels, i18n additions.
- Resolved-Blob retry for old Chrome.
- Other PostHog error groups (URL-sync debounce, chunk-load handling, hook filters) —
  tracked as separate tasks.
