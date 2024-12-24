<script>
	import { Color, DoubleSide, Matrix4, Mesh, MeshLambertMaterial, PlaneGeometry } from 'three';
	import { createScene } from '$lib/setup/scene.js';
	import { onMount } from 'svelte';

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

	/**
	 * @type {HTMLDivElement}
	 */
	var container;
	onMount(() => {
		const scene = createScene(container, { width: 300, height: 600 });
		scene.camera.setPos(10, 0, 0);
		scene.camera.threeCamera.setViewOffset(300, 900, 0, 0, 300, 600);

		async function setup() {
			scene.add(createMesh('#f5f2f2', -1, 0.9, 1));
			scene.add(createMesh('#f2d1a6', 0, 0.9, 1));
			scene.add(createMesh('#f5f2f2', 1, 0.2, 2));

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
		border: 1px solid grey;
		left: 300px;
		width: 300px;
	}
</style>
