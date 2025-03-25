<script>
	import { Card, Heading, P, Badge } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { categories } from '$lib';
</script>

<svelte:head>
	<title>Three.js Playground</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<Heading tag="h1" class="mb-4">Three.js Playground</Heading>
	<P class="mb-8">Welcome to this collection of Three.js experiments and examples.</P>

	{#each categories as category}
		<div class="mb-10">
			<div class="mb-4 flex items-center">
				<Heading tag="h2" class="text-2xl">{category.name}</Heading>
				<Badge color={category.color} class="ml-3">{category.routes.length} examples</Badge>
			</div>

			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each category.routes as route}
					<Card
						href="/{route.path}"
						padding="none"
						class="h-full overflow-hidden transition-shadow hover:shadow-lg"
					>
						<img
							src={`/thumbnails/${route.path.replace('/', '-')}.jpg`}
							alt={route.title}
							class="h-32 w-full object-cover"
						/>
						<div class="p-5">
							<Heading tag="h3" class="mb-2 text-xl">{route.title}</Heading>
							<div class="text-primary-600 mt-4 flex items-center">
								<span>View demo</span>
								<ArrowRightOutline class="ml-2 h-5 w-5" />
							</div>
						</div>
					</Card>
				{/each}
			</div>
		</div>
	{/each}
</div>
