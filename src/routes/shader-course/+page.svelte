<script lang="ts">
	import { createScene } from '$lib/setup/scene.js';
	import { onMount } from 'svelte';
	import vertexShader from './vertex.glsl';
	import fragmentShader from './frag.glsl';
	import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry, ShaderMaterial } from 'three';

	let container: HTMLElement;
	onMount(() => {
		const scene = createScene(container, { width: 800, height: 800 });
		scene.animate();

		const material = new ShaderMaterial({
			uniforms: {},
			vertexShader,
			fragmentShader
		});
		const mesh = new Mesh(
			new PlaneGeometry(1, 1),
			material
			// new MeshBasicMaterial({
			// 	color: 0xff0000,
			// 	side: DoubleSide
			// })
		);
		scene.add(mesh);
	});
</script>

<svelte:head>
	<title>Scene</title>
</svelte:head>

<h1>Scene</h1>
<div class="minimal-card">
	<div bind:this={container}></div>
</div>

<style>
	.minimal-card {
		display: inline-block;
		margin: 1rem 1rem;
		width: 450px;
	}
</style>
