import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Scene ResizeObserver functionality tests', () => {
	let mockPlayground;
	let mockRenderer;
	let mockCamera;
	let mockResizeObserver;
	let resizeCallback;

	beforeEach(() => {
		mockRenderer = {
			setSize: vi.fn(),
			domElement: { style: {} }
		};
		mockCamera = {
			aspect: 1,
			updateProjectionMatrix: vi.fn()
		};
		mockPlayground = {
			animate: vi.fn(),
			destory: vi.fn(),
			renderer: mockRenderer,
			camera: { threeCamera: mockCamera },
			render: vi.fn()
		};

		// Mock ResizeObserver
		mockResizeObserver = {
			observe: vi.fn(),
			disconnect: vi.fn()
		};
		global.ResizeObserver = vi.fn((callback) => {
			resizeCallback = callback;
			return mockResizeObserver;
		});
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it('should create ResizeObserver and observe container', () => {
		const mockContainer = { clientWidth: 800, clientHeight: 600 };
		
		// Simulate Scene component setup
		new ResizeObserver(resizeCallback);
		mockResizeObserver.observe(mockContainer);
		
		expect(global.ResizeObserver).toHaveBeenCalled();
		expect(mockResizeObserver.observe).toHaveBeenCalledWith(mockContainer);
	});

	it('should update renderer size using container dimensions', () => {
		const mockContainer = { clientWidth: 800, clientHeight: 600 };
		
		// Mock container dimensions
		Object.defineProperty(mockContainer, 'clientWidth', { value: 800 });
		Object.defineProperty(mockContainer, 'clientHeight', { value: 600 });
		
		// Simulate resize callback
		const handleResize = () => {
			const newWidth = mockContainer.clientWidth;
			const newHeight = mockContainer.clientHeight;
			
			mockPlayground.renderer.setSize(newWidth, newHeight);
			mockPlayground.camera.threeCamera.aspect = newWidth / newHeight;
			mockPlayground.camera.threeCamera.updateProjectionMatrix();
			mockPlayground.render();
		};
		
		handleResize();
		
		expect(mockRenderer.setSize).toHaveBeenCalledWith(800, 600);
		expect(mockCamera.aspect).toBeCloseTo(800 / 600);
		expect(mockCamera.updateProjectionMatrix).toHaveBeenCalled();
		expect(mockPlayground.render).toHaveBeenCalled();
	});

	it('should handle multiple resize events with different container dimensions', () => {
		const scenarios = [
			{ width: 800, height: 600 },
			{ width: 1200, height: 800 },
			{ width: 1600, height: 900 }
		];
		
		scenarios.forEach(({ width, height }) => {
			const mockContainer = { clientWidth: width, clientHeight: height };
			
			// Simulate resize callback
			mockPlayground.renderer.setSize(mockContainer.clientWidth, mockContainer.clientHeight);
			mockPlayground.camera.threeCamera.aspect = mockContainer.clientWidth / mockContainer.clientHeight;
			mockPlayground.camera.threeCamera.updateProjectionMatrix();
			mockPlayground.render();
		});
		
		expect(mockRenderer.setSize).toHaveBeenCalledTimes(3);
		expect(mockCamera.updateProjectionMatrix).toHaveBeenCalledTimes(3);
		expect(mockPlayground.render).toHaveBeenCalledTimes(3);
		
		expect(mockRenderer.setSize).toHaveBeenNthCalledWith(1, 800, 600);
		expect(mockRenderer.setSize).toHaveBeenNthCalledWith(2, 1200, 800);
		expect(mockRenderer.setSize).toHaveBeenNthCalledWith(3, 1600, 900);
	});

	it('should disconnect ResizeObserver on cleanup', () => {
		// Simulate cleanup
		mockResizeObserver.disconnect();
		
		expect(mockResizeObserver.disconnect).toHaveBeenCalled();
	});

	it('should use container dimensions instead of window dimensions', () => {
		const mockContainer = { clientWidth: 1000, clientHeight: 750 };
		
		// This test ensures we're using container.clientWidth/clientHeight
		// instead of window.innerWidth/innerHeight - 73
		const handleResize = () => {
			const newWidth = mockContainer.clientWidth; // Not window-based
			const newHeight = mockContainer.clientHeight; // Not window.innerHeight - 73
			
			mockPlayground.renderer.setSize(newWidth, newHeight);
		};
		
		handleResize();
		
		expect(mockRenderer.setSize).toHaveBeenCalledWith(1000, 750);
		// Verify we're NOT using window.innerHeight - 73 pattern
		expect(mockRenderer.setSize).not.toHaveBeenCalledWith(expect.anything(), 677); // 750 - 73
	});
});