import { derived, writable, readable } from 'svelte/store';

export function createUrlReadable(ssrUrl?: any) {
	// Ideally a bundler constant so that it's tree-shakable
	if (typeof window === 'undefined') {
		const { subscribe } = readable(ssrUrl);
		return { subscribe };
	}

	const href = writable(window.location.href);

	const originalPushState = history.pushState;
	const originalReplaceState = history.replaceState;

	const updateHref = () => href.set(window.location.href);

	history.pushState = function () {
		originalPushState.apply(this, arguments as any);
		updateHref();
	};

	history.replaceState = function () {
		originalReplaceState.apply(this, arguments as any);
		updateHref();
	};

	window.addEventListener('popstate', updateHref);
	window.addEventListener('hashchange', updateHref);

	return {
		subscribe: derived(href, ($href) => new URL($href)).subscribe
	};
}

const url = createUrlReadable();
export { url };
