in vec3 color;
in int colorIndex;

uniform int useIntegerAttribute;

out vec3 vColor;
flat out int vColorIndex;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    
    if (useIntegerAttribute == 1) {
        vColorIndex = colorIndex;
        vColor = vec3(0.0); // Not used in integer mode
    } else {
        vColor = color;
        vColorIndex = 0; // Not used in float mode
    }
}
