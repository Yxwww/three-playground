<script>
	import { BoxGeometry, DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry, Vector3 } from 'three';
	import { createScene } from '$lib/setup/scene.js';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const width = 400;
	const height = 400;

	let target = writable([0, 0]);
	/**
	 * @type {HTMLDivElement}
	 */
	var container = $state();
	/**
	 * @type {HTMLDivElement}
	 */
	var plot2d = $state();
	onMount(() => {
		const scene = createScene(container, {
			axesLength: 100,
			enableAxesHelper: false,
			width,
			height,
			camera: { near: 0.1, far: 500, pos: [100, 100, 100] }
		});

		scene.animate();

		const planeX = 30;
		// scene.camera.lookAt(planeX, 0, 0);

		scene.camera.setPos(31.190729018597295, 74.04532033923024, 62.277138684464745);
		scene.camera.target(29.754824688929467, 0, -12.823082843427418);
		scene.animate();

		const geometry = new PlaneGeometry(100, 50);
		geometry.rotateX(Math.PI / 2);
		const material = new MeshBasicMaterial({ color: 0xffff00, side: DoubleSide, wireframe: true });
		const plane = new Mesh(geometry, material);
		plane.position.x = planeX;
		scene.add(plane);

		window.plane = plane;
		window.controls = scene.camera.controls;
		window.camera = scene.camera.threeCamera;
		scene.onRender(() => {
			const vector = new Vector3(planeX, 0, 0).project(scene.camera.threeCamera);
			const x = ((vector.x + 1) * width) / 2;
			const y = (-(vector.y - 1) * height) / 2;
			target.update((cur) => {
				const [cx, cy] = cur;
				if (cx == x && cy == y) {
					return cur;
				} else {
					return [x, y];
				}
			});
		});
	});

	export const ssr = false;
</script>

<svelte:head>
	<title>Scene</title>
</svelte:head>

<div class="minimal-card">
	<div class="plot-container" bind:this={container}></div>
	<div class="plot2d" bind:this={plot2d}>
		<div class="plane-center-2d" style={` top: ${$target[1] - 5}px; left: ${$target[0] - 5}px;`}></div>
	</div>
</div>

<style>
	.plane-center-2d {
		width: 10px;
		height: 10px;
		background-color: red;
		position: absolute;
	}

	.plot2d {
		width: 400px;
		height: 400px;
		top: 0;
		left: 0;
		position: absolute;
		pointer-events: none;
	}

	.plot-container {
		width: 400px;
		height: 400px;
	}

	.text-center {
		text-align: center;
	}

	.minimals {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.minimal-card {
		width: 400px;
		height: 400px;
		position: relative;
		display: inline-block;
		margin: 1rem 1rem;
	}

	h3 {
		margin: 0.25rem 0.25rem;
	}
</style>
