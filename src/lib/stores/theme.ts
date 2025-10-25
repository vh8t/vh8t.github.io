import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

const initialTheme: Theme = browser
	? ((localStorage.getItem('theme') as Theme) ?? 'system')
	: 'system';

export const theme = writable<Theme>(initialTheme);

const applyTheme = (mode: 'light' | 'dark') => {
	if (browser) {
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(mode);
	}
};

const getSystemTheme = (): 'light' | 'dark' => {
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

theme.subscribe((value) => {
	if (!browser) return;

	if (value === 'system') {
		const mode = getSystemTheme();
		applyTheme(mode);
		localStorage.setItem('theme', 'system');
	} else {
		applyTheme(value);
		localStorage.setItem('theme', value);
	}
});

if (browser) {
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
		let currentTheme: Theme;
		theme.subscribe((val) => (currentTheme = val))();

		if (currentTheme! === 'system') {
			const mode = e.matches ? 'dark' : 'light';
			applyTheme(mode);
		}
	});
}
