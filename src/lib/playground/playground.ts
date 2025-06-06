/// <reference path="./types.d.ts" />
import Stats from 'three/examples/jsm/libs/stats.module.js';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min';

import {
	Color,
	DirectionalLight,
	Scene as ThreeScene,
	PerspectiveCamera,
	WebGLRenderer,
	Mesh,
	AxesHelper,
	Object3D,
	TextureLoader
} from 'three';
import { OrbitControls } from './orbitControl';
import { printVector3 } from './utils';

const loader = new TextureLoader();

const CAMERA_DEFAULT_CONFIG = { near: 0.1, far: 1000, pos: [5, 5, 5] };
/**
 * @param {HTMLElement} container - rendering container
 */
export function mountPlayground(
	container: HTMLElement,
	{
		width = 400,
		height = 400,
		axesLength = 2,
		/**
		 * @type {boolean}
		 */
		enableAxesHelper = true,
		camera: cameraConfig = CAMERA_DEFAULT_CONFIG
	} = {
		width: 400,
		height: 400,
		axesLength: 2,
		enableAxesHelper: true,
		camera: CAMERA_DEFAULT_CONFIG
	}
) {
	const camera = new PerspectiveCamera(45, width / height, cameraConfig.near, cameraConfig.far);
	camera.up.set(0, 0, 1);
	camera.position.x = cameraConfig.pos[0];
	camera.position.y = cameraConfig.pos[1];
	camera.position.z = cameraConfig.pos[2];

	const scene = new ThreeScene();

	/** @type any */
	let axesHelper;
	if (enableAxesHelper && axesLength > 0) {
		axesHelper = new AxesHelper(axesLength);
		scene.add(axesHelper);
	}

	const renderer = new WebGLRenderer();
	const controls = new OrbitControls(camera, renderer.domElement);

	// controls.autoRotate = true

	// light
	// const light = new DirectionalLight(0xffffff, 0.5)
	// light.position.set(0, 0, 2)
	// scene.add(light)
	const topLight = new DirectionalLight(0xffffff, 2);
	topLight.position.set(0, 0, 5);
	scene.add(topLight);
	// const bottom = new DirectionalLight(0xffffff, 0.5);
	// bottom.position.set(0, 1, 0);
	// scene.add(bottom);
	const cameraLight = new DirectionalLight(0xffffff, 1);
	scene.add(cameraLight);

	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(width, height);
	renderer.setClearColor(new Color(255, 255, 255), 1);
	renderer.domElement.style.display = 'block';
	renderer.domElement.style.outline = 'none';
	renderer.domElement.style.margin = 'auto';
	container.appendChild(renderer.domElement);
	// if (renderer.extensions.get('ANGLE_instanced_arrays') === null) {
	// 	console.warn('angle instanced array is not supported');
	// 	return;
	// }
	// window.addEventListener('resize', onWindowResize, false)
	// function onWindowResize() {
	//   camera.aspect = window.innerWidth / window.innerHeight
	//   camera.updateProjectionMatrix()
	//   renderer.setSize(window.innerWidth, window.innerHeight)
	// }

	/**
	 * @type {any}
	 */
	let xPanel;
	var stats = new Stats();
	xPanel = stats.addPanel(new Stats.Panel('fps', '#ff8', '#221'));
	stats.showPanel(3);
	container.appendChild(stats.dom);

	let fps = 0,
		fCount = 0,
		felapse = 0,
		average = 0;
	let start = performance.now();

	/**
	 * @type {number | undefined}
	 */
	let rafId;
	function animate() {
		rafId = requestAnimationFrame(() => {
			const now = performance.now();
			fps = 1000 / (now - start);
			fCount++;
			felapse += fps;
			if (fCount === 60) {
				average = felapse / fCount;
				fCount = 0;
				felapse = 0;
				xPanel?.update(average, 120);
			}

			start = now;
			animate();
		});
		controls.update();
		cameraState.position = printVector3(controls.position0);
		render();
	}

	let onRender = () => {};
	function render() {
		onRender();
		cameraLight.position.copy(camera.position);
		renderer.render(scene, camera);
	}

	const gui = new GUI({ title: 'State' });
	const cameraFolder = gui.addFolder('camera');
	console.log('position', controls.position0);
	const cameraState = {
		position: printVector3(controls.position0)
	};
	cameraFolder.add(cameraState, 'position').disable().listen();

	const sceneControl = {
		get camera() {
			return {
				/**
				 * @param {number} x
				 * @param {number} y
				 * @param {number} z
				 */
				target(x, y, z) {
					controls.target.set(x, y, z);
					controls.update();
				},
				/**
				 * @param {number} x
				 * @param {number} y
				 * @param {number} z
				 */
				lookAt(x, y, z) {
					// camera.lookAt(x, y, z);
					controls.target.set(x, y, z);
					controls.update();
				},
				/**
				 * @param {number} x
				 * @param {number} y
				 * @param {number} z
				 */
				setPos(x, y, z) {
					camera.position.set(x, y, z);
					controls.update();
				},
				threeCamera: camera,
				controls
			};
		},
		getThreeScene() {
			return scene;
		},
		getLight() {
			return topLight;
		},
		getAxisHelper() {
			return axesHelper;
		},
		render,
		/**
		 * @param {THREE.Object3D} object
		 * @returns {void}
		 **/
		remove(object) {
			if (object instanceof Mesh) {
				object.geometry?.dispose();
				object.material?.dispose();
			}
			scene.remove(object);
		},
		/**
		 *@param {() => void} cb
		 */
		onRender(cb) {
			onRender = cb;
		},
		animate,
		onDestroy() {},
		dispose() {
			scene.remove();
			gui.destroy();
		},
		/**
		 * @param {Object3D} threeObject - anything that's a three object
		 */
		add(threeObject) {
			scene.add(threeObject);
		},
		/**
		 * @param {string} url - url of the texture we are loading
		 */
		loadTexture(url) {
			return new Promise((res, rej) => {
				// load a resource
				loader.load(
					// resource URL
					`/textures/${url}`,

					// onLoad callback
					function (texture) {
						res(texture);
					},

					// onProgress callback currently not supported
					undefined,

					// onError callback
					function (err) {
						rej(new Error('error loading texture'));
					}
				);
			});
		},
		getGui() {
			return gui;
		},
		destroy() {
			gui.destroy();
			scene.remove();
			if (rafId != null) {
				cancelAnimationFrame(rafId);
			}
		}
	};

	return sceneControl;
}
