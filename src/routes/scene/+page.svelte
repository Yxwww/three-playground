<script>
	import { createScene } from '../../setup/scene.js';
	import { onMount } from 'svelte';

	var container;
	onMount(() => {
		createScene(container, { width: 400, height: 400 }).animate();
	});
</script>

<h1>Scene</h1>
<div class="minimal-card">
	<div bind:this={container} />
</div>

<svelte:head>
	<title>Scene</title>
</svelte:head>

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
		width: 450px;
	}
	h3 {
		margin: 0.25rem 0.25rem;
	}
</style>
