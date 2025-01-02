<script>
	import {
		CatmullRomCurve3,
		Group,
		MathUtils,
		Mesh,
		MeshBasicMaterial,
		MeshLambertMaterial,
		PlaneGeometry,
		Quaternion,
		SphereGeometry,
		Vector3
	} from 'three';
	import { createScene } from '$lib/setup/scene.js';
	import { onMount } from 'svelte';

	var container = $state();

	onMount(() => {
		const scene = createScene(container, { width: 400, height: 400 });
		const { destroy, update, create } = createGroupControlontrol();

		create(scene);
		const gui = scene.getGui();
		const state = {
			curve: 180
		};

		gui.add(state, 'curve', 0, 360).onChange(
			/** @param {number} value */ (value) => {
				update({ angleSpan: MathUtils.degToRad(value) });
			}
		);

		scene.animate();
		return () => {
			destroy();
		};
	});

	function createGroupControlontrol() {
		/**
		 * @type {Group | undefined}
		 */
		let group;
		/**
		 * @type {any}
		 */
		let scene;
		/**
		 * @param {any} s
		 */
		function create(s, { angleSpan = Math.PI } = {}) {
			// Create a group
			group = new Group();

			// Parameters for the curve
			const numObjects = 20; // Number of objects in the curve
			const curveRadius = 3; // Radius of the outer curve
			const innerScale = 0.5; // Factor for the inner curve (smaller radius)

			// Create objects and position them in the curve
			for (let i = 0; i < numObjects; i++) {
				const angle = (i / (numObjects - 1)) * angleSpan - angleSpan / 2; // Distribute along the curve

				const localRadius = MathUtils.lerp(innerScale * curveRadius, curveRadius, i / (numObjects - 1));
				const x = localRadius * Math.cos(angle);
				const y = localRadius * Math.sin(angle);

				// Create a sphere (or any other object)
				const geometry = new SphereGeometry(0.1, 16, 16);
				const material = new MeshBasicMaterial({ color: 0xffffff * Math.random() });
				const sphere = new Mesh(geometry, material);

				sphere.position.set(x, y, 0);
				group.add(sphere);
			}

			// Add the group to the scene
			s.add(group);
			scene = s;
		}

		return {
			create,
			destroy() {
				if (!group) return;
				scene.remove(group);
			},
			update({ angleSpan = Math.PI }) {
				scene.remove(group);
				// Create a group
				group = new Group();

				// Parameters for the curve
				const numObjects = 20; // Number of objects in the curve
				const curveRadius = 3; // Radius of the outer curve
				const innerScale = 0.5; // Factor for the inner curve (smaller radius)

				// Create objects and position them in the curve
				for (let i = 0; i < numObjects; i++) {
					const angle = (i / (numObjects - 1)) * angleSpan - angleSpan / 2; // Distribute along the curve

					const localRadius = MathUtils.lerp(
						innerScale * curveRadius,
						curveRadius,
						i / (numObjects - 1)
					);
					const x = localRadius * Math.cos(angle);
					const y = localRadius * Math.sin(angle);

					// Create a sphere (or any other object)
					const geometry = new SphereGeometry(0.1, 16, 16);
					const material = new MeshBasicMaterial({ color: 0xffffff * Math.random() });
					const sphere = new Mesh(geometry, material);

					sphere.position.set(x, y, 0);
					group.add(sphere);
				}

				// Add the group to the scene
				scene.add(group);
			}
		};
	}
</script>

<svelte:head>
	<title>Fan</title>
</svelte:head>

<h1>Fan</h1>
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
