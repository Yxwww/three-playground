#!/bin/bash

# Development script for WASM module
# Builds the module and starts the dev server

set -e

echo "🦀 Building Rust WASM module..."
./build.sh

echo ""
echo "🚀 Starting development server..."
echo "Navigate to: http://localhost:3003/wasm-hello"
echo ""

cd ..
npm run dev -- --open