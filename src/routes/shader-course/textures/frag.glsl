varying vec2 vUv;

uniform sampler2D diffuse;
uniform sampler2D overlay;
uniform vec4 tint;

void main() {
  vec4 diffuseSample = texture2D(diffuse, vUv * -1.0);
  vec4 overlaySample = texture2D(overlay, vUv * 3.0);
  vec4 zoomoutOverlay = texture2D(overlay, vUv / 5.0);
  gl_FragColor = mix(mix(diffuseSample, overlaySample, overlaySample.w), zoomoutOverlay, zoomoutOverlay.w);
}
