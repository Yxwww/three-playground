<script lang="ts">
	import Scene from '../../components/Scene.svelte';
	import {
		BoxGeometry,
		Mesh,
		MeshBasicMaterial,
		AmbientLight,
		DirectionalLight,
		Object3D
	} from 'three';

	function onSceneCreated(scene) {
		// Set camera position
		scene.camera.setPos(5, 5, 15);
		scene.camera.lookAt(0, 0, 0);

		// Add lighting
		const ambientLight = new AmbientLight(0xffffff, 0.6);
		scene.add(ambientLight);
		
		const directionalLight = new DirectionalLight(0xffffff, 0.4);
		directionalLight.position.set(5, 5, 5);
		scene.add(directionalLight);

		// GREEN - renderOrder 10 (highest), added directly to scene
		const greenGeometry = new BoxGeometry(2, 2, 2);
		const greenMaterial = new MeshBasicMaterial({ 
			color: 0x00ff00,
			transparent: true,
			opacity: 0.8
		});
		const greenCube = new Mesh(greenGeometry, greenMaterial);
		greenCube.position.set(0, 2, 2);
		greenCube.renderOrder = 10; // Highest render order - always on top
		scene.add(greenCube);

		// RED GROUP - renderOrder 0 (default), grouped under Object3D
		const redGroup = new Object3D();
		scene.add(redGroup);

		// Create multiple red shades
		const redPositions = [
			{ x: -3, y: 0, z: 0 },
			{ x: -3, y: 0, z: 2 },
			{ x: -3, y: 0, z: -2 }
		];
		
		redPositions.forEach((pos, index) => {
			const geometry = new BoxGeometry(2, 2, 2);
			const material = new MeshBasicMaterial({ 
				color: 0xff0000 + (index * 0x002200), // Different shades of red
				transparent: true,
				opacity: 0.8
			});
			const cube = new Mesh(geometry, material);
			cube.position.set(pos.x, pos.y, pos.z);
			cube.renderOrder = 0; // Default render order
			redGroup.add(cube);
		});

		// BLUE GROUP - renderOrder 1, 2, 3, grouped under another Object3D
		const blueGroup = new Object3D();
		scene.add(blueGroup);

		// Create multiple blue shades with different renderOrder
		const bluePositions = [
			{ x: 3, y: 0, z: 0, order: 1 },
			{ x: 3, y: 0, z: 2, order: 2 },
			{ x: 3, y: 0, z: -2, order: 3 }
		];
		
		bluePositions.forEach((pos, index) => {
			const geometry = new BoxGeometry(2, 2, 2);
			const material = new MeshBasicMaterial({ 
				color: 0x0000ff + (index * 0x220000), // Different shades of blue
				transparent: true,
				opacity: 0.8
			});
			const cube = new Mesh(geometry, material);
			cube.position.set(pos.x, pos.y, pos.z);
			cube.renderOrder = pos.order;
			blueGroup.add(cube);
		});

		// Override the scene's animate function to add rotation
		const originalAnimate = scene.animate.bind(scene);
		scene.animate = () => {
			// Rotate objects
			greenCube.rotation.y += 0.01;
			redGroup.rotation.y += 0.005;
			blueGroup.rotation.y -= 0.005;

			originalAnimate();
		};

		// Start animation
		scene.animate();
	}
</script>

<svelte:head>
	<title>Render Order</title>
</svelte:head>

<h1>Render Order</h1>
<div class="minimal-card">
	<Scene {onSceneCreated} />
</div>

<div class="notes">
	<h2>Team Notes on renderOrder Behavior</h2>
	<p><strong>Example Setup:</strong></p>
	<ul>
		<li><span class="green">Green</span> is renderOrder 10 (highest, rendered last) and directly added to scene</li>
		<li><span class="red">Red shades</span> are grouped under a Object3D which is added to the scene. They are depth sorted renderOrder 0 (default)</li>
		<li><span class="blue">Blue shades</span> grouped under another Object3D that gets added to scene. They have renderOrder 1, 2, 3 respectively</li>
	</ul>
	
	<p><strong>Observations:</strong></p>
	<ul>
		<li>You can see green is always rendered on top despite the fact that it's not the sibling with any other rendered objects</li>
		<li>You can also see red always discard the blues since blues has higher renderOrder. So red writes to depth buffer filters out the blue</li>
	</ul>
	
	<p><strong>Conclusion:</strong></p>
	<ul>
		<li>renderOrder does not only impact siblings. It's global</li>
		<li>Objects with the same renderOrder falls back to depth testing</li>
	</ul>
	
	<p><strong>Side note:</strong> Scene graph does not impact the render order, in this example only depth sorting and renderOrder sorting impacts render order</p>
</div>

<style>
	.minimal-card {
		display: inline-block;
		margin: 1rem 1rem;
		width: 600px;
	}
	
	.notes {
		max-width: 800px;
		margin: 2rem 1rem;
		padding: 1.5rem;
		background-color: #f5f5f5;
		border-radius: 8px;
		font-size: 0.95rem;
		line-height: 1.6;
	}
	
	.notes h2 {
		margin-top: 0;
		font-size: 1.2rem;
	}
	
	.notes ul {
		margin: 0.5rem 0;
		padding-left: 1.5rem;
	}
	
	.notes li {
		margin: 0.3rem 0;
	}
	
	.notes p {
		margin: 1rem 0 0.5rem 0;
	}
	
	.green {
		color: #00aa00;
		font-weight: bold;
	}
	
	.red {
		color: #cc0000;
		font-weight: bold;
	}
	
	.blue {
		color: #0066cc;
		font-weight: bold;
	}
</style>