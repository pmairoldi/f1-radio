import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [imagetools(), sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
