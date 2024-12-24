<script charset="utf-8">
	import { onMount } from 'svelte';
	import { get, writable } from 'svelte/store';
	import {
		createThreeInstancedMeshRenderingInstances,
		createInstancedCylinder,
		createThreeCylinder
	} from '$lib/setup/instancedMesh';
	import { createScene } from '$lib/setup/scene';
	import { getStores } from '$app/stores';
	var container, cylinderContainer, instancedCylinderContainer, scene;
	let instancedCylinderMesh;

	let instances = writable(100000);

	let size = 0.01;

	onMount(() => {
		// three instanced mesh scene
		// const scene = createScene(container);
		// const mesh = createThreeInstancedMeshRenderingInstances();
		// scene.add(mesh);
		// scene.onRender(() => {
		// 	var time = performance.now();
		// 	mesh.rotation.y = time * 0.0005;
		// 	mesh.material.uniforms['time'].value = time * 0.005;
		// 	mesh.material.uniforms['sineTime'].value = Math.sin(
		// 		mesh.material.uniforms['time'].value * 0.05
		// 	);
		// });
		// scene.animate();

		// cylinder minimal
		// const cylinderScene = createScene(cylinderContainer);
		// cylinderScene.getCamera().position.fromArray([3, 4, 6]);
		// const cylinder = createThreeCylinder();
		// cylinderScene.add(cylinder);
		// cylinderScene.animate();

		// instanced cylinder
		scene = createScene(instancedCylinderContainer);
		scene.camera.setPos(2, 2, 2);
		instancedCylinderMesh = createInstancedCylinder(get(instances), 1, 0.5);
		scene.add(instancedCylinderMesh);
		scene.onRender(() => {
			var time = performance.now();
			// instancedCylinderMesh.rotation.y = time * 0.0005
			// instancedCylinderMesh.material.uniforms['sineTime'].value = Math.sin(
			//   time * 0.005
			// )
		});
		instances.subscribe((v) => {
			scene.remove(instancedCylinderMesh);
			instancedCylinderMesh = createInstancedCylinder(v, 0.1, 0.04);
			scene.add(instancedCylinderMesh);
		});
		scene.animate();
	});

	$: {
		if (instancedCylinderMesh) {
			instancedCylinderMesh.material.uniforms.size.value = size;
		}
	}
	onMount(() => {
		return () => {
			scene.remove(instancedCylinderMesh);
			scene.dispose();
		};
	});
</script>

<svelte:head>
	<title>InstancedMesh!</title>
</svelte:head>

<div class="minimals">
	<!-- <div class="minimal-card">
		<div bind:this={container} />
		<h3 class="text-center">Three InstancedMesh</h3>
	</div> -->

	<!-- <div class="minimal-card">
		<div bind:this={cylinderContainer} />
		<h3 class="text-center">Three CylinderGeometry</h3>
	</div> -->

	<div class="minimal-card">
		<div bind:this={instancedCylinderContainer} />
		<h3 class="text-center">Instanced Cylinder BufferGeometry</h3>
		<div>
			<h2>instances:</h2>
			<input
				class="input"
				on:input={(e) => {
					instances.set(Number(e.currentTarget.value));
				}}
				value={$instances}
				type="number"
			/>
		</div>
		<div>
			<h2 class="attribute">size</h2>
			<input type="range" min="0" max="1" step="0.001" bind:value={size} />{size}<br />
		</div>
	</div>
</div>

<style>
	/* make this input big */
	.input {
		width: 100%;
		padding: 0.5rem;
		font-size: 1.5rem;
		border-radius: 0.25rem;
		border: 1px solid #ccc;
		margin: 0.5rem 0;
	}
	.text-center {
		text-align: center;
	}

	.minimals {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	pre {
		margin: 0;
	}

	.minimal-ui {
		text-align: center;
		padding: 1rem;
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
