<script lang="ts">
	import { createScene } from '$lib/setup/scene.js';
	import { onMount } from 'svelte';
	import {
		ExtrudeGeometry,
		Mesh,
		MeshBasicMaterial,
		PlaneGeometry,
		RepeatWrapping,
		Shape,
		TextureLoader
	} from 'three';

	let container: HTMLElement;
	const textureloader = new TextureLoader();
	onMount(() => {
		const scene = createScene(container, { width: 1000, height: 1000 });
		scene.animate();

		// Create a store-like shape for a mall
		const storeShape = new Shape();
		// Start point - front entrance
		storeShape.moveTo(0, 0);
		// Front wall with entrance
		storeShape.lineTo(10, 0);
		storeShape.lineTo(10, -2);
		storeShape.lineTo(15, -2);
		storeShape.lineTo(15, 0);
		storeShape.lineTo(25, 0);
		// Right wall
		storeShape.lineTo(25, 15);
		// Back wall
		storeShape.lineTo(0, 15);
		// Close the shape
		storeShape.lineTo(0, 0);

		// Define extrude settings
		const extrudeSettings = {
			depth: 2,
			// bevelEnabled: true,
			// bevelSegments: 2,
			// bevelSize: 0.2,
			bevelThickness: 0.2
		};
		const extruded = new ExtrudeGeometry(storeShape, extrudeSettings);

		const material = new MeshBasicMaterial({ wireframe: false });
		const mesh = new Mesh(extruded, material);

		mesh.scale.set(0.5, 0.5, 0.5);
		scene.add(mesh);

		const material2 = new MeshBasicMaterial({});
		const plane = new Mesh(new PlaneGeometry(10, 10), material2);
		plane.position.x = 20;

		scene.add(plane);

		textureloader.load('https://threejs.org/examples/textures/uv_grid_opengl.jpg', (texture) => {
			texture.repeat.set(2, 2);
			texture.wrapS = texture.wrapT = RepeatWrapping;

			material.map = texture;
			material.needsUpdate = true;

			material2.map = texture;
			material2.needsUpdate = true;
		});
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
