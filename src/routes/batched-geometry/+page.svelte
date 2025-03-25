<script lang="ts">
	import Scene from '../../components/Scene.svelte';
	import {
		BatchedMesh,
		Matrix4,
		Mesh,
		MeshBasicMaterial,
		PlaneGeometry,
		TextureLoader
	} from 'three';
	import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
	const textureLoader = new TextureLoader();
	
	function onSceneCreated(scene) {
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

		// Create a slightly distorted plane
		const width = 1.5,
			height = 1.2;
		const widthSegments = 4,
			heightSegments = 4;
		const irregularPlaneGeometry = new PlaneGeometry(width, height, widthSegments, heightSegments);
		const positions = irregularPlaneGeometry.attributes.position;

		// Distort the vertices slightly for an irregular shape
		for (let i = 0; i < positions.count; i++) {
			const x = positions.getX(i);
			const y = positions.getY(i);
			const z = positions.getZ(i);

			// Add some random distortion to create an irregular shape
			positions.setX(i, x + (Math.random() - 0.5) * 0.2);
			positions.setY(i, y + (Math.random() - 0.5) * 0.2);
		}

		// Update the geometry
		irregularPlaneGeometry.computeVertexNormals();
		const gui = new GUI();
		material.wireframe = false;
		const materialFolder = gui.addFolder('Material');
		materialFolder.add(material, 'wireframe').name('Wireframe');
		const irregularPlaneMesh = new Mesh(irregularPlaneGeometry, material);
		irregularPlaneMesh.rotateZ(Math.PI / 4);
		irregularPlaneMesh.position.set(2, 0, 0);

		const uvs = irregularPlaneGeometry.attributes.uv;

		// Rotate UVs around center (0.5, 0.5)
		const angle = Math.PI / 4; // 45 degrees
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);

		for (let i = 0; i < uvs.count; i++) {
			const u = uvs.getX(i) - 0.5;
			const v = uvs.getY(i) - 0.5;

			// Apply rotation
			uvs.setX(i, u * cos - v * sin + 0.5);
			uvs.setY(i, u * sin + v * cos + 0.5);
		}

		// Mark the attribute for update
		uvs.needsUpdate = true;

		scene.add(irregularPlaneMesh);
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
