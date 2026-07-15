import { beforeEach, describe, expect, it, vi } from 'vitest';

const { capture } = vi.hoisted(() => ({ capture: vi.fn() }));

vi.mock('posthog-js', () => ({
	default: { capture }
}));

import { captureClipboardRejected } from './copy-image';

describe('captureClipboardRejected', () => {
	beforeEach(() => {
		capture.mockClear();
	});

	it('captures only the clipboard error details', () => {
		const error = new Error('Write permission denied.');
		error.name = 'NotAllowedError';
		error.stack = 'NotAllowedError: Write permission denied.';

		captureClipboardRejected(error);

		expect(capture).toHaveBeenCalledOnce();
		expect(capture).toHaveBeenCalledWith('copy_button.clipboard_rejected', {
			error_name: 'NotAllowedError',
			error_message: 'Write permission denied.',
			error_stack: 'NotAllowedError: Write permission denied.'
		});
	});
});
