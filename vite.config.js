import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ command }) => ({
	plugins: command === 'test' ? [] : [sveltekit(), glsl(), tailwindcss()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		setupFiles: ['src/setupTests.js']
	},
	ssr: {
		noExternal: ['flowbite-svelte']
	}
}));
