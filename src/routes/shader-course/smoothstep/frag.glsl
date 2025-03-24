varying vec2 vUv;

void main() {
    // float line = abs(vUv.y - 0.5);
    float stepline = smoothstep(0.0, 0.0075, abs(vUv.y - mix(0.665, 0.995, step(0.5, vUv.x))));
    float line1 = smoothstep(0.0, 0.005, abs(vUv.y - 0.66));
    float line2 = smoothstep(0.0, 0.005, abs(vUv.y - 0.33));
    float linearline = smoothstep(0.0, 0.0075, abs(vUv.y - mix(0.33, 0.66, vUv.x)));

    float smoothValue = smoothstep(0.0, 1.0, vUv.x);
    float smoothline = smoothstep(0.0, 0.0075, abs(vUv.y - mix(0.0, 0.33, smoothValue)));

    vec3 color = vec3(vUv.x);
    vec3 white = vec3(1.0);
    vec3 black = vec3(0.0);

    if (vUv.y > 0.33) {
        color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), vUv.x);
    } else if (vUv.y > 0.66) {
        color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), smoothstep(0.0, 1.0, vUv.x));
    } else {
        color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), smoothstep(0.0, 1.0, vUv.x));
    }

    color = mix(white, color, line1);
    color = mix(white, color, line2);

    color = mix(white, color, linearline);
    color = mix(white, color, smoothline);
    color = mix(black, color, stepline);

    gl_FragColor = vec4(vec3(color), 1.0);
}
