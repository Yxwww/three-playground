varying vec2 vUv;

uniform sampler2D diffuse;
uniform sampler2D overlay;
uniform vec4 tint;

void main() {
  vec4 diffuseSample = texture2D(diffuse, vec2(vUv.x, vUv.y));
  vec4 overlaySample = texture2D(overlay, vUv);
  gl_FragColor = mix(diffuseSample, overlaySample, overlaySample.w);
}
