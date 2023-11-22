<script>
	import { AdditiveBlending, BoxGeometry, CustomBlending, DoubleSide, Mesh, MeshLambertMaterial, NoBlending, PlaneGeometry } from 'three';
	import { createScene } from '../../setup/scene.js';
	import { onMount } from 'svelte';

	/**
	 * @type {HTMLDivElement}
	 */
	var container;
	onMount(() => {
		const scene = createScene(container, { width: 900, height: 700 });
		scene.camera.setPos(0, 0, 5);

		async function setup() {
			await scene.loadTexture('snoop_dogg.png').then((texture) => {
				const material = new MeshLambertMaterial({
					map: texture,
					transparent: true,
					opacity: 1,
          // blending: NoBlending,
					side: DoubleSide,
				});
				const geometry = new PlaneGeometry(1.5, 1.5);
				const mesh = new Mesh(geometry, material);
				mesh.position.setZ(1);
				    mesh.rotateX(-Math.PI/4)

				scene.add(mesh);
				console.log('second');
        scene.render()
			});

			await scene.loadTexture('tinyrick.png').then((texture) => {
				const material = new MeshLambertMaterial({
					map: texture,
					transparent: true,
					opacity: 1,
					side: DoubleSide
				});
				const geometry = new PlaneGeometry(1.5, 1.5);
				const mesh = new Mesh(geometry, material);
				mesh.position.setZ(1);
        mesh.rotateX(Math.PI/4)

				scene.add(mesh);
				console.log('first');
			});

			scene.animate();
		}

		setup();
	});
</script>

<svelte:head>
	<title>Scene</title>
</svelte:head>

<h1>Scene</h1>
<div class="minimal-card">
	<div bind:this={container} />
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
