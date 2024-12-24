<script>
	import Nav from '../components/Nav.svelte';
	import { url } from '../utils/url';
	import '../global.css';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<Nav segment={$url?.pathname.slice(1)} />

<main>
	{@render children?.()}
</main>

<style>
	main {
		position: relative;
		background-color: white;
		padding: 2em;
		box-sizing: border-box;
	}
</style>
