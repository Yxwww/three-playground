<script>
	import Scene from '../../components/Scene.svelte';
	import { Text } from 'troika-three-text';
	import init, { greet, add } from '$lib/wasm/hello.js';

	function onSceneCreated(scene) {
		let statusText;
		
		async function loadWasm() {
			try {
				statusText = new Text();
				scene.add(statusText);
				statusText.text = 'Loading WebAssembly...';
				statusText.fontSize = 0.5;
				statusText.position.z = -2;
				statusText.color = 0x0000ff;
				statusText.sync();

				// Initialize the WASM module
				await init();
				console.log('WebAssembly module loaded successfully!');
				
				// Call the greet function (no underscore prefix with wasm-bindgen)
				greet();
				
				// Test the add function
				const result = add(5, 3);
				console.log('5 + 3 =', result);
				
				// Update visual feedback
				statusText.text = 'WASM Loaded!\nCheck console for "Hello World"\n5 + 3 = ' + result;
				statusText.color = 0x00ff00;
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

		loadWasm();
	}
</script>

<svelte:head>
	<title>WebAssembly Hello World</title>
</svelte:head>

<h1>WebAssembly Hello World</h1>
<p class="description">
	This example demonstrates loading and executing a WebAssembly module compiled from Rust using wasm-bindgen.
	Check the browser console for the "Hello World" message.
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