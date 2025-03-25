<script>
	import Scene from '../../components/Scene.svelte';
	import {
		AdditiveBlending,
		BoxGeometry,
		CustomBlending,
		DoubleSide,
		Mesh,
		MeshLambertMaterial,
		NoBlending,
		PlaneGeometry
	} from 'three';

	function onSceneCreated(scene) {
		scene.camera.setPos(0, 0, 5);

		async function setup() {
			await scene.loadTexture('snoop_dogg.png').then((texture) => {
				const material = new MeshLambertMaterial({
					map: texture,
					transparent: true,
					opacity: 1,
					// depthTest: true,
					depthWrite: false,
					// blending: NoBlending,
					side: DoubleSide
				});
				const geometry = new PlaneGeometry(1.5, 1.5);
				const mesh = new Mesh(geometry, material);
				mesh.renderOrder = 1;
				mesh.position.setZ(0.6);
				mesh.rotateX(-Math.PI / 4);

				scene.add(mesh);
				console.log('second');
				scene.render();
			});

			await scene.loadTexture('tinyrick.png').then((texture) => {
				const material = new MeshLambertMaterial({
					map: texture,
					transparent: true,
					opacity: 1,
					// depthTest: true,
					side: DoubleSide
				});
				const geometry = new PlaneGeometry(1.5, 1.5);
				const mesh = new Mesh(geometry, material);
				mesh.renderOrder = 2;
				mesh.position.setZ(0.5);
				// mesh.rotateX(Math.PI/4)

				scene.add(mesh);
				console.log('first');
			});

			scene.animate();
		}

		setup();
	}
</script>

<svelte:head>
	<title>Blending</title>
</svelte:head>

<h1>Blending</h1>
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
