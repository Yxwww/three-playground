<script>
	import Scene from '../../../components/Scene.svelte';
	import {
		AdditiveBlending,
		BoxGeometry,
		Color,
		CustomBlending,
		DoubleSide,
		Matrix4,
		Mesh,
		MeshLambertMaterial,
		NoBlending,
		PlaneGeometry
	} from 'three';

	function onSceneCreated(scene) {
		scene.camera.controls.position0.setZ(2);

		function createMesh(color, offset, opacity, renderOrder) {
			console.log('createmesh')
			const material1 = new MeshLambertMaterial({
				transparent: true,
				opacity: opacity,
				color: new Color(color),
				side: DoubleSide
			});
			const geometry1 = new PlaneGeometry(1.5, 1.5);
			const mesh1 = new Mesh(geometry1, material1);
			mesh1.renderOrder = renderOrder;

			// mesh1.position.setZ(offset);
			mesh1.geometry.applyMatrix4(new Matrix4().makeTranslation(0, 0, offset));

			return mesh1;
		}

		async function setup() {
			scene.add(createMesh('#f5f2f2', -1, 0.9, 1));
			scene.add(createMesh('#f2d1a6', 0, 0.9, 1));
			scene.add(createMesh('#f5f2f2', 1, 0.2, 2));
		}

		setup();
	}
</script>

<svelte:head>
	<title>Transparency Blending</title>
</svelte:head>

<h1>Transparency Blending</h1>
<div class="minimal-card">
	<Scene {onSceneCreated} />
</div>

<style>
	.minimals {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.minimal-card {
		display: inline-block;
		margin: 1rem 1rem;
		width: 900px;
	}
</style>
