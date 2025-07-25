varying vec2 vUv;

uniform sampler2D diffuse;
uniform sampler2D overlay;
uniform vec4 tint;

void main() {
    // vec4 diffuseSample = texture2D(diffuse, vUv * -1.0);
    // vec4 overlaySample = texture2D(overlay, vUv * 3.0);
    // vec4 zoomoutOverlay = texture2D(overlay, vUv / 5.0);
    vec4 color = texture2D(diffuse, vUv);
    // float r = smoothstep(0.0, 1.0, color.r);
    // float g = smoothstep(0.0, 1.0, color.g);
    // float b = smoothstep(0.0, 1.0, color.b);
    gl_FragColor = color;
    // gl_FragColor = color;
}
