varying vec2 vUv;

void main() {
  vec3 rightColum = vec3(1.0-step(0.9, vUv.x));
  vec3 leftColum = vec3(step(0.1, vUv.x));
  vec3 color = mix(rightColum, leftColum, 0.5);

  vec3 topRow = vec3(1.0-step(0.9, vUv.y));
  vec3 bottomRow = vec3(step(0.1, vUv.y));
  vec3 verticalColor = mix(topRow, bottomRow, 0.5);

	vec3 red = vec3(1.0, 0.0, 0.0);
  vec3 blue = vec3(0.0, 0.0, 1.0);
  vec3 mixed = mix(red, blue, smoothstep(0.1, 1.0, vUv.x));

  vec3 frames = mix(color, verticalColor, 0.5);
  vec3 mixedAndFrames = mix(mixed, frames, 0.5);
  frames = mix(frames, vec3(0.0), step(frames.r, 0.999));


  gl_FragColor = vec4(frames, 1.0);
}
