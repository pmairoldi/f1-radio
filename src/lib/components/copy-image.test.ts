import { afterEach, describe, expect, it, vi } from 'vitest';

import { copyImage } from './copy-image';

class ClipboardItemMock {
	readonly items: Record<string, Promise<Blob>>;

	constructor(items: Record<string, Promise<Blob>>) {
		this.items = items;
	}
}

describe('copyImage', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('reports a rejected clipboard write and downloads the image', async () => {
		const error = new DOMException('Write permission denied.', 'NotAllowedError');
		const blob = new Blob();
		const download = vi.fn();
		const onClipboardRejected = vi.fn();
		vi.stubGlobal('ClipboardItem', ClipboardItemMock);
		vi.stubGlobal('navigator', {
			clipboard: {
				write: vi.fn().mockRejectedValue(error)
			}
		});

		await expect(copyImage(Promise.resolve(blob), { download, onClipboardRejected })).resolves.toBe(
			'download'
		);
		expect(onClipboardRejected).toHaveBeenCalledOnce();
		expect(onClipboardRejected).toHaveBeenCalledWith(error);
		expect(download).toHaveBeenCalledWith(blob);
	});

	it('downloads without reporting when the clipboard API is unavailable', async () => {
		const blob = new Blob();
		const download = vi.fn();
		const onClipboardRejected = vi.fn();
		vi.stubGlobal('ClipboardItem', undefined);
		vi.stubGlobal('navigator', { clipboard: undefined });

		await expect(copyImage(Promise.resolve(blob), { download, onClipboardRejected })).resolves.toBe(
			'download'
		);
		expect(onClipboardRejected).not.toHaveBeenCalled();
		expect(download).toHaveBeenCalledWith(blob);
	});

	it('downloads when the rejection observer throws', async () => {
		const blob = new Blob();
		const download = vi.fn();
		const onClipboardRejected = vi.fn(() => {
			throw new Error('Analytics unavailable');
		});
		vi.stubGlobal('ClipboardItem', ClipboardItemMock);
		vi.stubGlobal('navigator', {
			clipboard: {
				write: vi.fn().mockRejectedValue(new Error('Clipboard rejected'))
			}
		});

		await expect(copyImage(Promise.resolve(blob), { download, onClipboardRejected })).resolves.toBe(
			'download'
		);
		expect(download).toHaveBeenCalledWith(blob);
	});
});
