#!/bin/bash

# Build script for compiling Rust to WebAssembly using wasm-pack

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "Building WebAssembly module with wasm-pack..."
echo "Working directory: $(pwd)"

# Ensure output directory exists
mkdir -p ../src/lib/wasm

# Check if wasm-pack is installed
if ! command -v wasm-pack &> /dev/null; then
    echo "Error: wasm-pack is not installed!"
    echo "Please install wasm-pack by running:"
    echo "  curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh"
    echo "Or install via cargo:"
    echo "  cargo install wasm-pack"
    exit 1
fi

# Check if Cargo.toml exists
if [ ! -f "Cargo.toml" ]; then
    echo "Error: Cargo.toml not found in $(pwd)"
    echo "Please run this script from the wasm-hello directory"
    exit 1
fi

# Build with wasm-pack
echo "Running: wasm-pack build --target web --out-dir pkg --out-name hello"
wasm-pack build --target web --out-dir pkg --out-name hello

# Check if build succeeded
if [ $? -ne 0 ]; then
    echo "Error: wasm-pack build failed"
    exit 1
fi

# Check if the generated files exist
if [ ! -f "pkg/hello.js" ] || [ ! -f "pkg/hello_bg.wasm" ]; then
    echo "Error: Generated files not found in pkg/ directory"
    echo "Contents of pkg/ directory:"
    ls -la pkg/ || echo "pkg/ directory does not exist"
    exit 1
fi

# Copy the generated files to the lib directory
echo "Copying files to ../src/lib/wasm/"
cp pkg/hello.js ../src/lib/wasm/
cp pkg/hello_bg.wasm ../src/lib/wasm/

echo "Build complete! Output files:"
echo "  - ../src/lib/wasm/hello.js"
echo "  - ../src/lib/wasm/hello_bg.wasm"
echo ""
echo "Usage in JavaScript:"
echo "  import init, { greet, add } from '\$lib/wasm/hello.js';"
echo "  await init();"
echo "  greet(); // Logs 'Hello World from WebAssembly!'"
echo "  console.log(add(5, 3)); // Logs 8"