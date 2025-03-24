varying vec2 vUv;

void main() {
    // float line = abs(vUv.y - 0.5);
    float line = smoothstep(0.0, 0.005, abs(vUv.y - 0.5));
    float linearline = smoothstep(0.0, 0.0075, abs(vUv.y - mix(0.5, 1.0, vUv.x)));

    float smoothValue = smoothstep(0.0, 1.0, vUv.x);
    float smoothline = smoothstep(0.0, 0.0075, abs(vUv.y - mix(0.0, 0.5, smoothValue)));

    vec3 color = vec3(vUv.x);
    vec3 white = vec3(1.0);

    if (vUv.y > 0.5) {
        color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), vUv.x);
    } else {
        color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), smoothstep(0.0, 1.0, vUv.x));
    }

    color = mix(white, color, line);

    color = mix(white, color, linearline);
    color = mix(white, color, smoothline);

    gl_FragColor = vec4(vec3(color), 1.0);
}
