import { sveltekit } from '@sveltejs/kit/vite';
import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), glsl()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
