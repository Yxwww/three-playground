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

	let sidebarOpen = $state(true);

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

<div class="container">
	<div class="scene-container" class:sidebar-open={sidebarOpen}>
		<Scene {onSceneCreated} />
	</div>
	
	<div class="sidebar" class:open={sidebarOpen}>
		<button 
			class="toggle-btn" 
			onclick={() => sidebarOpen = !sidebarOpen}
			aria-label="Toggle sidebar"
		>
			{#if sidebarOpen}
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
				</svg>
			{:else}
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
				</svg>
			{/if}
		</button>
		
		<div class="sidebar-content">
			<h1>Render Order</h1>
			
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
		</div>
	</div>
</div>

<style>
	.container {
		position: relative;
		width: 100%;
		height: calc(100vh - 3.5rem); /* Account for navigation bar */
		overflow: hidden;
	}
	
	.scene-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: width 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #1a1a1a;
	}
	
	.scene-container.sidebar-open {
		width: calc(100% - 400px);
	}
	
	:global(.scene-container canvas) {
		width: 100% !important;
		height: 100% !important;
		max-width: 100% !important;
		max-height: 100% !important;
	}
	
	.sidebar {
		position: absolute;
		top: 0;
		right: 0;
		width: 400px;
		height: 100%;
		background-color: #f8f8f8;
		box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
		overflow-y: auto;
		z-index: 10;
	}
	
	.sidebar:not(.open) {
		transform: translateX(100%);
	}
	
	.toggle-btn {
		position: absolute;
		left: -40px;
		top: 50%;
		transform: translateY(-50%);
		width: 40px;
		height: 60px;
		background-color: #f8f8f8;
		border: none;
		border-radius: 4px 0 0 4px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
		transition: background-color 0.2s;
	}
	
	.toggle-btn:hover {
		background-color: #e8e8e8;
	}
	
	.sidebar-content {
		padding: 2rem;
		padding-top: 1rem;
	}
	
	.sidebar-content h1 {
		margin-top: 0;
		font-size: 1.8rem;
		margin-bottom: 1.5rem;
	}
	
	.notes {
		font-size: 0.95rem;
		line-height: 1.6;
	}
	
	.notes h2 {
		margin-top: 0;
		font-size: 1.2rem;
		margin-bottom: 1rem;
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
	
	/* Dark mode support */
	:global(.dark) .sidebar {
		background-color: #1f2937;
		color: #f3f4f6;
	}
	
	:global(.dark) .toggle-btn {
		background-color: #1f2937;
	}
	
	:global(.dark) .toggle-btn:hover {
		background-color: #374151;
	}
	
	:global(.dark) .scene-container {
		background-color: #0a0a0a;
	}
</style>