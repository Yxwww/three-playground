<script lang="ts">
	import Scene from '../../components/Scene.svelte';
	import * as THREE from 'three';
	import vertexShader from './vertex.glsl';
	import fragmentShader from './fragment.glsl';

	function onSceneCreated(scene) {
		// Triangle 1: Using Float32BufferAttribute for smooth gradients
		const geometry1 = new THREE.BufferGeometry();

		// Positions for first triangle
		const positions1 = new Float32Array([
			-2.0,
			-1.0,
			0.0, // vertex 0
			-0.5,
			-1.0,
			0.0, // vertex 1
			-1.25,
			1.0,
			0.0 // vertex 2
		]);

		// Float color attributes (RGB values 0-1)
		const colors1 = new Float32Array([
			1.0,
			0.0,
			0.0, // red
			0.0,
			1.0,
			0.0, // green
			0.0,
			0.0,
			1.0 // blue
		]);

		geometry1.setAttribute('position', new THREE.BufferAttribute(positions1, 3));
		geometry1.setAttribute('color', new THREE.BufferAttribute(colors1, 3));
		// Add dummy integer attribute for geometry1
		geometry1.setAttribute('colorIndex', new THREE.Int32BufferAttribute(new Int32Array([0, 0, 0]), 1));

		// Triangle 2: Using Int32BufferAttribute for discrete colors - multiple triangles
		const geometry2 = new THREE.BufferGeometry();

		// Create 3 separate triangles to show different discrete colors
		const positions2 = new Float32Array([
			// Triangle 1 (red)
			0.5, -1.0, 0.0,
			1.0, -1.0, 0.0,
			0.75, -0.3, 0.0,
			
			// Triangle 2 (green)
			1.0, -0.3, 0.0,
			1.5, -0.3, 0.0,
			1.25, 0.4, 0.0,
			
			// Triangle 3 (blue)
			1.5, 0.4, 0.0,
			2.0, 0.4, 0.0,
			1.75, 1.0, 0.0
		]);

		// Integer color indices for each vertex
		const colorIndices = new Int32Array([
			0, 0, 0,  // All vertices of triangle 1 use red (index 0)
			1, 1, 1,  // All vertices of triangle 2 use green (index 1)
			2, 2, 2   // All vertices of triangle 3 use blue (index 2)
		]);

		geometry2.setAttribute('position', new THREE.BufferAttribute(positions2, 3));
		geometry2.setAttribute('colorIndex', new THREE.Int32BufferAttribute(colorIndices, 1));
		// Add dummy float color attribute for geometry2
		geometry2.setAttribute('color', new THREE.BufferAttribute(new Float32Array(27).fill(0), 3));

		// Create materials with ShaderMaterial
		const material1 = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			uniforms: {
				useIntegerAttribute: { value: 0 }
			},
			glslVersion: THREE.GLSL3,
			side: THREE.DoubleSide
		});

		const material2 = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			uniforms: {
				useIntegerAttribute: { value: 1 }
			},
			glslVersion: THREE.GLSL3,
			side: THREE.DoubleSide
		});

		// Create meshes
		const triangle1 = new THREE.Mesh(geometry1, material1);
		const triangle2 = new THREE.Mesh(geometry2, material2);

		// Add to scene
		scene.add(triangle1);
		scene.add(triangle2);

		// Add labels
		const labelGeometry = new THREE.PlaneGeometry(1.5, 0.3);
		const labelMaterial1 = new THREE.MeshBasicMaterial({
			map: createTextTexture('Float Attribute'),
			transparent: true
		});
		const labelMaterial2 = new THREE.MeshBasicMaterial({
			map: createTextTexture('Integer Attribute'),
			transparent: true
		});

		const label1 = new THREE.Mesh(labelGeometry, labelMaterial1);
		const label2 = new THREE.Mesh(labelGeometry, labelMaterial2);

		label1.position.set(-1.25, -1.5, 0);
		label2.position.set(1.25, -1.5, 0);

		scene.add(label1);
		scene.add(label2);
	}

	function createTextTexture(text: string): THREE.Texture {
		const canvas = document.createElement('canvas');
		canvas.width = 256;
		canvas.height = 64;
		const context = canvas.getContext('2d')!;

		context.fillStyle = '#ffffff';
		context.fillRect(0, 0, 256, 64);

		context.font = '24px Arial';
		context.fillStyle = '#000000';
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillText(text, 128, 32);

		const texture = new THREE.CanvasTexture(canvas);
		texture.needsUpdate = true;
		return texture;
	}
</script>

<svelte:head>
	<title>Integer Attributes</title>
</svelte:head>

<h1>Integer Attributes in WebGL2</h1>
<p>Demonstrating float vs integer attributes in custom shaders</p>

