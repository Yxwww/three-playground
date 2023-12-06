<script>
	import { createScene } from '$lib/setup/scene.js';
	import { onMount } from 'svelte';
	// const maxInscribedCircle = require('max-inscribed-circle/dist/max-inscribed-circle.es5.min.js');
	import maxInscribedCircle from 'max-inscribed-circle';
	import {
		BufferAttribute,
		BufferGeometry,
		CircleGeometry,
		DoubleSide,
		Mesh,
		MeshBasicMaterial,
		PlaneGeometry,
		RepeatWrapping,
		TextureLoader,
		UVMapping,
		Vector2
	} from 'three';
	const ALDO_LOGO_URL = '/images/tiny-rick-square.png';
	const loader = new TextureLoader();

	/**
	 * @type {HTMLDivElement}
	 */
	var container;
	onMount(() => {
		const scene = createScene(container, { width: 600, height: 600 });
		scene.camera.setPos(1.5, 1, 10);
		scene.camera.target(1.5, 1, 0);
		// prettier-ignore
		const POLYGON_COORDINAES = [
			[0,0],
			[1, 0],
			[1,1.5],
			[2, 1.5],
			[2, 2],
			[1,2],
			[0, 2],
			[0, 0]
		]
		const POLYGON = {
			type: 'Feature',
			geometry: {
				type: 'Polygon',
				coordinates: [[
					[
						177.0400399999994,
						59.92162300000018
					],
					[
						19.870672999999897,
						0
					],
					[
						0,
						51.79149600000028
					],
					[
						157.04003999999986,
						111.87157500000012
					],
					[
						177.0400399999994,
						59.92162300000018
					]
				]]
			},
			properties: {
				id: 1
			}
		};

		console.log('maxInscribedCircle', maxInscribedCircle(POLYGON));
		const circleFeature = maxInscribedCircle(POLYGON);
		const {
			geometry: {
				coordinates: [circleX, circleY]
			},
			properties: { radius }
		} = circleFeature;

		console.log('circle', [circleX, circleY]);
		const circleMesh = new Mesh(
			new CircleGeometry(1, 32),
			new MeshBasicMaterial({ color: 0xffff00 })
		);
		circleMesh.scale.setX(radius)
		circleMesh.scale.setY(radius)
		circleMesh.position.setX(circleX);
		circleMesh.position.setY(circleY);
		circleMesh.position.setZ(0.01);
		loader.load(ALDO_LOGO_URL, (t) => {
			t.mapping = UVMapping;
			t.wrapS = RepeatWrapping;
			t.wrapT = RepeatWrapping;
			const material = new MeshBasicMaterial({
				map: t,
				side: DoubleSide
			});
			circleMesh.material = material;
		});
		scene.add(circleMesh);
		// cosnt createbufferGeometryExample()
		const mesh = createbufferGeometryMesh();
		scene.add(mesh);

		scene.animate();
	});

	function createbufferGeometryMesh() {
		const geometry = new BufferGeometry();

		// prettier-ignore
		const vertices = new Float32Array([
			0, 0, 0, // v0
			1, 2, 0, // v1
			0, 2, 0, // v2
			1, 0, 0,

			2, 2, 0, // 4
			2, 1.5, 0, // 5
			1, 1.5, 0 // 6

		]);

		// prettier-ignore
		// const UV = new Float32Array([
		// 	0, 0,
		// 	1, 1,
		// 	0, 1,
		// 	1, 0,
		//
		// 	0, 0,
		// 	0, 0,
		// 	0, 0
		// ]);

		// prettier-ignore
		const indices = [
			0, 1, 2,
			0, 3, 1,
			2, 5, 4,
			6, 5, 2
		];

		geometry.setIndex(indices);
		geometry.setAttribute('position', new BufferAttribute(vertices, 3));
		// geometry.setAttribute('uv', new BufferAttribute(UV, 2));

		const material = new MeshBasicMaterial({ color: 0x00b7eb });

		const mesh = new Mesh(geometry, material);

		material.side = DoubleSide;

		return mesh;
	}
</script>

<svelte:head>
	<title>Max Inscribed Circle</title>
</svelte:head>

<h1>Scene</h1>
<div class="minimal-card">
	<div bind:this={container} />
</div>
<img src="/images/tiny-rick-square.png" width="200" />

<style>
	.minimal-card {
		display: inline-block;
		margin: 1rem 1rem;
		width: 600px;
		border: 1px solid red;
		box-sizing: border-box;
	}
</style>
