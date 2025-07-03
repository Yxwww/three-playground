<script>
	import {
		Points,
		BufferGeometry,
		Float32BufferAttribute,
		TextureLoader,
		PointsMaterial
	} from 'three';
	import { onMount } from 'svelte';
	import { mountPlayground } from '$lib/playground';

	/** @type {HTMLDivElement} */
	var container = $state();
	onMount(() => {
		const scene = mountPlayground(container, {
			axesLength: 100,
			width: 400,
			height: 400,
			camera: { near: 0.1, far: 500, pos: [100, 100, 100] }
		});
		const geometry = new BufferGeometry();
		const vertices = [];

		const sprite = new TextureLoader().load('textures/disc.png');

		for (let i = 0; i < 100; i++) {
			const x = 100 * Math.random();
			const y = 100 * Math.random();
			const z = 100 * Math.random();

			vertices.push(x, y, z);
		}

		geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

		const material = new PointsMaterial({
			size: 100,
			sizeAttenuation: false,
			map: sprite,
			alphaTest: 0.5,
			transparent: true
		});
		material.color.setHSL(1.0, 0.3, 0.7);

		const particles = new Points(geometry, material);
		scene.add(particles);
		scene.animate();
	});
</script>

<div class="minimal-card">
	<div bind:this={container}></div>
</div>

<style>
	.text-center {
		text-align: center;
	}

	.minimals {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.minimal-card {
		display: inline-block;
		margin: 1rem 1rem;
		width: 450px;
	}
	h3 {
		margin: 0.25rem 0.25rem;
	}
</style>
