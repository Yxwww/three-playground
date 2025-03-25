<script lang="ts">
	import Scene from '../../components/Scene.svelte';

	let min = Infinity,
		max = 0,
		fps = 0,
		fCount = 0,
		felapse = 0,
		average = 0;

	function onSceneCreated(scene) {
		// The scene is already set up for animation in the Scene component
	}
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
			<li>
				Will be faster than actual framerate since RAF happens before frame is ready to paint/render
			</li>
		</ul>
	</li>
</ul>
<div class="minimal-card">
	<Scene {onSceneCreated} />
</div>

<style>
	.minimal-card {
		display: inline-block;
		margin: 1rem 1rem;
		width: 450px;
	}
	h3 {
		margin: 0.25rem 0.25rem;
	}
</style>
