<script>
	import Scene from '../../components/Scene.svelte';
	import {
		CatmullRomCurve3,
		Group,
		Mesh,
		MeshBasicMaterial,
		MeshLambertMaterial,
		PlaneGeometry,
		Quaternion,
		SphereGeometry,
		Vector3
	} from 'three';

	function onSceneCreated(scene) {
		const objects = [];
		const material = new MeshBasicMaterial({ color: 0x00ff00 });
		const curve = new CatmullRomCurve3([
			new Vector3(-5, 0, 0),
			new Vector3(-2, 2, 0),
			new Vector3(2, -2, 0),
			new Vector3(5, 0, 0)
		]);

		for (let i = 0; i < 10; i++) {
			const geometry = new SphereGeometry(0.5, 32, 32);
			const mesh = new Mesh(geometry, material);
			objects.push(mesh);
		}
		const group = new Group();
		const numObjects = objects.length;

		for (let i = 0; i < numObjects; i++) {
			const t = i / (numObjects - 1); // Normalized position along the curve
			const point = curve.getPoint(t);
			const tangent = curve.getTangent(t);

			const object = objects[i];
			object.position.copy(point);

			// Align object to the tangent of the curve
			const axis = new Vector3(0, 1, 0); // Assuming objects are aligned to Y-axis
			const quaternion = new Quaternion().setFromUnitVectors(axis, tangent);
			object.quaternion.copy(quaternion);

			group.add(object);
		}

		// Add the group to the scene
		scene.add(group);
	}
</script>

<svelte:head>
	<title>Spine</title>
</svelte:head>

<h1>Spine</h1>
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
