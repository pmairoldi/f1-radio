interface CopyImageOptions {
	download: (blob: Blob) => void;
	onClipboardRejected: (error: unknown) => void;
}

export async function copyImage(
	image: Promise<Blob>,
	{ download, onClipboardRejected }: CopyImageOptions
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
				onClipboardRejected(error);
			} catch {
				// Analytics must not block the download fallback.
			}
		}
	}

	download(await image);
	return 'download';
}
