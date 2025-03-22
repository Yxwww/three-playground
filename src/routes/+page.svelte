<svelte:head>
	<title>Three.js Playground</title>
</svelte:head>

<script>
	import { Card, Heading, P, Badge } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';

	// Group the routes by category
	const categories = [
		{
			name: 'Scene & Rendering',
			color: 'blue',
			routes: [
				{ path: 'scene', title: 'Scene' },
				{ path: 'instancedmesh', title: 'Instanced Mesh' },
				{ path: 'batched-geometry', title: 'Batched Geometry' },
				{ path: 'fps', title: 'FPS' },
				{ path: 'textures', title: 'Textures' }
			]
		},
		{
			name: 'Geometry',
			color: 'green',
			routes: [
				{ path: 'pointcloud', title: 'Point Cloud' },
				{ path: 'extruded', title: 'Extruded' },
				{ path: 'structural-geology', title: 'Structural Geology' },
				{ path: 'max-inscribed', title: 'Max Inscribed' },
				{ path: 'deoverlap', title: 'Deoverlap' },
				{ path: 'spine', title: 'Spine' }
			]
		},
		{
			name: 'Camera & Controls',
			color: 'red',
			routes: [
				{ path: 'orbit-pivot', title: 'Orbit Pivot' },
				{ path: 'orbit-pivot/offset', title: 'Orbit Pivot Offset' },
				{ path: 'view-offset', title: 'View Offset' },
				{ path: 'coord', title: 'Coordinates' }
			]
		},
		{
			name: 'Visual Effects',
			color: 'purple',
			routes: [
				{ path: 'blending', title: 'Blending' },
				{ path: 'blending/transparency', title: 'Transparency' },
				{ path: 'sdf-font', title: 'SDF Font' },
				{ path: 'fan', title: 'Fan' }
			]
		},
		{
			name: 'Shaders & WebGL',
			color: 'yellow',
			routes: [
				{ path: 'webgl', title: 'WebGL' },
				{ path: 'shader-course/functions', title: 'Shader Functions' },
				{ path: 'shader-course/textures', title: 'Shader Textures' }
			]
		}
	];
</script>

<div class="container mx-auto px-4 py-8">
	<Heading tag="h1" class="mb-4">Three.js Playground</Heading>
	<P class="mb-8">Welcome to this collection of Three.js experiments and examples.</P>

	{#each categories as category}
		<div class="mb-10">
			<div class="flex items-center mb-4">
				<Heading tag="h2" class="text-2xl">{category.name}</Heading>
				<Badge color={category.color} class="ml-3">{category.routes.length} examples</Badge>
			</div>
			
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{#each category.routes as route}
					<Card href="/{route.path}" padding="xl" class="h-full hover:shadow-lg transition-shadow">
						<Heading tag="h3" class="mb-2 text-xl">{route.title}</Heading>
						<div class="flex items-center mt-4 text-primary-600">
							<span>View demo</span>
							<ArrowRightOutline class="w-5 h-5 ml-2" />
						</div>
					</Card>
				{/each}
			</div>
		</div>
	{/each}
</div>