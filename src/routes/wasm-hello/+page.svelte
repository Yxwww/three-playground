<script>
	import Scene from '../../components/Scene.svelte';
	import { Text } from 'troika-three-text';
	import {
		BoxGeometry,
		SphereGeometry,
		Mesh,
		MeshBasicMaterial,
		Vector3,
		CatmullRomCurve3,
		TubeGeometry,
		Group,
		Raycaster,
		Plane,
		PlaneGeometry
	} from 'three';
	import init, { greet, add, find_path_3d } from '$lib/wasm/hello.js';

	function onSceneCreated(scene) {
		let statusText;
		let gridGroup = new Group();
		let pathGroup = new Group();
		let startPoint, goalPoint;
		let currentStart = [-2, 0, 0];
		let currentGoal = [2, 0, 0];
		let isWasmLoaded = false;
		
		scene.add(gridGroup);
		scene.add(pathGroup);
		
		async function loadWasm() {
			try {
				statusText = new Text();
				scene.add(statusText);
				statusText.text = 'Loading WebAssembly Pathfinding...';
				statusText.fontSize = 0.3;
				statusText.position.set(0, 4, -2);
				statusText.color = 0x0000ff;
				statusText.sync();

				// Initialize the WASM module
				await init();
				console.log('WebAssembly pathfinding module loaded successfully!');
				
				// Call the greet function
				greet();
				
				// Create 3D grid visualization
				createGrid();
				
				// Define obstacles (3D coordinates flattened)
				const obstacles = [
					1, 0, 0,  // Block (1,0,0)
					2, 1, 0,  // Block (2,1,0)
					0, 1, 1,  // Block (0,1,1)
					-1, 0, 1, // Block (-1,0,1)
				];
				
				// Set WASM as loaded and calculate initial path
				isWasmLoaded = true;
				calculateAndVisualizePath();
				
				// Add mouse interaction
				addMouseInteraction(scene);
				
			} catch (error) {
				console.error('Failed to load WASM:', error);
				if (statusText) {
					statusText.text = 'WASM Load Failed!\n' + error.message;
					statusText.color = 0xff0000;
				}
			}
			
			if (statusText) {
				statusText.sync();
			}
		}

		function createGrid() {
			// Create grid boundaries and obstacles
			const gridSize = 5;
			const cellSize = 0.8;
			
			// Grid cells (transparent white)
			const cellGeometry = new BoxGeometry(cellSize, cellSize, cellSize);
			const cellMaterial = new MeshBasicMaterial({ 
				color: 0xffffff, 
				transparent: true, 
				opacity: 0.1,
				wireframe: true
			});
			
			// Obstacle material (red)
			const obstacleMaterial = new MeshBasicMaterial({ color: 0xff0000 });
			
			// Start point material (green)
			const startMaterial = new MeshBasicMaterial({ color: 0x00ff00 });
			
			// Goal point material (blue)
			const goalMaterial = new MeshBasicMaterial({ color: 0x0000ff });
			
			// Create grid cells
			for (let x = -gridSize; x <= gridSize; x++) {
				for (let y = -gridSize; y <= gridSize; y++) {
					for (let z = -gridSize; z <= gridSize; z++) {
						// Only show a subset of the grid to avoid clutter
						if (Math.abs(y) <= 2 && Math.abs(z) <= 2) {
							const cell = new Mesh(cellGeometry, cellMaterial);
							cell.position.set(x, y, z);
							gridGroup.add(cell);
						}
					}
				}
			}
			
			// Add obstacles
			const obstacles = [
				[1, 0, 0],
				[2, 1, 0],
				[0, 1, 1],
				[-1, 0, 1]
			];
			
			obstacles.forEach(([x, y, z]) => {
				const obstacle = new Mesh(cellGeometry, obstacleMaterial);
				obstacle.position.set(x, y, z);
				gridGroup.add(obstacle);
			});
			
			// Add start point
			const startGeometry = new SphereGeometry(0.3);
			startPoint = new Mesh(startGeometry, startMaterial);
			startPoint.position.set(currentStart[0], currentStart[1], currentStart[2]);
			startPoint.userData = { type: 'start' };
			gridGroup.add(startPoint);
			
			// Add goal point
			const goalGeometry = new SphereGeometry(0.3);
			goalPoint = new Mesh(goalGeometry, goalMaterial);
			goalPoint.position.set(currentGoal[0], currentGoal[1], currentGoal[2]);
			goalPoint.userData = { type: 'goal' };
			gridGroup.add(goalPoint);
		}

		function createPathVisualization(pathData) {
			// Convert flattened path data to Vector3 points
			const pathPoints = [];
			for (let i = 0; i < pathData.length; i += 3) {
				pathPoints.push(new Vector3(pathData[i], pathData[i + 1], pathData[i + 2]));
			}
			
			if (pathPoints.length < 2) return;
			
			// Create curve from path points
			const curve = new CatmullRomCurve3(pathPoints);
			
			// Create tube geometry along the curve
			const tubeGeometry = new TubeGeometry(curve, pathPoints.length * 2, 0.1, 8, false);
			const tubeMaterial = new MeshBasicMaterial({ 
				color: 0xffff00,
				transparent: true,
				opacity: 0.8
			});
			
			const tubeMesh = new Mesh(tubeGeometry, tubeMaterial);
			pathGroup.add(tubeMesh);
			
			// Add small spheres at each path point
			const pointGeometry = new SphereGeometry(0.05);
			const pointMaterial = new MeshBasicMaterial({ color: 0xffff00 });
			
			pathPoints.forEach((point, index) => {
				const sphere = new Mesh(pointGeometry, pointMaterial);
				sphere.position.copy(point);
				pathGroup.add(sphere);
			});
		}

		function calculateAndVisualizePath() {
			if (!isWasmLoaded) return;
			
			// Clear previous path
			pathGroup.clear();
			
			// Define obstacles (3D coordinates flattened)
			const obstacles = [
				1, 0, 0,  // Block (1,0,0)
				2, 1, 0,  // Block (2,1,0)
				0, 1, 1,  // Block (0,1,1)
				-1, 0, 1, // Block (-1,0,1)
			];
			
			console.log(`Finding path from (${currentStart.join(',')}) to (${currentGoal.join(',')})`);
			const pathData = find_path_3d(currentStart[0], currentStart[1], currentStart[2], currentGoal[0], currentGoal[1], currentGoal[2], obstacles);
			
			if (pathData.length > 0) {
				console.log('Path found:', pathData);
				createPathVisualization(pathData);
				statusText.text = `Path Found!\n${pathData.length / 3} steps\nClick grid to move start/goal`;
				statusText.color = 0x00ff00;
			} else {
				console.log('No path found!');
				statusText.text = 'No Path Found!\nClick grid to move start/goal';
				statusText.color = 0xff6600;
			}
			
			if (statusText) {
				statusText.sync();
			}
		}

		function addMouseInteraction(scene) {
			const raycaster = new Raycaster();
			const mouse = { x: 0, y: 0 };
			let selectedTarget = 'start'; // 'start' or 'goal'
			
			// Wait for canvas to be available
			setTimeout(() => {
				const canvas = document.querySelector('.minimal-card canvas');
				if (!canvas) {
					console.error('Canvas element not found');
					return;
				}
				setupInteraction(canvas);
			}, 100);
			
			function setupInteraction(canvas) {
				// Add UI text for instructions
				const instructionText = new Text();
				instructionText.text = 'Mode: Move Start Point\nPress SPACE to toggle mode\nClick grid to set position';
				instructionText.fontSize = 0.2;
				instructionText.position.set(-4, -3, -2);
				instructionText.color = 0xffffff;
				instructionText.sync();
				scene.add(instructionText);
				
				function onMouseClick(event) {
					// Calculate mouse position in normalized device coordinates
					const rect = canvas.getBoundingClientRect();
					mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
					mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
					
					// Raycast against grid cells
					raycaster.setFromCamera(mouse, scene.camera.threeCamera);
					const intersects = raycaster.intersectObjects(gridGroup.children);
					
					if (intersects.length > 0) {
						const intersected = intersects[0].object;
						const position = intersected.position.clone();
						
						// Round position to grid coordinates
						const gridPos = [
							Math.round(position.x),
							Math.round(position.y),
							Math.round(position.z)
						];
						
						// Don't place on obstacles
						const obstacles = [[1, 0, 0], [2, 1, 0], [0, 1, 1], [-1, 0, 1]];
						const isObstacle = obstacles.some(obs => 
							obs[0] === gridPos[0] && obs[1] === gridPos[1] && obs[2] === gridPos[2]
						);
						
						if (!isObstacle) {
							if (selectedTarget === 'start') {
								currentStart = gridPos;
								startPoint.position.set(gridPos[0], gridPos[1], gridPos[2]);
							} else {
								currentGoal = gridPos;
								goalPoint.position.set(gridPos[0], gridPos[1], gridPos[2]);
							}
							
							// Recalculate path
							calculateAndVisualizePath();
						}
					}
				}
				
				function onKeyPress(event) {
					if (event.code === 'Space') {
						event.preventDefault();
						selectedTarget = selectedTarget === 'start' ? 'goal' : 'start';
						instructionText.text = `Mode: Move ${selectedTarget === 'start' ? 'Start' : 'Goal'} Point\nPress SPACE to toggle mode\nClick grid to set position`;
						instructionText.sync();
					}
				}
				
				// Add event listeners
				canvas.addEventListener('click', onMouseClick);
				document.addEventListener('keydown', onKeyPress);
				
				// Cleanup function (if needed later)
				return () => {
					canvas.removeEventListener('click', onMouseClick);
					document.removeEventListener('keydown', onKeyPress);
				};
			}
		}

		loadWasm();
	}
</script>

<svelte:head>
	<title>WebAssembly 3D Pathfinding</title>
</svelte:head>

<h1>WebAssembly 3D Pathfinding</h1>
<p class="description">
	Interactive 3D A* pathfinding using a WebAssembly module compiled from Rust.
	The visualization shows a 3D grid with obstacles (red cubes), start point (green sphere), goal point (blue sphere),
	and the calculated path as a yellow tube with waypoint markers.
	<br><strong>Controls:</strong> Click grid cells to move start/goal points. Press SPACE to toggle between moving start and goal.
</p>
<div class="minimal-card">
	<Scene {onSceneCreated} />
</div>

<style>
	.minimal-card {
		display: inline-block;
		margin: 1rem 1rem;
		width: 450px;
	}
	
	.description {
		max-width: 600px;
		margin: 1rem;
		color: #666;
	}
</style>