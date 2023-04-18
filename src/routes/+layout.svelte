<script>
	import Nav from '../components/Nav.svelte';
	import { url } from '../utils/url';
	import '../global.css';
</script>

<Nav segment={$url?.pathname.slice(1)} />

<main>
	<slot />
</main>

<style>
	main {
		position: relative;
		background-color: white;
		padding: 2em;
		box-sizing: border-box;
	}
</style>
