<script lang="ts">
	import { createScene } from '$lib/setup/scene.js';
	import { onMount } from 'svelte';

	let container: HTMLElement;
	export let onSceneCreated: (scene: any) => void;

	// const { width, height } = $props();
	onMount(() => {
		const width = container.clientWidth;
		// Height should be full screen height minus 73
		const height = window.innerHeight - 73;
		const d = Math.min(width, height);
		const scene = createScene(container, { width: d, height: d });
		console.log('di', d);
		scene.animate();

		onSceneCreated(scene);
		return () => {
			scene.destroy();
		};
	});
</script>

<div class="w-full">
	<div bind:this={container}></div>
</div>
