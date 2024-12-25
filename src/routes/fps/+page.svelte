<script>
	import { createScene } from '$lib/setup/scene.js';
	import { onMount } from 'svelte';

	let min = Infinity, max = 0, fps = 0, fCount = 0, felapse = 0, average = 0;

	/**
	 * @type {HTMLDivElement}
	 */
	var container = $state();
	onMount(() => {
		const {animate, onRender} = createScene(container, { width: 400, height: 400 });
		animate();
	});
</script>

<svelte:head>
	<title>FPS</title>
</svelte:head>

<h1>FPS</h1>
<p>Min: {min} , average: {average}</p>
<ul>
	<li>handles losing focus well</li>
	<li>
		relies on RAF
		<ul>
			<li>Will be faster than actualy framerate since RAF happens before frame is ready to paint/render</li>
		</ul>
	</li>
</ul>
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
		width: 450px;
	}
	h3 {
		margin: 0.25rem 0.25rem;
	}
</style>
