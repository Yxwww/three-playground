use wasm_bindgen::prelude::*;
use pathfinding::prelude::astar;
use std::collections::HashSet;

// Use wee_alloc as the global allocator for smaller binary size
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// Import the `console.log` function from the web-sys crate
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

// Define a macro to make console.log usage more convenient
macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

// 3D Point structure
#[derive(Clone, Copy, Debug, Eq, Hash, Ord, PartialEq, PartialOrd)]
pub struct Point3D {
    pub x: i32,
    pub y: i32,
    pub z: i32,
}

impl Point3D {
    pub fn new(x: i32, y: i32, z: i32) -> Self {
        Point3D { x, y, z }
    }

    // Manhattan distance heuristic for 3D space
    pub fn manhattan_distance(&self, other: &Point3D) -> u32 {
        ((self.x - other.x).abs() + (self.y - other.y).abs() + (self.z - other.z).abs()) as u32
    }

    // Get all 6 neighboring points (±x, ±y, ±z)
    pub fn neighbors(&self) -> Vec<Point3D> {
        vec![
            Point3D::new(self.x + 1, self.y, self.z),
            Point3D::new(self.x - 1, self.y, self.z),
            Point3D::new(self.x, self.y + 1, self.z),
            Point3D::new(self.x, self.y - 1, self.z),
            Point3D::new(self.x, self.y, self.z + 1),
            Point3D::new(self.x, self.y, self.z - 1),
        ]
    }
}

// Pathfinding context with obstacles
pub struct PathfindingGrid {
    obstacles: HashSet<Point3D>,
    bounds: (Point3D, Point3D), // (min, max) bounds
}

impl PathfindingGrid {
    pub fn new(bounds: (Point3D, Point3D)) -> Self {
        PathfindingGrid {
            obstacles: HashSet::new(),
            bounds,
        }
    }

    pub fn add_obstacle(&mut self, point: Point3D) {
        self.obstacles.insert(point);
    }

    pub fn is_valid_point(&self, point: &Point3D) -> bool {
        point.x >= self.bounds.0.x && point.x <= self.bounds.1.x &&
        point.y >= self.bounds.0.y && point.y <= self.bounds.1.y &&
        point.z >= self.bounds.0.z && point.z <= self.bounds.1.z &&
        !self.obstacles.contains(point)
    }

    pub fn find_path(&self, start: Point3D, goal: Point3D) -> Option<Vec<Point3D>> {
        let result = astar(
            &start,
            |p| {
                p.neighbors()
                    .into_iter()
                    .filter(|neighbor| self.is_valid_point(neighbor))
                    .map(|neighbor| (neighbor, 1)) // Each step costs 1
                    .collect::<Vec<_>>()
            },
            |p| p.manhattan_distance(&goal),
            |p| *p == goal,
        );

        result.map(|(path, _cost)| path)
    }
}

// Called when the wasm module is instantiated
#[wasm_bindgen(start)]
pub fn main() {
    console_log!("WebAssembly pathfinding module loaded successfully!");
}

// Export a `greet` function from Rust to JavaScript
#[wasm_bindgen]
pub fn greet() {
    console_log!("Hello World from WebAssembly pathfinding!");
}

// Export an `add` function from Rust to JavaScript
#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    console_log!("Adding {} + {} = {}", a, b, a + b);
    a + b
}

