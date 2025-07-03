<script>
	import {
		Points,
		BufferGeometry,
		Float32BufferAttribute,
		Uint8BufferAttribute,
		TextureLoader,
		PointsMaterial,
		ShaderMaterial,
		RawShaderMaterial,
		DoubleSide
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
		const color = [];

		const sprite = new TextureLoader().load('textures/disc.png');

		for (let i = 0; i < 100; i++) {
			const x = 100 * Math.random();
			const y = 100 * Math.random();
			const z = 100 * Math.random();

			vertices.push(x, y, z);

			color.push(255 * Math.random());
			color.push(255 * Math.random());
			color.push(255 * Math.random());
			color.push(255 * Math.random());
		}

		geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
		geometry.setAttribute('color', new Uint8BufferAttribute(color, 4));
		console.log('geometry', geometry);

		// @type any
		const material = new RawShaderMaterial({
			vertexShader: document.getElementById('vertexShader')?.textContent,
			fragmentShader: document.getElementById('fragmentShader')?.textContent,
			side: DoubleSide,
			transparent: true
		});

		const particles = new Points(geometry, material);
		scene.add(particles);
		scene.animate();
	});
</script>

<div class="minimal-card">
	<div bind:this={container}></div>
</div>

<h1>VertexShader</h1>
<pre id="vertexShader">
	{`
			precision mediump float;
			precision mediump int;

			uniform mat4 modelViewMatrix; // optional
			uniform mat4 projectionMatrix; // optional

			attribute vec3 position;
			attribute vec4 color;

			varying vec3 vPosition;
			varying vec4 vColor;

			void main()	{

				vPosition = position;
				vColor = color;

				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				gl_PointSize = 10.0;
			}
	`}
	</pre>
<h1>Fragment Shader</h1>
<pre id="fragmentShader">
	{`
		

			precision mediump float;
			precision mediump int;


			varying vec3 vPosition;
			varying vec4 vColor;

			void main()	{

				vec4 color = vec4( vColor.x / 255.0, vColor.y / 255.0,vColor.z / 255.0,vColor.a / 255.0 );

				gl_FragColor = color;

			}
		`}

	</pre>

<style></style>
