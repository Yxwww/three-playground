<script lang="ts">
	import { Color, DoubleSide, Matrix4, Mesh, MeshLambertMaterial, PlaneGeometry } from 'three';
	import Scene from '../../components/Scene.svelte';

	function createMesh(color, offset, opacity, renderOrder) {
		const material1 = new MeshLambertMaterial({
			transparent: true,
			opacity: opacity,
			color: new Color(color),
			side: DoubleSide
		});
		const geometry1 = new PlaneGeometry(1.5, 1.5);
		const mesh1 = new Mesh(geometry1, material1);
		mesh1.renderOrder = renderOrder;

		mesh1.position.setZ(offset);

		return mesh1;
	}

	function onSceneCrated(scene) {
		scene.camera.setPos(5, 5, 5);
		scene.camera.threeCamera.setViewOffset(300, 900, 0, 0, 300, 600);
		scene.camera.threeCamera.updateProjectionMatrix();
		// scene.camera.target(0,0,3);

		async function setup() {
			scene.add(createMesh('#f5f2f2', -1, 0.9, 1));
			scene.add(createMesh('#f2d1a6', 0, 0.9, 1));
			scene.add(createMesh('#f5f2f2', 1, 0.2, 2));

			scene.animate();
		}

		setup();
	}
</script>

<svelte:head>
	<title>Scene</title>
</svelte:head>

<Scene onSceneCreated={onSceneCrated}></Scene>
