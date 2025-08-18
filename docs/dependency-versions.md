# Dependency Version Tracking

## Current Versions (August 2025)

### Production Dependencies
```json
{
  "eslint-config-prettier": "9.1.0",
  "eslint-plugin-svelte": "2.46.1",
  "flowbite-svelte-icons": "2.0.2",
  "max-inscribed-circle": "2.0.1",
  "polylabel": "1.1.0",
  "three": "0.175.0",
  "troika-three-text": "0.49.1",
  "yuxi-scripts": "0.0.6"
}
```

### Development Dependencies
```json
{
  "@playwright/test": "1.54.2",
  "@sveltejs/adapter-auto": "3.3.1",
  "@sveltejs/adapter-vercel": "5.9.0",
  "@sveltejs/kit": "2.31.0",
  "@sveltejs/vite-plugin-svelte": "5.1.1",
  "@tailwindcss/forms": "0.5.10",
  "@tailwindcss/typography": "0.5.16",
  "@tailwindcss/vite": "4.0.10",
  "@types/polylabel": "1.1.3",
  "@types/three": "0.175.0",
  "eslint": "9.17.0",
  "flowbite": "3.1.2",
  "flowbite-svelte": "0.48.4",
  "prettier": "3.6.2",
  "prettier-plugin-svelte": "3.3.2",
  "prettier-plugin-tailwindcss": "0.6.11",
  "puppeteer": "24.16.2",
  "svelte": "5.38.1",
  "svelte-check": "4.3.1",
  "tailwindcss": "4.0.10",
  "typescript": "5.9.2",
  "vite": "6.3.5",
  "vite-plugin-glsl": "1.3.0",
  "vitest": "2.1.9"
}
```

## Version Constraints

### Node.js
- **Required**: >= 20.0.0
- **Recommended**: 22.12+ (for Vite 7 compatibility)
- **Current System**: 22.11.0

### Package Manager
- **pnpm**: 10.13.1 (consider updating to 10.14.0)

## Update Schedule

### Weekly Updates (Security & Patches)
- Security patches for all dependencies
- Patch version updates (x.x.PATCH)

### Monthly Updates (Minor Versions)
- Minor version updates (x.MINOR.x)
- Framework updates (Svelte, SvelteKit)
- Build tool updates (Vite, TypeScript)

### Quarterly Updates (Major Versions)
- Major version updates (MAJOR.x.x)
- Breaking changes evaluation
- Full test suite verification

## Compatibility Matrix

| Package | Min Node | Max Node | Browser Support |
|---------|----------|----------|-----------------|
| Svelte 5.38 | 18.19 | * | Modern browsers |
| SvelteKit 2.31 | 18.19 | * | ES2022 |
| Vite 6.3 | 20.0 | * | ES2020 |
| Vite 7.0 | 22.12 | * | ES2020 |
| Three.js 0.175 | 14.0 | * | WebGL2 |

## Known Version Locks

### Intentional Version Constraints
1. **Vite 6.3.5** - Locked due to Node.js version requirement
2. **@sveltejs/vite-plugin-svelte 5.1.1** - Compatible with Vite 6

### Peer Dependency Warnings
- `vite-plugin-glsl` expects Vite 3-5 (works with 6)
- `flowbite-svelte-icons` expects Tailwind 3 (works with 4)
- `yuxi-scripts` expects Prettier 2 (works with 3)
- `eslint-config-yuxi` expects ESLint 8 (works with 9)

## Next Planned Updates

### Immediate (When Available)
- Three.js 0.176+ when released
- Svelte 5.39+ for latest features

### After Node.js Update
- Vite 7.0.0+ (requires Node.js 22.12+)
- @sveltejs/vite-plugin-svelte 6.x

### Major Version Considerations
- ESLint 10 (when stable)
- Tailwind CSS 5 (when released)