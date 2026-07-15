# Clipboard Rejected Event Design

## Goal

Track clipboard image write rejections in PostHog while preserving the existing successful download
fallback.

## Behavior

When `navigator.clipboard.write()` rejects, `CopyButton` calls a new
`onClipboardRejected(error)` callback exactly once and then downloads the generated PNG as it does
today. The callback is not called when the Clipboard API or `ClipboardItem` is unavailable. An
exception thrown by the observer is ignored so analytics cannot block the download fallback.

The page captures a `copy_button.clipboard_rejected` event with these properties:

- `driver`: the current `d` URL parameter
- `messages`: all current `m` URL parameters
- `error_name`: the rejected value's error name when it is an `Error`
- `error_message`: the rejected value's message when it is an `Error`, otherwise its string value
- `error_stack`: the rejected value's stack when available

The rejection is not sent through `posthog.captureException`, because the requested behavior is a
custom event with attached error details. The existing `copy_button.success` event still records the
subsequent successful download.

## Structure

The `copy-image` helper owns the clipboard attempt, rejection notification, and download decision.
`CopyButton` supplies the browser download function and observer callback. The route passes the
URL-state context to a focused PostHog event helper, matching the existing callback boundary and
keeping PostHog out of the reusable component.

## Testing

Unit tests will verify the `copy_button.clipboard_rejected` event contract and the clipboard
helper's rejected, unavailable, and throwing-observer paths. The existing integration tests will
verify that rejected and unavailable clipboard writes both still download the PNG.
