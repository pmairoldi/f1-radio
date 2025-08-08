/// <reference types="vitest" />
import { defineConfig } from 'vite';

import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [tailwindcss(), imagetools(), sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
