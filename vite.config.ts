import { sveltekit } from '@sveltejs/kit/vite';
import { readFileSync } from 'fs';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), rawFonts('.woff')],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

function rawFonts(...ext: string[]) {
	return {
		name: 'vite-plugin-raw-fonts',
		resolveId(id: string) {
			return ext.some((e) => id.endsWith(e)) ? id : null;
		},
		transform(_code: string, id: string) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = readFileSync(id);
				return { code: `export default ${JSON.stringify(buffer)}`, map: null };
			}
		}
	};
}
