<script lang="ts">
	import { AxesHelper } from '$lib/setup/axesHelper';
	import { createScene } from '$lib/setup/scene.js';
	import { onMount } from 'svelte';
	import {
		BatchedMesh,
		Matrix4,
		Mesh,
		MeshBasicMaterial,
		PlaneGeometry,
		TextureLoader
	} from 'three';
	import { GeometryUtils } from 'three/examples/jsm/Addons.js';

	let container: HTMLElement;
	const textureLoader = new TextureLoader();
	onMount(() => {
		const scene = createScene(container, { width: 400, height: 400 });
		scene.animate();
		const material = new MeshBasicMaterial({ color: 0xffffff });
		const geometry1 = new PlaneGeometry(1, 1);
		const geometry2 = new PlaneGeometry(0.5, 2);
		// const mesh = new Mesh(new PlaneGeometry(1, 1), material);
		const batchedMesh = new BatchedMesh(10, 5000, 10000, material);
		const boxGeometryId = batchedMesh.addGeometry(geometry1);
		const boxGeoemtryId2 = batchedMesh.addGeometry(geometry2);
		// create instances of those geometries
		const boxInstancedId1 = batchedMesh.addInstance(boxGeometryId);
		const boxInstancedId2 = batchedMesh.addInstance(boxGeoemtryId2);
		// position the geometries
		const boxMatrix1 = new Matrix4().makeTranslation(0, 2, 0);
		const boxMatrix2 = new Matrix4().makeTranslation(0, 0, 0);
		console.log(geometry1);
		batchedMesh.setMatrixAt(boxInstancedId1, boxMatrix1);
		batchedMesh.setMatrixAt(boxInstancedId2, boxMatrix2);

		textureLoader.load('https://threejs.org/examples/textures/uv_grid_opengl.jpg', (texture) => {
			material.map = texture;
			material.needsUpdate = true;
		});
		scene.add(batchedMesh);
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
