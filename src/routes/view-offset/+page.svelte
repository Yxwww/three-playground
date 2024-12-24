<script>
	import { onMount } from 'svelte';
	import { createScene } from '$lib/setup/scene';

	/**
	 * @type {HTMLDivElement}
	 */
	var container = $state();
	onMount(() => {
		createScene(container, { width: 800, height: 400 }).animate();
	});
</script>

<svelte:head>
	<title>Scene</title>
</svelte:head>

<h1>view offset</h1>
<div class="minimal-card">
	<div bind:this={container}></div>
</div>

<style>
	.text-center {
		text-align: center;
	}

	.minimals {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.minimal-card {
		display: inline-block;
		margin: 1rem 1rem;
		width: 800px;
		border: 1px solid grey;
	}
	h3 {
		margin: 0.25rem 0.25rem;
	}
</style>
