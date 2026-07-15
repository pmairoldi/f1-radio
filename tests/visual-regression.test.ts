import { readFile } from 'node:fs/promises';
import { expect, test, type Page } from '@playwright/test';

test('exported image is stable for a driver and team conversation', async ({ page }, testInfo) => {
	testInfo.snapshotSuffix = '';

	const image = await exportImage(
		page,
		'/?d=lando_norris&m=driver%3ABox%20box%20box&m=team%3ACopy%20that'
	);

	expect(image).toMatchSnapshot('mclaren-driver-team.png', { maxDiffPixels: 0.05 });
});

test('exported image is stable for a driver message', async ({ page }, testInfo) => {
	testInfo.snapshotSuffix = '';

	const image = await exportImage(page, '/?d=charles_leclerc&m=driver%3AWe%20are%20checking');

	expect(image).toMatchSnapshot('ferrari-driver.png', { maxDiffPixels: 0.05 });
});

async function exportImage(page: Page, url: string): Promise<Buffer> {
	await page.addInitScript(() => {
		Math.random = () => 0.5;
		Object.defineProperty(navigator, 'clipboard', {
			value: undefined
		});
		Object.defineProperty(window, 'ClipboardItem', {
			value: undefined
		});
	});

	await page.route('**/relay-ujOT/**', (route) => route.fulfill({ status: 204, body: '' }));
	await page.goto(url);

	await page.waitForFunction(
		() =>
			document.fonts.status === 'loaded' &&
			document.fonts.check('700 16px "Formula1"') &&
			document.fonts.check('900 16px "KH Interference F1"') &&
			Array.from(document.images).every((img) => img.complete && img.naturalWidth > 0)
	);

	const download = page.waitForEvent('download');
	await page.getByRole('button', { name: 'Copy' }).click();
	const path = await (await download).path();

	return readFile(path);
}
