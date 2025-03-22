<svelte:head>
	<title>Three.js Playground</title>
</svelte:head>

<script>
	import { Card, Heading, P, Badge } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { categories } from '$lib';
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
					<Card href="/{route.path}" padding="none" class="h-full hover:shadow-lg transition-shadow overflow-hidden">
						{#if route.thumbnail}
							<img src={route.thumbnail} alt="{route.title}" class="w-full h-32 object-cover" />
						{/if}
						<div class="p-5">
							<Heading tag="h3" class="mb-2 text-xl">{route.title}</Heading>
							<div class="flex items-center mt-4 text-primary-600">
								<span>View demo</span>
								<ArrowRightOutline class="w-5 h-5 ml-2" />
							</div>
						</div>
					</Card>
				{/each}
			</div>
		</div>
	{/each}
</div>