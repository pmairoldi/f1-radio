import { beforeEach, describe, expect, it, vi } from 'vitest';

const { capture } = vi.hoisted(() => ({ capture: vi.fn() }));

vi.mock('posthog-js', () => ({
	default: { capture }
}));

import { captureClipboardRejected } from './events';

describe('captureClipboardRejected', () => {
	beforeEach(() => {
		capture.mockClear();
	});

	it('captures the generator context and error details', () => {
		const error = new Error('Write permission denied.');
		error.name = 'NotAllowedError';
		error.stack = 'NotAllowedError: Write permission denied.';

		captureClipboardRejected(error, {
			driver: 'lando_norris',
			messages: ['driver:Test']
		});

		expect(capture).toHaveBeenCalledOnce();
		expect(capture).toHaveBeenCalledWith('copy_button.clipboard_rejected', {
			driver: 'lando_norris',
			messages: ['driver:Test'],
			error_name: 'NotAllowedError',
			error_message: 'Write permission denied.',
			error_stack: 'NotAllowedError: Write permission denied.'
		});
	});
});
