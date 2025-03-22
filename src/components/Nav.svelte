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
	import { categories } from '$lib';
	
	/**
	 * @typedef {Object} Props
	 * @property {string} segment
	 */

	/** @type {Props} */
	let { segment } = $props();

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