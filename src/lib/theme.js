import { writable } from 'svelte/store';

const THEME_STORAGE_KEY = 'playground-theme-preference';

// Theme store: 'light', 'dark', or 'system'
export const theme = writable(
	typeof localStorage !== 'undefined'
		? localStorage.getItem(THEME_STORAGE_KEY) || 'system'
		: 'system'
);

// Get effective theme (resolves 'system' to either 'light' or 'dark')
export function getEffectiveTheme(preference) {
	if (preference === 'system') {
		return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	}
	return preference;
}

// Function to set theme
export function setTheme(value) {
	if (typeof window === 'undefined') return;

	theme.set(value);
	localStorage.setItem(THEME_STORAGE_KEY, value);

	applyTheme(value);
}

// Apply theme to document
export function applyTheme(preference) {
	if (typeof window === 'undefined') return;

	const effectiveTheme = getEffectiveTheme(preference);

	if (effectiveTheme === 'dark') {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
}

// Initialize theme on load
export function initTheme() {
	if (typeof window === 'undefined') return;

	// Setup system preference listener
	const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

	// Listen for system theme changes
	mediaQuery.addEventListener('change', () => {
		const currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'system';
		if (currentTheme === 'system') {
			applyTheme('system');
		}
	});

	// Apply initial theme
	const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'system';
	theme.set(savedTheme);
	applyTheme(savedTheme);
}

