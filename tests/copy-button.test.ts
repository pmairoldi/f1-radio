import { expect, test } from '@playwright/test';

test('downloads the image when the clipboard API is unavailable', async ({ page }) => {
	await page.addInitScript(() => {
		Object.defineProperty(navigator, 'clipboard', {
			value: undefined
		});
		Object.defineProperty(window, 'ClipboardItem', {
			value: undefined
		});
	});

	await page.route('**/relay-ujOT/**', (route) => route.fulfill({ status: 204, body: '' }));
	await page.goto('/?d=lando_norris&m=driver%3ATest');

	const download = page.waitForEvent('download');
	await page.getByRole('button', { name: 'Copy' }).click();

	expect((await download).suggestedFilename()).toBe('f1-radio-meme.png');
});

test('downloads the image when the clipboard write is denied', async ({ page }) => {
	await page.addInitScript(() => {
		Object.defineProperty(navigator, 'clipboard', {
			value: {
				write: () => Promise.reject(new DOMException('Write permission denied.', 'NotAllowedError'))
			}
		});
	});

	await page.route('**/relay-ujOT/**', (route) => route.fulfill({ status: 204, body: '' }));
	await page.goto('/?d=lando_norris&m=driver%3ATest');

	const download = page.waitForEvent('download');
	await page.getByRole('button', { name: 'Copy' }).click();

	expect((await download).suggestedFilename()).toBe('f1-radio-meme.png');
});
