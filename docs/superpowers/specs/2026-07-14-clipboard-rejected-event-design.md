# Clipboard Rejected Event Design

## Goal

Track clipboard image write rejections in PostHog while preserving the existing successful download
fallback.

## Behavior

When `navigator.clipboard.write()` rejects, `CopyButton` captures the rejection exactly once and
then downloads the generated PNG as it does today. Nothing is captured when the Clipboard API or
`ClipboardItem` is unavailable. An exception thrown by analytics is ignored so it cannot block the
download fallback.

`CopyButton` captures a `copy_button.clipboard_rejected` event with these properties:

- `error_name`: the rejected value's error name when it is an `Error`
- `error_message`: the rejected value's message when it is an `Error`, otherwise its string value
- `error_stack`: the rejected value's stack when available

The rejection is not sent through `posthog.captureException`, because the requested behavior is a
custom event with attached error details. The existing `copy_button.success` event still records the
subsequent successful download.

## Structure

The `copy-image` helper owns the clipboard attempt, rejection notification, and download decision.
`CopyButton` supplies the browser download function and captures the PostHog event directly. The
generator route is not involved in clipboard rejection tracking.

## Testing

Unit tests will verify the `copy_button.clipboard_rejected` event contract and the clipboard
helper's rejected, unavailable, and throwing-observer paths. The existing integration tests will
verify that rejected and unavailable clipboard writes both still download the PNG.
