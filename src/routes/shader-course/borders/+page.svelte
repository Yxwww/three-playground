<script lang="ts">
	import Scene from '../../../components/Scene.svelte';
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

	const textureLoader = new TextureLoader();
	
	function onSceneCreated(scene) {
		const material = new ShaderMaterial({
			uniforms: {},
			vertexShader,
			fragmentShader
		});
		const mesh = new Mesh(new PlaneGeometry(2, 2), material);
		scene.add(mesh);
	}
</script>

<svelte:head>
	<title>Shader Borders</title>
</svelte:head>

<h1>Shader Borders</h1>
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
