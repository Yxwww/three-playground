<script>
	import {
		Color,
		Material,
		Mesh,
		MeshBasicMaterial,
		MeshPhongMaterial,
		MeshLambertMaterial,
		PlaneGeometry,
		Vector3,
		BufferGeometry,
		Line,
		LineBasicMaterial,
		Vector2,
		Box3
	} from 'three';
	import * as THREE from 'three';
	import { createScene } from '$lib/setup/scene.js';
	import { onMount } from 'svelte';

	var container = $state();
	let scene;
	let bottomMesh, topMesh;
	let currentOffset = 0;

	onMount(() => {
		scene = createScene(container, { width: 1200, height: 1200 });
		const threeScene = scene.getThreeScene();
		const camera = scene.camera.threeCamera;
		console.log('scene', threeScene);
		threeScene.background = new Color('black');

		bottomMesh = new Mesh(
			new THREE.BoxGeometry(2, 2, 0.2),
			new MeshPhongMaterial({
				color: 'red'
			})
		);
		scene.add(bottomMesh);

		topMesh = new Mesh(
			new THREE.BoxGeometry(2, 2, 0.2),
			new THREE.MeshPhongMaterial({
				color: 'yellow'
			})
		);
		topMesh.position.z = 1;
		scene.add(topMesh);

		// Add to GUI
		const gui = scene.getGui();

		// Add UI control for offset
		gui
			.add(
				{
					offset: () => {
						// const offset = offsetZToNotOverlap(camera, scene, bottomMesh, topMesh);
						// console.log('found offset', offset);
					}
				},
				'offset'
			)
			.name('Apply Non-overlapping Offset');

		// Add button to reset positions
		gui
			.add(
				{
					reset: () => {
						topMesh.position.z = 1; // Reset to original position
						currentOffset = 0;
						console.log('Reset position of top mesh');
					}
				},
				'reset'
			)
			.name('Reset Position');

		scene.animate();
	});
</script>

<svelte:head>
	<title>Overlap Detection</title>
</svelte:head>

<h1>Overlap Detection</h1>
<div class="minimal-card">
	<div bind:this={container}></div>
</div>

<style>
	.minimal-card {
		display: inline-block;
		margin: 1rem 1rem;
		width: 1200px;
	}
</style>
