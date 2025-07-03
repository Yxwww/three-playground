# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server on port 3003
- `npm run dev -- --open` - Start dev server and open browser

### Build & Preview
- `npm run build` - Build production version
- `npm run preview` - Preview production build

### Testing
- `npm run test` - Run Playwright end-to-end tests
- `npm run test:unit` - Run Vitest unit tests

### Code Quality
- `npm run lint` - Check code with Prettier and ESLint
- `npm run format` - Format code with Prettier
- `npm run check` - Run svelte-check for type checking
- `npm run check:watch` - Run svelte-check in watch mode

### Utility Scripts
- `npm run generate-categories` - Generate navigation categories (run after adding new routes)
- `npm run generate-thumbnails` - Generate thumbnails for examples

## Architecture

This is a SvelteKit application showcasing Three.js experiments. Each route in `src/routes/` is a Three.js example.

### Core Playground API
The playground provides a standardized Three.js setup through `src/lib/playground/playground.ts`:

```javascript
const playground = mountPlayground(document.querySelector('#canvas'));
// Returns: { scene, camera, renderer, controls, render, dispose, setCameraPosition, fitSceneInView }
```

### Scene Component Pattern
Examples use the reusable Scene component:

```javascript
<Scene {onSceneCreated} />

function onSceneCreated(scene) {
  // Your Three.js code here
}
```

### Category System
Routes are automatically categorized by `scripts/generate-categories.js`. Categories include:
- Scene & Rendering
- Geometry
- Camera & Controls
- Visual Effects
- Shaders & WebGL

After adding a new route:
1. Update the category mapping in `scripts/generate-categories.js` if needed
2. Run `npm run generate-categories`

### Shader Support
GLSL files can be imported directly:
```javascript
import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';
```

### Tech Stack
- **Framework:** SvelteKit (Svelte 5)
- **3D Graphics:** Three.js v0.174
- **Build Tool:** Vite with GLSL plugin
- **Styling:** Tailwind CSS v4 with Flowbite
- **Testing:** Playwright (E2E) and Vitest (unit)
- **Deployment:** Vercel adapter