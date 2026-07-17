import { describe, it, expect } from 'vitest';

import { formatDate } from './data-formatter';

describe('formatDate', () => {
	it('uses the medium date style by default', () => {
		expect(formatDate('2024-01-05')).toBe('Jan 5, 2024');
	});

	it('uses the requested date style and locale', () => {
		expect(formatDate('2024-01-05', 'full', 'en')).toBe('Friday, January 5, 2024');
	});
});
