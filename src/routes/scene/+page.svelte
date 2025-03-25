<script lang="ts">
	import Scene from '../../components/Scene.svelte';

	function onSceneCreated(scene) {
		// Basic empty scene
	}
</script>

<svelte:head>
	<title>Scene</title>
</svelte:head>

<h1>Scene</h1>
<div class="minimal-card">
	<Scene {onSceneCreated} />
</div>

<style>
	.minimal-card {
		display: inline-block;
		margin: 1rem 1rem;
		width: 450px;
	}
</style>
