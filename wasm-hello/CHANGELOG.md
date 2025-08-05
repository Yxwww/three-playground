# Changelog

All notable changes to the WebAssembly example will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-01-05

### Added
- **3D A* Pathfinding Algorithm**: Implemented full 3D pathfinding using the `pathfinding` crate
  - `Point3D` structure with Manhattan distance heuristic
  - `PathfindingGrid` with obstacle support and bounds checking
  - 6-directional movement support (±x, ±y, ±z)
- **Interactive 3D Visualization**: Complete Three.js-based pathfinding visualization
  - 3D grid with transparent wireframe cells
  - Red obstacle cubes at fixed positions
  - Green start sphere and blue goal sphere (user-moveable)
  - Yellow tube geometry following calculated path with waypoint markers
- **Real-time Interactive Controls**:
  - Click grid cells to move start/goal points
  - Spacebar to toggle between moving start and goal
  - Real-time path recalculation on point movement
  - Visual feedback showing path length and current mode
- **Comprehensive Testing**: 9 unit tests covering all pathfinding functionality
  - Basic pathfinding (straight line)
  - Obstacle avoidance
  - 3D navigation (vertical movement)
  - No-path scenarios (completely blocked)
  - Edge cases (same start/end, bounds checking)
- **WASM Exports**: New JavaScript-accessible functions
  - `find_path_3d(start_x, start_y, start_z, goal_x, goal_y, goal_z, obstacles)`: Main pathfinding function
  - Returns flattened coordinate array for JavaScript consumption

### Changed
- **Example Focus**: Transformed from basic "Hello World" to advanced pathfinding demonstration
- **Page Title**: Updated from "WebAssembly Hello World" to "WebAssembly 3D Pathfinding"
- **User Interface**: Enhanced with interactive instructions and real-time feedback
- **Dependencies**: Added `pathfinding = "4.0"` crate for A* algorithm implementation

### Technical Details
- **Algorithm**: A* pathfinding with Manhattan distance heuristic
- **Grid Bounds**: (-10, -10, -10) to (10, 10, 10) coordinate space
- **Obstacles**: Fixed at positions (1,0,0), (2,1,0), (0,1,1), (-1,0,1)
- **Path Visualization**: TubeGeometry with CatmullRomCurve3 for smooth curves
- **Mouse Interaction**: Raycasting-based 3D grid selection
- **Performance**: Optimized WASM binary with `wee_alloc` and size optimization

### Development
- **Build Process**: Enhanced build script with proper error handling
- **Testing**: `cargo test` integration with comprehensive test suite
- **Code Structure**: Modular design with separate pathfinding logic and WASM exports

## [0.1.0] - 2024-12-XX

### Added
- **Basic WebAssembly Module**: Simple Rust-to-WASM compilation example
- **Hello World Functions**: 
  - `greet()`: Console logging demonstration
  - `add(a, b)`: Basic arithmetic function
- **Build Infrastructure**:
  - `wasm-pack` build configuration
  - Build script (`build.sh`) for compilation
  - Size optimization with `wee_alloc`
- **Three.js Integration**: Basic text display in 3D scene
- **Development Workflow**: Complete Rust-to-WASM-to-JavaScript pipeline

### Initial Implementation
- Cargo.toml with WebAssembly target configuration
- Basic wasm-bindgen integration
- Simple console logging via web-sys
- Text-based status display in Three.js scene