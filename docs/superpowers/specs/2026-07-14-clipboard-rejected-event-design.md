# Clipboard Rejected Event Design

## Goal

Track clipboard image write rejections in PostHog while preserving the existing successful download
fallback.

## Behavior

When `navigator.clipboard.write()` rejects, `CopyButton` calls a new
`onClipboardRejected(error)` callback exactly once and then downloads the generated PNG as it does
today. The callback is not called when the Clipboard API or `ClipboardItem` is unavailable.

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

`CopyButton` remains responsible for detecting the failed clipboard write and continuing the
fallback. The route remains responsible for analytics, matching the existing `onCopy` and `onError`
callback boundary and keeping PostHog out of the reusable component.

## Testing

An integration test will verify that a rejected clipboard write emits
`copy_button.clipboard_rejected` with the error details and still downloads the PNG. Coverage will
also verify that an unavailable Clipboard API downloads the PNG without emitting the rejection
event.
