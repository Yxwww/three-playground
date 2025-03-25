<script>
	import Scene from '../../components/Scene.svelte';
	import Billboard from '../../components/points/billboard.svelte';
	import ShaderExample from '../../components/points/shader.svelte';

	function onSceneCreated(scene) {
		// Add your scene setup here
	}
</script>

<svelte:head>
	<title>Points</title>
</svelte:head>

<h1>Points</h1>
<Scene {onSceneCreated} />
<!-- <Billboard /> -->
<ShaderExample />
