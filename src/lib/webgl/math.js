/**
 *
 * @param {any[] } a  - matrix a
 * @param { any[] } b  - matrix b
 * @returns
 */
export function multiplyTwoMatrix(a, b) {
	const dst = [];
	const b00 = b[0 * 4 + 0];
	const b01 = b[0 * 4 + 1];
	const b02 = b[0 * 4 + 2];
	const b03 = b[0 * 4 + 3];
	const b10 = b[1 * 4 + 0];
	const b11 = b[1 * 4 + 1];
	const b12 = b[1 * 4 + 2];
	const b13 = b[1 * 4 + 3];
	const b20 = b[2 * 4 + 0];
	const b21 = b[2 * 4 + 1];
	const b22 = b[2 * 4 + 2];
	const b23 = b[2 * 4 + 3];
	const b30 = b[3 * 4 + 0];
	const b31 = b[3 * 4 + 1];
	const b32 = b[3 * 4 + 2];
	const b33 = b[3 * 4 + 3];
	const a00 = a[0 * 4 + 0];
	const a01 = a[0 * 4 + 1];
	const a02 = a[0 * 4 + 2];
	const a03 = a[0 * 4 + 3];
	const a10 = a[1 * 4 + 0];
	const a11 = a[1 * 4 + 1];
	const a12 = a[1 * 4 + 2];
	const a13 = a[1 * 4 + 3];
	const a20 = a[2 * 4 + 0];
	const a21 = a[2 * 4 + 1];
	const a22 = a[2 * 4 + 2];
	const a23 = a[2 * 4 + 3];
	const a30 = a[3 * 4 + 0];
	const a31 = a[3 * 4 + 1];
	const a32 = a[3 * 4 + 2];
	const a33 = a[3 * 4 + 3];
	dst[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
	dst[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
	dst[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
	dst[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
	dst[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
	dst[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
	dst[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
	dst[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
	dst[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
	dst[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
	dst[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
	dst[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
	dst[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
	dst[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
	dst[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
	dst[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
	return dst;
}

/**
 *
 * @param {any } m
 * @returns
 */
export function inverse(m) {
	const m00 = m[0 * 4 + 0];
	const m01 = m[0 * 4 + 1];
	const m02 = m[0 * 4 + 2];
	const m03 = m[0 * 4 + 3];
	const m10 = m[1 * 4 + 0];
	const m11 = m[1 * 4 + 1];
	const m12 = m[1 * 4 + 2];
	const m13 = m[1 * 4 + 3];
	const m20 = m[2 * 4 + 0];
	const m21 = m[2 * 4 + 1];
	const m22 = m[2 * 4 + 2];
	const m23 = m[2 * 4 + 3];
	const m30 = m[3 * 4 + 0];
	const m31 = m[3 * 4 + 1];
	const m32 = m[3 * 4 + 2];
	const m33 = m[3 * 4 + 3];
	const tmp_0 = m22 * m33;
	const tmp_1 = m32 * m23;
	const tmp_2 = m12 * m33;
	const tmp_3 = m32 * m13;
	const tmp_4 = m12 * m23;
	const tmp_5 = m22 * m13;
	const tmp_6 = m02 * m33;
	const tmp_7 = m32 * m03;
	const tmp_8 = m02 * m23;
	const tmp_9 = m22 * m03;
	const tmp_10 = m02 * m13;
	const tmp_11 = m12 * m03;
	const tmp_12 = m20 * m31;
	const tmp_13 = m30 * m21;
	const tmp_14 = m10 * m31;
	const tmp_15 = m30 * m11;
	const tmp_16 = m10 * m21;
	const tmp_17 = m20 * m11;
	const tmp_18 = m00 * m31;
	const tmp_19 = m30 * m01;
	const tmp_20 = m00 * m21;
	const tmp_21 = m20 * m01;
	const tmp_22 = m00 * m11;
	const tmp_23 = m10 * m01;

	const t0 = tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31 - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
	const t1 = tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31 - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
	const t2 = tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31 - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
	const t3 = tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21 - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

	const d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

	return [
		d * t0,
		d * t1,
		d * t2,
		d * t3,
		d * (tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30 - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
		d * (tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30 - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
		d * (tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30 - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
		d * (tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20 - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
		d * (tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33 - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
		d * (tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33 - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
		d * (tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33 - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
		d * (tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23 - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
		d * (tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12 - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
		d * (tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22 - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
		d * (tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02 - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
		d * (tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12 - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
	];
}

export const m4 = {
	/**
	 *
	 * @param {number} tx
	 * @param {number} ty
	 * @param {number} tz
	 * @returns
	 */
	translation: function (tx, ty, tz) {
		return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1];
	},

	/**
	 *
	 * @param {number} angleInRadians
	 * @returns
	 */
	xRotation: function (angleInRadians) {
		const c = Math.cos(angleInRadians);
		const s = Math.sin(angleInRadians);

		return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
	},

	/**
	 *
	 * @param {number} angleInRadians
	 * @returns
	 */
	yRotation: function (angleInRadians) {
		const c = Math.cos(angleInRadians);
		const s = Math.sin(angleInRadians);

		return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
	},

	/**
	 *
	 * @param {number} angleInRadians
	 * @returns
	 */
	zRotation: function (angleInRadians) {
		const c = Math.cos(angleInRadians);
		const s = Math.sin(angleInRadians);

		return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	},

	/**
	 *
	 * @param {number} sx
	 * @param {number} sy
	 * @param {number} sz
	 * @returns
	 */
	scaling: function (sx, sy, sz) {
		return [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1];
	},
	/**
	 *
	 * @param { any} v
	 * @param {any} m
	 * @returns
	 */
	vectorMultiply: function (v, m) {
		const dst = [];
		for (let i = 0; i < 4; ++i) {
			dst[i] = 0.0;
			for (let j = 0; j < 4; ++j) {
				dst[i] += v[j] * m[j * 4 + i];
			}
		}
		return dst;
	},

	/**
	 *
	 * @param {any} first
	 * @param  {...any} rest
	 */
	multiply: function (first, ...rest) {
		let result = first;
		for (let i = 0; i < rest.length; i++) {
			result = multiplyTwoMatrix(result, rest[i]);
		}
		return result;
	},

	multiplyTwoMatrix: multiplyTwoMatrix,

	/**
	 *
	 * @param {number} left
	 * @param {number} right
	 * @param {number} bottom
	 * @param {number} top
	 * @param {number} near
	 * @param {number} far
	 * @returns
	 */
	orthographic: function (left, right, bottom, top, near, far) {
		return [
			2 / (right - left),
			0,
			0,
			0,
			0,
			2 / (top - bottom),
			0,
			0,
			0,
			0,
			2 / (near - far),
			0,

			(left + right) / (left - right),
			(bottom + top) / (bottom - top),
			(near + far) / (near - far),
			1
		];
	}
};

/**
 *
 * @param {any} m
 * @param {number} tx
 * @param {number} ty
 * @param {number} tz
 * @returns
 */
export function translate(m, tx, ty, tz) {
	return m4.multiplyTwoMatrix(m, m4.translation(tx, ty, tz));
}

/**
 *
 * @param {any} m
 * @param {number} angleInRadians
 * @returns
 */
export function xRotate(m, angleInRadians) {
	return m4.multiplyTwoMatrix(m, m4.xRotation(angleInRadians));
}

/**
 *
 * @param {any} m
 * @param {number} angleInRadians
 * @returns
 */
export function yRotate(m, angleInRadians) {
	return m4.multiplyTwoMatrix(m, m4.yRotation(angleInRadians));
}

/**
 *
 * @param {any} m
 * @param {number} angleInRadians
 * @returns
 */
export function zRotate(m, angleInRadians) {
	return m4.multiplyTwoMatrix(m, m4.zRotation(angleInRadians));
}

/**
 *
 * @param {any} m
 * @param {number} sx
 * @param {number} sy
 * @param {number} sz
 * @returns
 */
export function scale(m, sx, sy, sz) {
	return m4.multiplyTwoMatrix(m, m4.scaling(sx, sy, sz));
}

/**
 *
 * @param {number} width
 * @param {number} height
 * @param {number} depth
 * @returns
 */
export function projection(width, height, depth) {
	// Note: This matrix flips the Y axis so 0 is at the top.
	return [2 / width, 0, 0, 0, 0, -2 / height, 0, 0, 0, 0, 2 / depth, 0, -1, 1, 0, 1];
}

/**
 *
 * @param {number} fudgeFactor
 * @returns {number[]}
 */
export function makeZToVMatrix(fudgeFactor) {
	return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, fudgeFactor, 0, 0, 0, 1];
}

/**
 * It will adjust the units so they are in clip space, it will do the math so that we can choose a field of view by angle and it will let us choose our Z-clipping space. It assumes there's an eye or camera at the origin (0, 0, 0) and given a zNear and a fieldOfView it computes what it would take so that stuff at zNear ends up at Z = -1 and stuff at zNear that is half of fieldOfView above or below the center ends up with Y = -1 and Y = 1 respectively.
 * It computes what to use for X by just multiplying by the aspect passed in. We'd normally set this to the width / height of the display area. Finally, it figures out how much to scale things in Z so that stuff at zFar ends up at Z = 1
 *
 * @param {number} fieldOfViewInRadians
 * @param {number} aspect
 * @param {number} near
 * @param {number} far
 * @returns {number[]}
 */
export function perspective(fieldOfViewInRadians, aspect, near, far) {
	const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
	const rangeInv = 1.0 / (near - far);

	// prettier-ignore
	return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, near * far * rangeInv * 2, 0
    ]
}

/**
 *
 * @param {number} degree
 * @returns number
 */
export function degToRad(degree) {
	return (degree * Math.PI) / 180;
}
/**
 *
 * @param {number} degree
 * @returns number
 */
export function radToDeg(degree) {
	return (degree * 180) / Math.PI;
}

/**
 * @typedef {Float32Array} Matrix
 */

export function glMatrix() {
	return {
		create() {
			return new Float32Array(16);
		},
		createOrthographic() {
			return;
		},
		createPerspective() {
			return;
		},
		createFrustrum() {
			return;
		}
		// scale(M: Matrix, vec3: Vec3): Matrix {
		// 	return new Float32Array(16);
		// }
	};
}