<div class="content-wrapper">
	<div class="minimal-card">
		<Scene {onSceneCreated} />
	</div>
	
	<div class="docs">
		<h2>Integer Attributes in WebGL2</h2>
		<p>
			WebGL2 introduces support for integer vertex attributes through the <code>vertexAttribIPointer</code> 
			function. This allows passing integer data directly to shaders without automatic conversion to floats,
			enabling precise integer operations and better performance for specific use cases.
		</p>
		
		<h3>Key Differences from WebGL1:</h3>
		<ul>
			<li><strong>WebGL1:</strong> All attributes converted to floats automatically</li>
			<li><strong>WebGL2:</strong> True integer attributes preserved with <code>vertexAttribIPointer</code></li>
			<li><strong>Precision:</strong> No floating-point precision loss for large integers</li>
		</ul>
		
		<h3>Three.js Implementation:</h3>
		<ul>
			<li><strong>Automatic Detection:</strong> Three.js detects integer buffer attributes</li>
			<li><strong>Type Mapping:</strong> <code>Int32BufferAttribute</code> → GLSL <code>int</code>, 
			<code>Uint32BufferAttribute</code> → GLSL <code>uint</code></li>
			<li><strong>No Interpolation:</strong> Integer attributes must use <code>flat</code> qualifier</li>
		</ul>
		
		<h3>Use Cases & Benefits:</h3>
		<ul>
			<li><strong>Skeletal Animation:</strong> Precise bone indices without rounding errors</li>
			<li><strong>Texture Atlases:</strong> Exact texture/material ID lookup</li>
			<li><strong>Bit Operations:</strong> GLSL 3.0 ES supports bitwise operations on integers</li>
			<li><strong>Instance IDs:</strong> Efficient instanced rendering with unique identifiers</li>
			<li><strong>Memory Efficiency:</strong> Smaller data types (BYTE: 1 byte, SHORT: 2 bytes vs FLOAT: 4 bytes)</li>
		</ul>
		
		<h3>Example Usage:</h3>
		<pre><code>// JavaScript - Three.js automatically uses vertexAttribIPointer
const colorIndices = new Int32Array([0, 1, 2]);
geometry.setAttribute('colorIndex', 
  new THREE.Int32BufferAttribute(colorIndices, 1));

// GLSL Vertex Shader (GLSL 3.0 ES)
in int colorIndex;
flat out int vColorIndex;  /* 'flat' prevents interpolation */

void main() {
  vColorIndex = colorIndex;  /* Exact integer value */
}

// GLSL Fragment Shader
flat in int vColorIndex;  /* Receives discrete integer */

void main() {
  /* Use integer for palette lookup, bit operations, etc. */
  vec3 color = palette[vColorIndex];
}</code></pre>
		
		<h3>Supported Integer Types:</h3>
		<ul>
			<li><code>gl.BYTE</code> / <code>gl.UNSIGNED_BYTE</code> (1 byte)</li>
			<li><code>gl.SHORT</code> / <code>gl.UNSIGNED_SHORT</code> (2 bytes)</li>
			<li><code>gl.INT</code> / <code>gl.UNSIGNED_INT</code> (4 bytes)</li>
		</ul>
		
		<h3>Requirements:</h3>
		<ul>
			<li>WebGL2 context (automatic in modern browsers)</li>
			<li>GLSL 3.0 ES shaders (<code>glslVersion: THREE.GLSL3</code>)</li>
			<li>Three.js r72+ with integer attribute support</li>
		</ul>
		
		<h3>Visual Comparison:</h3>
		<ul>
			<li><strong>Left (Float):</strong> Smooth color gradients via GPU interpolation</li>
			<li><strong>Right (Integer):</strong> Discrete colors from palette lookup, no interpolation</li>
		</ul>
		
		<h3>Performance Notes:</h3>
		<ul>
			<li><strong>Bandwidth:</strong> Reduced memory usage with smaller integer types</li>
			<li><strong>Precision:</strong> No conversion overhead or precision loss</li>
			<li><strong>Operations:</strong> Direct bitwise operations in shaders</li>
		</ul>
	</div>
</div>

<style>
	.content-wrapper {
		display: flex;
		gap: 2rem;
		align-items: flex-start;
		flex-wrap: wrap;
	}
	
	.minimal-card {
		display: inline-block;
		margin: 1rem 0;
		width: 450px;
	}
	
	.docs {
		flex: 1;
		min-width: 300px;
		max-width: 600px;
		background: #f8f9fa;
		padding: 1.5rem;
		border-radius: 8px;
		margin: 1rem 0;
	}
	
	.docs h2 {
		margin-top: 0;
		color: #333;
	}
	
	.docs h3 {
		color: #555;
		margin-top: 1.5rem;
	}
	
	.docs code {
		background: #e9ecef;
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-family: 'Consolas', 'Monaco', monospace;
	}
	
	.docs pre {
		background: #263238;
		color: #aed581;
		padding: 1rem;
		border-radius: 5px;
		overflow-x: auto;
		margin: 1rem 0;
	}
	
	.docs pre code {
		background: none;
		padding: 0;
		color: inherit;
	}
	
	.docs ul {
		line-height: 1.8;
	}
	
	.docs li {
		margin: 0.5rem 0;
	}
</style>

