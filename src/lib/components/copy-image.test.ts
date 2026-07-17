import { afterEach, describe, expect, it, vi } from 'vitest';

const { capture } = vi.hoisted(() => ({ capture: vi.fn() }));

vi.mock('posthog-js', () => ({
	default: { capture }
}));

import { copyImage } from './copy-image';

class ClipboardItemMock {
	readonly items: Record<string, Promise<Blob>>;

	constructor(items: Record<string, Promise<Blob>>) {
		this.items = items;
	}
}

describe('copyImage', () => {
	afterEach(() => {
		capture.mockReset();
		vi.unstubAllGlobals();
	});

	it('captures a rejected clipboard write and downloads the image', async () => {
		const error = new DOMException('Write permission denied.', 'NotAllowedError');
		error.stack = 'NotAllowedError: Write permission denied.';
		const blob = new Blob();
		const download = vi.fn();
		vi.stubGlobal('ClipboardItem', ClipboardItemMock);
		vi.stubGlobal('navigator', {
			clipboard: {
				write: vi.fn().mockRejectedValue(error)
			}
		});

		await expect(copyImage(Promise.resolve(blob), { download })).resolves.toBe('download');
		expect(capture).toHaveBeenCalledOnce();
		expect(capture).toHaveBeenCalledWith('copy_button.clipboard_rejected', {
			error_name: 'NotAllowedError',
			error_message: 'Write permission denied.',
			error_stack: 'NotAllowedError: Write permission denied.'
		});
		expect(download).toHaveBeenCalledWith(blob);
	});

	it('downloads without capturing when the clipboard API is unavailable', async () => {
		const blob = new Blob();
		const download = vi.fn();
		vi.stubGlobal('ClipboardItem', undefined);
		vi.stubGlobal('navigator', { clipboard: undefined });

		await expect(copyImage(Promise.resolve(blob), { download })).resolves.toBe('download');
		expect(capture).not.toHaveBeenCalled();
		expect(download).toHaveBeenCalledWith(blob);
	});

	it('downloads when PostHog throws', async () => {
		const blob = new Blob();
		const download = vi.fn();
		capture.mockImplementationOnce(() => {
			throw new Error('Analytics unavailable');
		});
		vi.stubGlobal('ClipboardItem', ClipboardItemMock);
		vi.stubGlobal('navigator', {
			clipboard: {
				write: vi.fn().mockRejectedValue(new Error('Clipboard rejected'))
			}
		});

		await expect(copyImage(Promise.resolve(blob), { download })).resolves.toBe('download');
		expect(capture).toHaveBeenCalledOnce();
		expect(download).toHaveBeenCalledWith(blob);
	});
});
