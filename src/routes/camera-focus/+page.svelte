<script lang="ts">
	import Scene from '../../components/Scene.svelte';
	import * as THREE from 'three';

	function onSceneCreated(scene) {
		// Create multiple objects to focus on
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		
		// Create cubes with different colors at different positions
		const cube1 = new THREE.Mesh(
			geometry,
			new THREE.MeshBasicMaterial({ color: 0xff0000 })
		);
		cube1.position.set(-3, 0, 0);
		scene.add(cube1);

		const cube2 = new THREE.Mesh(
			geometry,
			new THREE.MeshBasicMaterial({ color: 0x00ff00 })
		);
		cube2.position.set(0, 0, 0);
		scene.add(cube2);

		const cube3 = new THREE.Mesh(
			geometry,
			new THREE.MeshBasicMaterial({ color: 0x0000ff })
		);
		cube3.position.set(3, 0, 0);
		scene.add(cube3);

		// Camera focus logic
		const camera = scene.userData.camera;
		const controls = scene.userData.controls;
		
		// Focus on different cubes with smooth transitions
		let currentFocus = 0;
		const targets = [cube1, cube2, cube3];
		
		// Click handler to focus on objects
		scene.userData.renderer.domElement.addEventListener('click', (event) => {
			currentFocus = (currentFocus + 1) % targets.length;
			const target = targets[currentFocus];
			
			// Smoothly move camera to focus on target
			controls.target.copy(target.position);
			controls.update();
		});

		// Initial camera position
		camera.position.set(0, 3, 10);
		controls.target.set(0, 0, 0);
		controls.update();

		// Add visual hint
		console.log('Click on the canvas to focus camera on different cubes');
	}
</script>

<svelte:head>
	<title>Camera Focus</title>
</svelte:head>

<h1>Camera Focus</h1>
<p class="instruction">Click on the canvas to cycle camera focus between different objects</p>
<div class="minimal-card">
	<Scene {onSceneCreated} />
</div>

<style>
	.minimal-card {
		display: inline-block;
		margin: 1rem 1rem;
		width: 450px;
	}
	
	.instruction {
		color: #666;
		font-style: italic;
		margin-bottom: 0.5rem;
	}
</style>