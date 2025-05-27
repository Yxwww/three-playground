<script>
	import { mountPlayground } from '$lib/playground';
	import polylabel from 'polylabel';
	import { onMount } from 'svelte';
	// const maxInscribedCircle = require('max-inscribed-circle/dist/max-inscribed-circle.es5.min.js');
	// import maxInscribedCircle from 'max-inscribed-circle';
	// import * as THREE from 'three';
	import {
		BufferAttribute,
		BufferGeometry,
		CircleGeometry,
		DoubleSide,
		ExtrudeGeometry,
		MathUtils,
		Mesh,
		MeshBasicMaterial,
		Plane,
		PlaneGeometry,
		PlaneHelper,
		RepeatWrapping,
		Shape,
		TextureLoader,
		UVMapping,
		Vector2,
		Vector3
	} from 'three';
	const ALDO_LOGO_URL = '/images/tiny-rick-square.png';
	const loader = new TextureLoader();

	function createMaxInscribed(polygons) {
		const result = polylabel([polygons], 1.0, true);
		console.log('result', result);
		// console.log({ circleX, circleY, radius }, result)
		const { 0: circleX, 1: circleY, distance: radius } = result;
		// console.log('circleFeature', {circleFeature, polygons})
		// const {
		// 	geometry: {
		// 		coordinates: [circleX, circleY]
		// 	},
		// 	properties: { radius }
		// } = circleFeature;

		// const revertNormalize = reverseNormalizePoints([[circleX, circleY]], minmax);
		// console.log('circle', [circleX, circleY]);
		const circleMesh = new Mesh(
			new CircleGeometry(1, 32),
			new MeshBasicMaterial({ color: 0xffff00 })
		);
		circleMesh.scale.setX(radius);
		circleMesh.scale.setY(radius);
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
			material.opacity = 1;
			circleMesh.material = material;
		});
		return circleMesh;
	}

	/**
	 * @type {HTMLDivElement}
	 */
	var container = $state();

	/**
	 * @param {Vector3} vec
	 */
	function createPoint(vec = new Vector3(), color = 0xff0000) {
		const circleMesh = new Mesh(new CircleGeometry(1, 16), new MeshBasicMaterial({ color }));
		const { x, y, z } = vec;
		circleMesh.position.setX(x);
		circleMesh.position.setY(y);
		circleMesh.position.setZ(z);
		circleMesh.scale.setX(0.05);
		circleMesh.scale.setY(0.05);
		return circleMesh;
	}

	onMount(() => {
		const scene = mountPlayground(container, { width: 600, height: 600 });
		/**
		 * @type {Coordinates}
		 */
		const polygons = [
			[0, 0],
			[1, 0],
			[1, 1.5],
			[2, 1.5],
			[2, 2],
			[1, 2],
			[0, 2],
			[0, 0]
		];
		const inscribedMesh = createMaxInscribed(polygons);
		const INSCRIBED_Z_OFFSET = 0.6;
		const toRotate = new Vector3(0, -1, 0);
		inscribedMesh.position.setZ(INSCRIBED_Z_OFFSET);
		scene.add(inscribedMesh);

		const rotatedPoint = createPoint();
		const toCamPoint = createPoint(undefined, 0x00ff00);

		scene.add(rotatedPoint);
		scene.add(toCamPoint);

		// const plane = new Plane(new Vector3(0, 0, 1), inscribedMesh.position.length());
		// const helper = new PlaneHelper(plane, 5, 0xff00ff);
		// scene.add(helper);

		const { x, y, z } = inscribedMesh.position;
		console.log('positions', x, y, z);
		// helper.position.set(x, y, z);

		const interval = setInterval(() => {
			// const pos = inscribedMesh.localToWorld(toRotate.clone());
			// const vec = new Vector3().copy(pos).sub(inscribedMesh.position);

			const toCam = scene.camera.threeCamera.position.clone().sub(inscribedMesh.position);
			const projected = toCam.clone();
			new Plane(new Vector3(0, 0, 1), 0).projectPoint(toCam, projected);
			console.log('up', inscribedMesh.up)
			// vec.setZ(0)
			// toCam.clampLength(2, 2);
			// toCam.setZ(0)

			projected.setZ(0);
			projected.normalize();
			projected.add(inscribedMesh.position);

			// const vec = inscribedMesh.worldToLocal(projected);
			// const angle = new Vector3().copy(vec).angleTo(projected);
			// console.log('angle', MathUtils.radToDeg(angle))
			// const newPos = new Vector3().copy(vec).applyAxisAngle(new Vector3(0, 0, 1), angle);
			// newPos.setZ(INSCRIBED_Z_OFFSET);
			// rotatedPoint.position.set(newPos.x, newPos.y, newPos.z);

			const projectedtolocal = inscribedMesh.worldToLocal(projected.clone());

			const cn = toRotate.clone().applyAxisAngle(new Vector3(0, 0, 1), -inscribedMesh.rotation.z);
			const cp = projectedtolocal;
			// const angle = cn.angleTo(cp);

			/**
			 * @param {Vector3} v1
			 * @param {Vector3} v2 
			 * @returns number
			 */
			function compute360Angle({x: x1, y: y1}, {x: x2, y: y2}) {
				const dot = x1*x2 + y1*y2  
				const det = x1*y2 - y1*x2
				return Math.atan2(det, dot)
			}


			const angle =  compute360Angle(cn, cp);
			console.log('angle', MathUtils.radToDeg(Math.PI - compute360Angle(cn, cp)))//MathUtils.radToDeg(angle));

			inscribedMesh.rotation.z = angle;

			toCamPoint.position.set(projected.x, projected.y, INSCRIBED_Z_OFFSET);
			// console.log('rotate', angle * 180 / Math.PI)
			// console.log('pos', toCam);
		}, 1000);

		// scene.add(createPoint(pos));

		const shape = buildCoords(polygons);
		const geometry = new ExtrudeGeometry(shape, { depth: 0.01 });

		scene.add(new Mesh(geometry, new MeshBasicMaterial({ color: 0x00b7eb })));

		scene.camera.setPos(1.5, 1, 10);
		scene.camera.target(0, 0, 0);

		scene.animate();

		return () => {
			clearInterval(interval);
		};
	});

	/**
	 * @param {Array<[number, number]>} coords - all polygons
	 * @return {Shape}
	 */
	function buildCoords(coords) {
		const shape = new Shape();

		shape.moveTo(coords[0][0], coords[0][1]);
		coords.slice(1).forEach((coord) => shape.lineTo(coord[0], coord[1]));
		shape.lineTo(coords[0][0], coords[0][1]);

		return shape;
	}

	/**
	 * @param {Array<[number, number]>} array
	 * @returns {[Array<[number, number]>, Minmax | null]}
	 */
	function normalizePoints(array) {
		if (array.length === 0) return [[], null];

		let minX = Infinity,
			maxX = -Infinity;
		let minY = Infinity,
			maxY = -Infinity;

		// Find min and max values for x and y
		for (let [x, y] of array) {
			if (x < minX) minX = x;
			if (x > maxX) maxX = x;
			if (y < minY) minY = y;
			if (y > maxY) maxY = y;
		}

		const rangeX = maxX - minX;
		const rangeY = maxY - minY;

		// Normalize each point
		return [
			array.map(([x, y]) => [(x - minX) / rangeX, (y - minY) / rangeY]),
			[minX, maxX, minY, maxY]
		];
	}

	/**
	 * @param {Coordinates} normalizedArray
	 * @param {Minmax} minmax
	 * @returns {Coordinates}
	 */
	function reverseNormalizePoints(normalizedArray, [minX, maxX, minY, maxY]) {
		const rangeX = maxX - minX;
		const rangeY = maxY - minY;

		return normalizedArray.map(([x, y]) => [x * rangeX + minX, y * rangeY + minY]);
	}

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
	<div bind:this={container}></div>
</div>

<style>
	.minimal-card {
		display: inline-block;
		margin: 1rem 1rem;
		width: 600px;
		border: 1px solid red;
		box-sizing: border-box;
	}
</style>
