import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	worker: {
		format: 'es'
	},
	build: {
		target: 'es2022'
	},
	optimizeDeps: {
		exclude: ['cubing'],
		esbuildOptions: {
			target: 'es2022'
		}
	}
});
