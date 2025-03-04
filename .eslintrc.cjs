import eslintPluginSvelte from 'eslint-plugin-svelte';
import prettier from 'eslint-plugin-prettier';
export default [
	// add more generic rule sets here, such as:
	// js.configs.recommended,
	...eslintPluginSvelte.configs.recommended,
	{
		rules: {
			// override/add rules settings here, such as:
			// 'svelte/rule-name': 'error'
		}
	},
	prettier
];
