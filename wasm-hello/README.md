# WebAssembly Hello World Module

This directory contains a Rust-based WebAssembly module that demonstrates basic WASM functionality including console logging and arithmetic operations.

## Features

- **Console Logging**: Prints "Hello World" message to browser console
- **Arithmetic Operations**: Simple add function for testing WASM integration
- **Optimized Build**: Configured for minimal binary size and optimal performance
- **Modern Toolchain**: Uses `wasm-bindgen` and `wasm-pack` for reliable compilation

## Prerequisites

Make sure you have the following tools installed:

1. **Rust**: Install from [rustup.rs](https://rustup.rs/)
2. **wasm-pack**: Install using one of these methods:
   ```bash
   # Via cargo
   cargo install wasm-pack
   
   # Via installer script
   curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
   ```

## Building

To compile the Rust code to WebAssembly:

```bash
# From the wasm-hello directory
./build.sh

# Or manually
wasm-pack build --target web --out-dir pkg --out-name hello
```

The build script will:
1. Compile Rust to WASM using `wasm-pack`
2. Generate JavaScript bindings
3. Copy output files to `../src/lib/wasm/`
4. Optimize the binary with `wasm-opt`

## Output Files

After building, the following files are generated:

- `../src/lib/wasm/hello.js` - JavaScript bindings and initialization code
- `../src/lib/wasm/hello_bg.wasm` - Compiled WebAssembly binary
- `pkg/hello.d.ts` - TypeScript definitions (optional)

## Usage in JavaScript/Svelte

```javascript
// Import the module
import init, { greet, add } from '$lib/wasm/hello.js';

// Initialize the WASM module
await init();

// Use the exported functions
greet(); // Logs "Hello World from WebAssembly!"
const result = add(5, 3); // Returns 8
console.log('5 + 3 =', result);
```

## Module Functions

### `greet()`
Prints a "Hello World" message to the browser console.

### `add(a: number, b: number): number`
Adds two integers and returns the result while logging the operation.

### `main()`
Called automatically when the module is initialized. Logs a startup message.

## Architecture

- **Language**: Rust 2021 Edition
- **Target**: `wasm32-unknown-unknown`
- **Build Tool**: `wasm-pack` with `--target web`
- **Bindings**: `wasm-bindgen` for JavaScript interop
- **Allocator**: `wee_alloc` for smaller binary size
- **Optimization**: Release mode with size optimization (`opt-level = "s"`)

## Development

To modify the WASM module:

1. Edit `src/lib.rs` to add new functions
2. Mark functions with `#[wasm_bindgen]` to export them
3. Run `./build.sh` to recompile
4. Test in the browser at `http://localhost:3003/wasm-hello`

## Size Optimization

The build is configured for minimal size:

- Uses `wee_alloc` instead of default allocator
- Optimizes for size with `opt-level = "s"`
- Enables Link Time Optimization (LTO)
- Strips debug symbols in release builds
- Uses `panic = "abort"` for smaller binaries

## Troubleshooting

### Build Fails
- Ensure `wasm-pack` is installed and in PATH
- Check that you're running the build script from the `wasm-hello` directory
- Verify Rust toolchain includes `wasm32-unknown-unknown` target

### Module Fails to Load
- Check browser console for CORS errors
- Ensure development server is serving WASM files with correct MIME type
- Verify the output files exist in `src/lib/wasm/`

### Functions Not Available
- Ensure functions are marked with `#[wasm_bindgen]`
- Check that the build completed successfully
- Verify the JavaScript import path is correct