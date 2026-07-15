import posthog from 'posthog-js';

interface ClipboardRejectedContext {
	driver: string | null;
	messages: string[];
}

export function captureClipboardRejected(error: unknown, context: ClipboardRejectedContext) {
	const errorDetails =
		error instanceof Error
			? {
					error_name: error.name,
					error_message: error.message,
					...(error.stack == null ? {} : { error_stack: error.stack })
				}
			: { error_message: String(error) };

	posthog.capture('copy_button.clipboard_rejected', {
		...context,
		...errorDetails
	});
}
