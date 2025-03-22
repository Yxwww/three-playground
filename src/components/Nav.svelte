<script>
	import { 
		Navbar, 
		NavBrand, 
		NavLi, 
		NavUl, 
		NavHamburger,
		Dropdown,
		DropdownItem,
		DropdownDivider
	} from 'flowbite-svelte';
	
	/**
	 * @typedef {Object} Props
	 * @property {string} segment
	 */

	/** @type {Props} */
	let { segment } = $props();

	// Group the routes by category
	const categories = [
		{
			name: 'Scene & Rendering',
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
			routes: [
				{ path: 'orbit-pivot', title: 'Orbit Pivot' },
				{ path: 'orbit-pivot/offset', title: 'Orbit Pivot Offset' },
				{ path: 'view-offset', title: 'View Offset' },
				{ path: 'coord', title: 'Coordinates' }
			]
		},
		{
			name: 'Visual Effects',
			routes: [
				{ path: 'blending', title: 'Blending' },
				{ path: 'blending/transparency', title: 'Transparency' },
				{ path: 'sdf-font', title: 'SDF Font' },
				{ path: 'fan', title: 'Fan' }
			]
		},
		{
			name: 'Shaders & WebGL',
			routes: [
				{ path: 'webgl', title: 'WebGL' },
				{ path: 'shader-course/functions', title: 'Shader Functions' },
				{ path: 'shader-course/textures', title: 'Shader Textures' }
			]
		}
	];

	let isActive = (path) => {
		if (path === '' && segment === '') return true;
		if (path !== '' && segment.startsWith(path)) return true;
		return false;
	};
</script>

<Navbar let:hidden let:toggle rounded class="px-4 py-2.5 bg-gray-50 border-b border-gray-200">
	<NavHamburger on:click={toggle} />
	
	<NavUl {hidden} class="order-1 md:flex w-full">
		<NavLi href="/" active={segment === ''}>Home</NavLi>
		
		{#each categories as category}
			<NavLi class="cursor-pointer">
				<span>{category.name}</span>
				<Dropdown>
					{#each category.routes as route}
						<DropdownItem href="/{route.path}" active={isActive(route.path)}>
							{route.title}
						</DropdownItem>
					{/each}
				</Dropdown>
			</NavLi>
		{/each}
	</NavUl>
</Navbar>