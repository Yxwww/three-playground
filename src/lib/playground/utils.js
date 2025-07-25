/**
 * @param {import('three').Vector3} vec
 */
export function printVector3(vec) {
	return `(${vec.x.toFixed(2)}, ${vec.y.toFixed(2)}, ${vec.z.toFixed(2)})`;
}
