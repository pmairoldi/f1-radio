import { expect, test } from '@playwright/test';

test('can create a radio message', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1, name: 'F1 Radio Meme' })).toBeVisible();
});
