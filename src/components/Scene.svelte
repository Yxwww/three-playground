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

		const handleResize = () => {
			const newWidth = container.clientWidth;
			const newHeight = container.clientHeight;

			scene.renderer.setSize(newWidth, newHeight);
			scene.camera.threeCamera.aspect = newWidth / newHeight;
			scene.camera.threeCamera.updateProjectionMatrix();
			scene.render();
		};

		const resizeObserver = new ResizeObserver(handleResize);
		resizeObserver.observe(container);

		return () => {
			resizeObserver.disconnect();
			scene.destory();
		};
	});
</script>

<div class="h-full w-full">
	<div bind:this={container} class="h-full w-full"></div>
</div>