// Export pathfinding function to JavaScript
#[wasm_bindgen]
pub fn find_path_3d(
    start_x: i32, start_y: i32, start_z: i32,
    goal_x: i32, goal_y: i32, goal_z: i32,
    obstacles: &[i32] // Flattened array of obstacles: [x1, y1, z1, x2, y2, z2, ...]
) -> Vec<i32> {
    let start = Point3D::new(start_x, start_y, start_z);
    let goal = Point3D::new(goal_x, goal_y, goal_z);
    
    // Create grid with reasonable bounds
    let mut grid = PathfindingGrid::new(
        (Point3D::new(-10, -10, -10), Point3D::new(10, 10, 10))
    );
    
    // Add obstacles from the flattened array
    for chunk in obstacles.chunks(3) {
        if chunk.len() == 3 {
            grid.add_obstacle(Point3D::new(chunk[0], chunk[1], chunk[2]));
        }
    }
    
    console_log!("Finding path from ({}, {}, {}) to ({}, {}, {})", 
                 start_x, start_y, start_z, goal_x, goal_y, goal_z);
    
    match grid.find_path(start, goal) {
        Some(path) => {
            console_log!("Path found with {} steps", path.len());
            // Flatten the path for JavaScript: [x1, y1, z1, x2, y2, z2, ...]
            path.iter()
                .flat_map(|p| vec![p.x, p.y, p.z])
                .collect()
        },
        None => {
            console_log!("No path found!");
            vec![]
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_point3d_creation() {
        let point = Point3D::new(1, 2, 3);
        assert_eq!(point.x, 1);
        assert_eq!(point.y, 2);
        assert_eq!(point.z, 3);
    }

    #[test]
    fn test_manhattan_distance() {
        let p1 = Point3D::new(0, 0, 0);
        let p2 = Point3D::new(3, 4, 5);
        assert_eq!(p1.manhattan_distance(&p2), 12); // 3 + 4 + 5
    }

    #[test]
    fn test_neighbors() {
        let point = Point3D::new(0, 0, 0);
        let neighbors = point.neighbors();
        assert_eq!(neighbors.len(), 6);
        
        let expected = vec![
            Point3D::new(1, 0, 0),
            Point3D::new(-1, 0, 0),
            Point3D::new(0, 1, 0),
            Point3D::new(0, -1, 0),
            Point3D::new(0, 0, 1),
            Point3D::new(0, 0, -1),
        ];
        
        for expected_neighbor in expected {
            assert!(neighbors.contains(&expected_neighbor));
        }
    }

    #[test]
    fn test_basic_pathfinding_straight_line() {
        let grid = PathfindingGrid::new(
            (Point3D::new(-5, -5, -5), Point3D::new(5, 5, 5))
        );
        
        let start = Point3D::new(0, 0, 0);
        let goal = Point3D::new(3, 0, 0);
        
        let path = grid.find_path(start, goal).expect("Path should exist");
        
        // Path should be [0,0,0] -> [1,0,0] -> [2,0,0] -> [3,0,0]
        assert_eq!(path.len(), 4);
        assert_eq!(path[0], start);
        assert_eq!(path[3], goal);
    }

    #[test]
    fn test_pathfinding_with_obstacle() {
        let mut grid = PathfindingGrid::new(
            (Point3D::new(-5, -5, -5), Point3D::new(5, 5, 5))
        );
        
        // Add obstacle blocking direct path
        grid.add_obstacle(Point3D::new(1, 0, 0));
        
        let start = Point3D::new(0, 0, 0);
        let goal = Point3D::new(2, 0, 0);
        
        let path = grid.find_path(start, goal).expect("Path should exist");
        
        // Should find alternative path around obstacle
        assert!(path.len() > 3); // Longer than direct path
        assert_eq!(path[0], start);
        assert_eq!(path[path.len() - 1], goal);
        assert!(!path.contains(&Point3D::new(1, 0, 0))); // Should avoid obstacle
    }

    #[test]
    fn test_3d_pathfinding() {
        let grid = PathfindingGrid::new(
            (Point3D::new(-5, -5, -5), Point3D::new(5, 5, 5))
        );
        
        let start = Point3D::new(0, 0, 0);
        let goal = Point3D::new(0, 0, 3); // Move in Z direction
        
        let path = grid.find_path(start, goal).expect("Path should exist");
        
        // Path should be [0,0,0] -> [0,0,1] -> [0,0,2] -> [0,0,3]
        assert_eq!(path.len(), 4);
        assert_eq!(path[0], start);
        assert_eq!(path[3], goal);
    }

    #[test]
    fn test_no_path_completely_blocked() {
        let mut grid = PathfindingGrid::new(
            (Point3D::new(-1, -1, -1), Point3D::new(1, 1, 1))
        );
        
        let start = Point3D::new(-1, 0, 0);
        let goal = Point3D::new(1, 0, 0);
        
        // Create a complete wall blocking all paths
        for y in [-1, 0, 1] {
            for z in [-1, 0, 1] {
                grid.add_obstacle(Point3D::new(0, y, z));
            }
        }
        
        let path = grid.find_path(start, goal);
        assert!(path.is_none()); // No path should exist
    }

    #[test]
    fn test_same_start_and_goal() {
        let grid = PathfindingGrid::new(
            (Point3D::new(-2, -2, -2), Point3D::new(2, 2, 2))
        );
        
        let point = Point3D::new(0, 0, 0);
        let path = grid.find_path(point, point).expect("Path should exist");
        
        // Path should contain only the single point
        assert_eq!(path.len(), 1);
        assert_eq!(path[0], point);
    }

    #[test]
    fn test_bounds_checking() {
        let grid = PathfindingGrid::new(
            (Point3D::new(0, 0, 0), Point3D::new(2, 2, 2))
        );
        
        // Point within bounds
        assert!(grid.is_valid_point(&Point3D::new(1, 1, 1)));
        
        // Points outside bounds
        assert!(!grid.is_valid_point(&Point3D::new(-1, 0, 0)));
        assert!(!grid.is_valid_point(&Point3D::new(3, 0, 0)));
        assert!(!grid.is_valid_point(&Point3D::new(0, -1, 0)));
        assert!(!grid.is_valid_point(&Point3D::new(0, 3, 0)));
        assert!(!grid.is_valid_point(&Point3D::new(0, 0, -1)));
        assert!(!grid.is_valid_point(&Point3D::new(0, 0, 3)));
    }

    // Note: WASM-exported functions can't be tested in native Rust tests
    // They will be tested through the browser interface instead
}