<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from 'flowbite-svelte';
	import {
		createPrograms,
		getGLRenderingContext,
		createScene,
		perspective,
		inverse,
		m4,
		degToRad
	} from '$lib/webgl';
	import { derived } from 'svelte/store';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { raf } from '$lib/webgl/utils';
	function rand() {
		return Math.random();
	}
	/**
	 * @type {HTMLCavnasElement | undefined}
	 */
	let canvasElement;
	/**
	 * @type {HTMLDivElement | undefined}
	 */
	let container;
	let drag = false;
	let dragState = {
		start: [0, 0]
	};
	const DEFAULT_ROTATION = [0, 0, 0]; // in degree
	const DEFAULT_TRANSLATION = [0, 0, 500];
	/**
	 * @type {[number, number, number]}
	 */
	const SCALE_VEC = [1, 1, 1];

	const rotation = tweened(DEFAULT_ROTATION, {
		easing: cubicOut,
		duration: 2000
	});
	const translation = tweened(DEFAULT_TRANSLATION, { easing: cubicOut });
	const scaleVec = tweened(SCALE_VEC, { easing: cubicOut, duration: 1000 });
	const cameraStore = derived(
		[rotation, translation, scaleVec],
		([$rotation, $transition, $scaleVec]) => ({
			rotation: $rotation,
			translation: $transition,
			scaleVec: $scaleVec
		})
	);

	function clicked(e) {
		console.log('clicked', e);
	}
	function dragging(e) {
		console.log('dragging', e.vecFromStart);
	}
	function mouseup(e) {
		if (!drag) {
			clicked(e);
		}
		if (!container) return;
		drag = false;
		container.removeEventListener('mouseup', mouseup);
		container.removeEventListener('mousemove', mousemove);
	}
	function mousemove(e) {
		if (!drag) {
			drag = true;
		}
		dragging({ vecFromStart: subVec2(toXy(e), dragState.start) });
	}
	// function mousedown(e) {
	// 	dragState.start = toXy(e);
	// 	container.addEventListener('mouseup', mouseup);
	// 	container.addEventListener('mousemove', mousemove);
	// }

	onMount(() => {
		// container.addEventListener('mousedown', mousedown);
		if (!canvasElement) return () => {};
		const gl = getGLRenderingContext(canvasElement);
		if (!gl) return;
		const program = createPrograms(gl);
		if (!program) {
			alert('Error creating program');
			return;
		}
		const projectionMatrix = perspective(degToRad(60), gl.canvas.width / gl.canvas.width, 1, 2000);
		const radius = 200;
		const { draw } = createScene(gl, program);
		cameraStore.subscribe(({ rotation, translation, scaleVec }) => {
			const rotationMatrix = m4.multiplyTwoMatrix(
				m4.multiplyTwoMatrix(m4.xRotation(degToRad(rotation[0])), m4.yRotation(degToRad(rotation[1]))),
				m4.zRotation(degToRad(rotation[2]))
			);
			const scalingMatrix = m4.scaling(...scaleVec);
			const translationMatrix = m4.translation(...translation);

			var cameraMatrix = m4.multiply(rotationMatrix, scalingMatrix, translationMatrix);

			const viewMatrix = inverse(cameraMatrix);

			var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

			raf(() => {
				draw(viewProjectionMatrix);
			});
		});
		return () => {
			console.log('destroy ');
		};
	});

	function subVec2([x1, y1], [x2, y2]) {
		return [x1 - x2, y1 - y2];
	}
	/**
	 * @param {MouseEvent} e
	 * @returns {[number, number]}
	 */
	function toXy(e) {
		return [e.pageX, e.pageY];
	}

	function updateRotation() {
		// rotation.update(([x, y, z]) => [x + rand(), y + rand(), z + rand()]);
		rotation.update(([x, y, z]) => [360 * Math.random(), 360 * Math.random(), 360 * Math.random()]);
	}
	function randScale() {
		scaleVec.update(([x, y, z]) => [rand(), rand(), rand()]);
	}
	function reset() {
		rotation.set(DEFAULT_ROTATION);
		translation.set(DEFAULT_TRANSLATION);
		scaleVec.set(SCALE_VEC);
	}
	function radiusChanged(e) {
		rotation.update(([x, y, z]) => [x, Number(e.srcElement.value), z]);
	}
	function updateTranslate() {
		translation.update(([x, y, z]) => [x, y, z + 50]);
	}
</script>

<div class="relative">
	<div>
		<Button on:click={updateRotation}>rotation</Button>
		<Button on:click={randScale}>scale</Button>
		<Button on:click={updateTranslate}>translate</Button>
		<Button on:click={reset}>reset</Button>
		<input type="number" on:change={radiusChanged} min="0" max="180" value={$rotation[2]} />
	</div>
	<div class="relative">
		<div class="absoulte">
			<pre>{JSON.stringify($cameraStore, null, 2)}</pre>
		</div>
		<div bind:this={container} class="absolute top-0 left-0">
			<canvas class="w-80%" width="800" height="800" bind:this={canvasElement}></canvas>
		</div>
	</div>
</div>
