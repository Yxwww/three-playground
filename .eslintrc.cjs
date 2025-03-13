const eslintPluginESLint = require('eslint-plugin-eslint');
const prettierPlugin = require('eslint-plugin-prettier');

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
