<script lang="ts">
	import { mountPlayground } from '$lib/playground';
	import { onMount } from 'svelte';

	let container: HTMLElement;
	export let onSceneCreated: (scene: any) => void;

	// const { width, height } = $props();
	onMount(() => {
		const width = container.clientWidth;
		// Height should be full screen height minus 73
		const height = window.innerHeight - 73;
		// const d = Math.min(width, height);
		const scene = mountPlayground(container, { width, height });
		scene.animate();

		onSceneCreated(scene);
    console.log('Scene created with dimensions:', scene);
		return () => {
			scene.destory();
		};
	});
</script>

<div class="w-full h-full">
	<div bind:this={container} class="w-full h-full"></div>
</div>
