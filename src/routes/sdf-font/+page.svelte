<script>
	import { createScene } from '$lib/setup/scene.js';
	import { Text } from 'troika-three-text';
	import { onMount } from 'svelte';

	/**
	 * @type {HTMLDivElement}
	 */
	var container = $state();
	onMount(() => {
		const scene = createScene(container, { width: 400, height: 400 });
		const myText = new Text();
		scene.add(myText);

		myText.text = 'HELLO WORLD!';
		myText.fontSize = 4;
		myText.position.z = -2;
		myText.color = 0x000000;

		myText.sync();
		scene.animate();
	});
</script>

<svelte:head>
	<title>Scene</title>
</svelte:head>

<h1>Scene</h1>
<div class="minimal-card">
	<div bind:this={container}></div>
</div>

<style>
	.text-center {
		text-align: center;
	}

	.minimals {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
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
