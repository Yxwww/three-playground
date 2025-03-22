#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const routesDir = path.resolve(__dirname, '../src/routes');
const outputFile = path.resolve(__dirname, '../src/lib/categories.js');

// Colors for each category
const categoryColors = {
  'Scene & Rendering': 'blue',
  'Geometry': 'green',
  'Camera & Controls': 'red',
  'Visual Effects': 'purple',
  'Shaders & WebGL': 'yellow'
};

// Map route paths to categories
const routeToCategory = {
  // Scene & Rendering
  'scene': 'Scene & Rendering',
  'instancedmesh': 'Scene & Rendering',
  'batched-geometry': 'Scene & Rendering',
  'fps': 'Scene & Rendering',
  'textures': 'Scene & Rendering',
  
  // Geometry
  'pointcloud': 'Geometry',
  'extruded': 'Geometry',
  'structural-geology': 'Geometry',
  'max-inscribed': 'Geometry',
  'deoverlap': 'Geometry',
  'spine': 'Geometry',
  
  // Camera & Controls
  'orbit-pivot': 'Camera & Controls',
  'orbit-pivot/offset': 'Camera & Controls',
  'view-offset': 'Camera & Controls',
  'coord': 'Camera & Controls',
  
  // Visual Effects
  'blending': 'Visual Effects',
  'blending/transparency': 'Visual Effects',
  'sdf-font': 'Visual Effects',
  'fan': 'Visual Effects',
  
  // Shaders & WebGL
  'webgl': 'Shaders & WebGL',
  'shader-course/functions': 'Shaders & WebGL',
  'shader-course/textures': 'Shaders & WebGL'
};

// Title mapping for custom titles 
const pathToTitle = {
  'fps': 'FPS',
  'sdf-font': 'SDF Font',
  'webgl': 'WebGL',
  'orbit-pivot': 'Orbit Pivot',
  'orbit-pivot/offset': 'Orbit Pivot Offset',
  'blending/transparency': 'Transparency',
  'shader-course/functions': 'Shader Functions',
  'shader-course/textures': 'Shader Textures',
  'pointcloud': 'Point Cloud',
  'max-inscribed': 'Max Inscribed',
  'view-offset': 'View Offset',
  'instancedmesh': 'Instanced Mesh',
  'batched-geometry': 'Batched Geometry',
  'coord': 'Coordinates',
  'structural-geology': 'Structural Geology'
};

/**
 * Check if a directory contains a Svelte page component
 * @param {string} dir Directory path
 * @returns {boolean}
 */
function hasPageComponent(dir) {
  return fs.existsSync(path.join(dir, '+page.svelte'));
}

/**
 * Convert path to title (capitalize and replace hyphens with spaces)
 * @param {string} path Route path
 * @returns {string} Formatted title
 */
function pathToFormattedTitle(routePath) {
  // Use predefined title if available
  if (pathToTitle[routePath]) return pathToTitle[routePath];
  
  // Otherwise, format the path name
  const baseName = path.basename(routePath);
  return baseName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Scans routes directory and generates category structure
 */
function generateCategories() {
  const categories = {};
  const entries = fs.readdirSync(routesDir, { withFileTypes: true });
  
  // Process each route directory
  for (const entry of entries) {
    // Skip layout files, page files, and directories without page components
    if (entry.name.startsWith('+') || entry.name.startsWith('.')) continue;
    if (entry.isDirectory()) {
      const routePath = entry.name;
      const routeDir = path.join(routesDir, routePath);
      
      // Check if this is a valid route with a page component
      if (hasPageComponent(routeDir)) {
        const category = routeToCategory[routePath] || 'Uncategorized';
        const title = pathToFormattedTitle(routePath);
        
        // Initialize category if it doesn't exist
        if (!categories[category]) {
          categories[category] = [];
        }
        
        // Add route to category
        categories[category].push({ path: routePath, title });
      }
      
      // Check for nested routes
      const nestedEntries = fs.readdirSync(routeDir, { withFileTypes: true });
      for (const nestedEntry of nestedEntries) {
        if (nestedEntry.isDirectory() && !nestedEntry.name.startsWith('+')) {
          const nestedRoutePath = `${routePath}/${nestedEntry.name}`;
          const nestedRouteDir = path.join(routeDir, nestedEntry.name);
          
          if (hasPageComponent(nestedRouteDir)) {
            const category = routeToCategory[nestedRoutePath] || routeToCategory[routePath] || 'Uncategorized';
            const title = pathToFormattedTitle(nestedRoutePath);
            
            if (!categories[category]) {
              categories[category] = [];
            }
            
            categories[category].push({ path: nestedRoutePath, title });
          }
        }
      }
    }
  }
  
  // Convert to the expected structure format
  const categoriesArray = Object.entries(categories).map(([name, routes]) => ({
    name,
    color: categoryColors[name] || 'gray', // Default to gray if no color defined
    routes: routes.sort((a, b) => a.title.localeCompare(b.title))
  }));
  
  // Sort categories by name
  categoriesArray.sort((a, b) => a.name.localeCompare(b.name));
  
  return categoriesArray;
}

/**
 * Writes the categories to a JavaScript file
 * @param {Array} categories The categories data
 */
function writeCategories(categories) {
  const fileContent = `// Auto-generated by scripts/generate-categories.js
// DO NOT EDIT THIS FILE DIRECTLY

export const categories = ${JSON.stringify(categories, null, 2)};
`;

  fs.writeFileSync(outputFile, fileContent);
  console.log(`Categories generated and written to ${outputFile}`);
}

// Generate and write categories
const categoriesData = generateCategories();
writeCategories(categoriesData);