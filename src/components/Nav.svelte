<script>
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem,
		DropdownDivider,
		Button
	} from 'flowbite-svelte';
	import { SunSolid, MoonSolid } from 'flowbite-svelte-icons';
	import { categories } from '$lib';
	import { theme, setTheme, getEffectiveTheme } from '$lib/theme';
	import { onMount } from 'svelte';

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

	// Initialize theme on mount
	onMount(() => {
		import('$lib/theme').then(({ initTheme }) => {
			initTheme();
		});
	});

	// Toggle between light and dark mode
	function toggleTheme() {
		const currentEffective = getEffectiveTheme($theme);
		setTheme(currentEffective === 'dark' ? 'light' : 'dark');
	}
</script>

<Navbar let:hidden let:toggle rounded class="border-b border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 px-4 py-2.5">
	<NavHamburger on:click={toggle} />

	<NavUl {hidden} class="order-1 w-full md:flex">
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

	<div class="flex items-center ml-auto">
		<Button pill size="sm" color="alternative" on:click={toggleTheme} class="p-2">
			{#if getEffectiveTheme($theme) === 'dark'}
				<SunSolid class="w-4 h-4 text-yellow-400" />
			{:else}
				<MoonSolid class="w-4 h-4 text-blue-500" />
			{/if}
		</Button>
	</div>
</Navbar>
