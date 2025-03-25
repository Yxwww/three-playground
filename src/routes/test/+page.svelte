<script>
	import Scene from '../../components/Scene.svelte';

	function handleSceneCreated(event) {
		// Handle the sceneCreated event
		console.log('Scene created:', event);
	}
</script>

<Scene onSceneCreated={handleSceneCreated}></Scene>
