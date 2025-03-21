<script lang="ts">
	import { createScene } from '$lib/setup/scene.js';
	import { onMount } from 'svelte';
	import vertexShader from './vertex.glsl';
	import fragmentShader from './frag.glsl';
	import {
		BufferAttribute,
		BufferGeometry,
		Color,
		DoubleSide,
		Mesh,
		MeshBasicMaterial,
		PlaneGeometry,
		ShaderMaterial,
		TextureLoader,
		Vector4
	} from 'three';
	import { texture } from 'three/tsl';

	let container: HTMLElement;
	const textureLoader = new TextureLoader();
	onMount(() => {
		const scene = createScene(container, { width: 800, height: 800 });
		// scene.getThreeScene().background = new Color(0x000000);
		scene.animate();

		const tint = new Vector4(1, 0, 0);
		const material = new ShaderMaterial({
			uniforms: {
				diffuse: { value: null },
				tint: { value: tint },
				overlay: { value: null }
			},
			vertexShader,
			fragmentShader
		});
		const mesh = new Mesh(new PlaneGeometry(2, 2), material);
		textureLoader.load('/images/tiny-rick-square.png', (texture) => {
			material.uniforms.diffuse = { value: texture };
			material.needsUpdate = true;
		});
		textureLoader.load('/textures/transparent.png', (texture) => {
			material.uniforms.overlay = { value: texture };
			material.needsUpdate = true;
		});

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
