<script lang="ts">
	import {
		Color,
		Material,
		Mesh,
		MeshBasicMaterial,
		MeshPhongMaterial,
		MeshLambertMaterial,
		PlaneGeometry,
		Vector3,
		BufferGeometry,
		Line,
		LineBasicMaterial,
		Vector2,
		Box3Helper,
		Box3,
		SphereGeometry,
		Plane,
		PlaneHelper,
		MathUtils,
		BoxGeometry,
		Line3
	} from 'three';
	import { mountPlayground } from '$lib/playground';
	import { onMount } from 'svelte';
	import type { Nullable } from 'vitest';

	var container = $state();
	let scene;
	let bottomMesh, topMesh;
	let currentOffset = 0;

	function getCornersOfBox(box3) {
		const min = box3.min;
		const max = box3.max;
		const corners = [
			new Vector3(min.x, min.y, min.z),
			new Vector3(min.x, min.y, max.z),
			new Vector3(min.x, max.y, min.z),
			new Vector3(min.x, max.y, max.z),
			new Vector3(max.x, min.y, min.z),
			new Vector3(max.x, min.y, max.z),
			new Vector3(max.x, max.y, min.z),
			new Vector3(max.x, max.y, max.z)
		];
		return corners;
	}
	function computeZOffsetOfTopBoxToAvoidOverlapping(bottomBox, topBox, camera, scene) {
		const cornersOfBottomBox = getCornersOfBox(bottomBox);
		const { corner: furthestCorner } = cornersOfBottomBox.reduce(
			(acc, corner) => {
				const distance = corner.distanceTo(camera.position);
				return distance > acc.distance ? { corner: corner.clone(), distance } : acc;
			},
			{ corner: null as Vector3 | null, distance: 0 }
		);

		if (furthestCorner == null) {
			console.error('Could not find furthest corner');
			return;
		}
		// TODO: handles if topCorner is the right one for some reason
		const topCornerOfFurthestCorner =
			cornersOfBottomBox
				.find((corner) => {
					return (
						corner.z > furthestCorner.z && corner.x === furthestCorner.x && corner.y === furthestCorner.y
					);
				})
				?.clone() ?? furthestCorner;

		const furthestCornerSphere = new Mesh(
			new SphereGeometry(0.1),
			new MeshBasicMaterial({ color: 'purple' })
		);
		furthestCornerSphere.position.copy(topCornerOfFurthestCorner);
		scene.add(furthestCornerSphere);

		console.log('furthestCorner', { furthestCorner });

		const cornersOfTopBox = getCornersOfBox(topBox);
		const { corner: closestCornerOfTopBox } = cornersOfTopBox.reduce(
			(acc, corner) => {
				const distance = corner.distanceTo(camera.position);
				return distance < acc.distance ? { corner: corner.clone(), distance } : acc;
			},
			{ corner: null as Nullable<Vector3>, distance: Infinity }
		);
		if (closestCornerOfTopBox == null) {
			console.error('Could not find closest corner');
			return;
		}
		const closestCornerSphere = new Mesh(
			new SphereGeometry(0.1),
			new MeshBasicMaterial({ color: 'red' })
		);
		closestCornerSphere.position.copy(closestCornerOfTopBox);
		scene.add(closestCornerSphere);

		const parallelZPlaneOfClosestPoint = new Plane(
			new Vector3(0, 0, 1),
			-closestCornerOfTopBox.z // TODO: double check z
		);
		const helper = new PlaneHelper(parallelZPlaneOfClosestPoint, 5, 0xffff00);
		scene.add(helper);
		console.log('helper', helper.position);

		const lineFromCameraToTopCornerOfFurthestCorner = new Line3(
			camera.position.clone(),
			topCornerOfFurthestCorner.clone()
		);
		const lineToPlaneIntersectPoint = parallelZPlaneOfClosestPoint.intersectLine(
			lineFromCameraToTopCornerOfFurthestCorner,
			new Vector3()
		);

		if (lineToPlaneIntersectPoint == null) {
			console.error('Could not find intersection point');
			return;
		}

		const lineToPlaneIntersectPointSphere = new Mesh(
			new SphereGeometry(0.1),
			new MeshBasicMaterial({ color: 'green' })
		);
		lineToPlaneIntersectPointSphere.position.copy(lineToPlaneIntersectPoint);
		scene.add(lineToPlaneIntersectPointSphere);

		const cameraVerticalProjectionPointToPlane = new Vector3(
			camera.position.x,
			camera.position.y,
			closestCornerOfTopBox.z
		);
		const cameraVerticalProjectionPointToPlaneSphere = new Mesh(
			new SphereGeometry(0.1),
			new MeshBasicMaterial({ color: 'blue' })
		);
		cameraVerticalProjectionPointToPlaneSphere.position.copy(cameraVerticalProjectionPointToPlane);
		scene.add(cameraVerticalProjectionPointToPlaneSphere);

		const intersectToCameraVerticalProjectPointVector = cameraVerticalProjectionPointToPlane
			.sub(lineToPlaneIntersectPoint)
			.clone();
		const intersectToClosetPointVector = closestCornerOfTopBox.sub(lineToPlaneIntersectPoint);

		const unit = intersectToCameraVerticalProjectPointVector.normalize();
		const projected = intersectToClosetPointVector.dot(unit);

		const projectedSphee = new Mesh(
			new SphereGeometry(0.1),
			new MeshBasicMaterial({ color: 'cyan' })
		);
		projectedSphee.position.copy(unit.multiplyScalar(projected).add(lineToPlaneIntersectPoint));
		scene.add(projectedSphee);

		// const distanceFromIntersectionPointToClosestCorner = lineToPlaneIntersectPoint.distanceTo(
		// 	cameraVerticalProjectionPointToPlane
		// );

		const d1 = cameraVerticalProjectionPointToPlane.distanceTo(camera.position);
		const d2 = cameraVerticalProjectionPointToPlane.distanceTo(lineToPlaneIntersectPoint);
		const angle = Math.atan2(d1, d2);

		const zOffset = Math.tan(angle) * projected;
		console.log('cameraTilt', MathUtils.radToDeg(angle), {
			zOffset,
			projected,
			multiplier: Math.tan(angle)
		});
		// console.log('zOffset', zOffset);

		// Get the height of the top box
		const topBoxSize = topBox.getSize(new Vector3());
		const topBoxHeight = topBoxSize.z;
		console.log('topBoxHeight', topBoxHeight);
		return zOffset;
		// furthestCornerSphere.visible = false;
		// lineToPlaneIntersectPointSphere.visible = false;
	}

	onMount(() => {
		scene = mountPlayground(container, { width: 1200, height: 1200 });
		const threeScene = scene.getThreeScene();
		const camera = scene.camera.threeCamera;
		console.log('scene', threeScene);
		threeScene.background = new Color('black');

		bottomMesh = new Mesh(
			new BoxGeometry(2, 2, 0.1),
			new MeshPhongMaterial({
				color: 'blue'
			})
		);
		scene.add(bottomMesh);

		topMesh = new Mesh(
			new BoxGeometry(2, 2, 0.1),
			new MeshPhongMaterial({
				color: 'yellow'
			})
		);
		topMesh.position.z = 1;
		scene.add(topMesh);

		// setTimeout(() => {
		// 	const offset = computeZOffsetOfTopBoxToAvoidOverlapping(bottomMesh, topMesh, camera, scene);
		// }, 1000);

		// Add to GUI
		const gui = scene.getGui();

		// Add UI control for offset
		gui
			.add(
				{
					offset: () => {
						// const offset = offsetZToNotOverlap(camera, scene, bottomMesh, topMesh);
						// console.log('found offset', offset);
						//
						// bottomMesh.geometry.computeBoundingBox();
						// topMesh.geometry.computeBoundingBox();
						// const bottomBoxHelper = new Box3Helper(
						// 	bottomMesh.geometry.boundingBox,
						// 	new THREE.Color('yellow')
						// );
						// scene.add(bottomBoxHelper);
						// const topBoxHelper = new Box3Helper(topMesh.geometry.boundingBox, new THREE.Color('red'));
						// scene.add(topBoxHelper);
						const bottomBox = new Box3().setFromObject(bottomMesh);
						const topBox = new Box3().setFromObject(topMesh);
						const zOffset = computeZOffsetOfTopBoxToAvoidOverlapping(bottomBox, topBox, camera, scene);
						if (zOffset != null && zOffset > 0) {
							topMesh.position.z += zOffset;
						}
					}
				},
				'offset'
			)
			.name('Apply Non-overlapping Offset');

		// Add button to reset positions
		gui
			.add(
				{
					reset: () => {
						topMesh.position.z = 1; // Reset to original position
						console.log('Reset position of top mesh');
					}
				},
				'reset'
			)
			.name('Reset Position');

		scene.animate();
	});
</script>

<svelte:head>
	<title>Overlap Detection</title>
</svelte:head>

<h1>Overlap Detection</h1>
<div class="minimal-card">
	<div bind:this={container}></div>
</div>

<style>
	.minimal-card {
		display: inline-block;
		margin: 1rem 1rem;
		width: 1200px;
	}
</style>
