# Three.js Playground

A collection of Three.js experiments and examples built with Svelte.

## Categories

The navigation and homepage grouping is based on a categories system that is auto-generated during build time. 

### How it works

1. The `scripts/generate-categories.js` script scans the `src/routes` directory for all pages
2. Pages are categorized based on predefined mappings in the script
3. A `src/lib/categories.js` file is generated with the full category structure
4. Both the navigation and homepage use this single source of truth

### Adding a new page

1. Create your new page in the appropriate directory under `src/routes`
2. Add the path to the appropriate category in `scripts/generate-categories.js`
3. Add a title mapping in the `pathToTitle` object if the auto-generated title isn't suitable
4. Run `npm run generate-categories` to update the categories file
5. When you build the project, the script will run automatically

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
