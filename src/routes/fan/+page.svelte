<script>
	import Scene from '../../components/Scene.svelte';
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

	let destroyFn;

	function onSceneCreated(scene) {
		const { destroy, update, create } = createGroupControlontrol();

		create(scene);
		const gui = scene.getGui();
		const state = {
			angleSpan: 180,
			innerScale: 0.5
		};

		gui.add(state, 'angleSpan', 0, 360).onChange(() => {
			update({ ...state, angleSpan: MathUtils.degToRad(state.angleSpan) });
		});

		gui.add(state, 'innerScale', 0, 1, 0.1).onChange(() => {
			update({ ...state, angleSpan: MathUtils.degToRad(state.angleSpan) });
		});

		destroyFn = destroy;
	}

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
		function create(s, { angleSpan = Math.PI, innerScale = 0.5 } = {}) {
			// Create a group
			group = new Group();

			// Parameters for the curve
			const numObjects = 20; // Number of objects in the curve
			const curveRadius = 3; // Radius of the outer curve

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
			update({ angleSpan = Math.PI, innerScale = 0.5 } = {}) {
				scene.remove(group);
				// Create a group
				group = new Group();

				// Parameters for the curve
				const numObjects = 20; // Number of objects in the curve
				const curveRadius = 3; // Radius of the outer curve

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

	import { onDestroy } from 'svelte';
	onDestroy(() => {
		if (destroyFn) destroyFn();
	});
</script>

<svelte:head>
	<title>Fan</title>
</svelte:head>

<h1>Fan</h1>
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
