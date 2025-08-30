/// <reference types="vitest" />
import { defineConfig } from 'vite';

import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import tailwindcss from '@tailwindcss/vite';
import { paraglideVitePlugin as paraglide } from '@inlang/paraglide-js';

export default defineConfig({
	plugins: [
		paraglide({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url', 'cookie', 'baseLocale']
		}),
		tailwindcss(),
		imagetools(),
		sveltekit()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
