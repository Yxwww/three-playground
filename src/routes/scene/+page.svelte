<script>
	import { MeshLambertMaterial, PlaneGeometry } from 'three';
	// import { createScene } from '../../setup/scene.js';
	import { createScene } from '$lib/setup/scene.js';
	import { onMount } from 'svelte';

	var container = $state();
	onMount(() => {
		const scene = createScene(container, { width: 400, height: 400 }).animate();
	});
</script>

<svelte:head>
	<title>Scene</title>
</svelte:head>

<h1>Scene</h1>
<div class="minimal-card">
	<div bind:this={container}></div>
</div>

<style>
	.minimal-card {
		display: inline-block;
		margin: 1rem 1rem;
		width: 450px;
	}
</style>
