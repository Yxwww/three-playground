# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm run dev` - Start development server on port 3003
- `pnpm run dev -- --open` - Start dev server and open browser

### Build & Preview
- `pnpm run build` - Build production version
- `pnpm run preview` - Preview production build

### Testing
- `pnpm run test` - Run Playwright end-to-end tests
- `pnpm run test:unit` - Run Vitest unit tests

### Code Quality
- `pnpm run lint` - Check code with Prettier and ESLint
- `pnpm run format` - Format code with Prettier
- `pnpm run check` - Run svelte-check for type checking
- `pnpm run check:watch` - Run svelte-check in watch mode

### Utility Scripts
- `pnpm run generate-categories` - Generate navigation categories (run after adding new routes)
- `pnpm run generate-thumbnails` - Generate thumbnails for examples

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
2. Run `pnpm run generate-categories`

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

## Feature Implementation System Guidelines

### Feature Implementation Priority Rules
- IMMEDIATE EXECUTION: Launch parallel Tasks immediately upon feature requests
- NO CLARIFICATION: Skip asking what type of implementation unless absolutely critical
- PARALLEL BY DEFAULT: Always use 7-parallel-Task method for efficiency

### Parallel Feature Implementation Workflow
1. **Component**: Create main component file
2. **Styles**: Create component styles/CSS
3. **Tests**: Create test files  
4. **Types**: Create type definitions
5. **Hooks**: Create custom hooks/utilities
6. **Integration**: Update routing, imports, exports
7. **Remaining**: Update package.json, documentation, configuration files
8. **Review and Validation**: Coordinate integration, run tests, verify build, check for conflicts

### Context Optimization Rules
- Strip out all comments when reading code files for analysis
- Each task handles ONLY specified files or file types
- Task 7 combines small config/doc updates to prevent over-splitting

### Feature Implementation Guidelines
- **CRITICAL**: Make MINIMAL CHANGES to existing patterns and structures
- **CRITICAL**: Preserve existing naming conventions and file organization
- Follow project's established architecture and component patterns
- Use existing utility functions and avoid duplicating functionality
