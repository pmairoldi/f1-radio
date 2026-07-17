import posthog from 'posthog-js';

function captureClipboardRejected(error: unknown) {
	const errorDetails =
		error instanceof Error
			? {
					error_name: error.name,
					error_message: error.message,
					...(error.stack == null ? {} : { error_stack: error.stack })
				}
			: { error_message: String(error) };

	posthog.capture('copy_button.clipboard_rejected', errorDetails);
}

interface CopyImageOptions {
	download: (blob: Blob) => void;
}

export async function copyImage(
	image: Promise<Blob>,
	{ download }: CopyImageOptions
): Promise<'clipboard' | 'download'> {
	if (navigator.clipboard?.write != null && typeof ClipboardItem !== 'undefined') {
		try {
			await navigator.clipboard.write([
				new ClipboardItem({
					'image/png': image
				})
			]);
			return 'clipboard';
		} catch (error) {
			try {
				captureClipboardRejected(error);
			} catch {
				// Analytics must not block the download fallback.
			}
		}
	}

	download(await image);
	return 'download';
}
