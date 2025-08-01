in vec3 vColor;
flat in int vColorIndex;

uniform int useIntegerAttribute;

out vec4 fragColor;

vec3 getColorFromPalette(int index) {
    // Define a color palette with 8 distinct colors
    vec3 palette[8];
    palette[0] = vec3(1.0, 0.0, 0.0);    // Red
    palette[1] = vec3(0.0, 1.0, 0.0);    // Green
    palette[2] = vec3(0.0, 0.0, 1.0);    // Blue
    palette[3] = vec3(1.0, 1.0, 0.0);    // Yellow
    palette[4] = vec3(1.0, 0.0, 1.0);    // Magenta
    palette[5] = vec3(0.0, 1.0, 1.0);    // Cyan
    palette[6] = vec3(1.0, 0.5, 0.0);    // Orange
    palette[7] = vec3(0.5, 0.0, 1.0);    // Purple
    
    // Clamp index to valid range
    int safeIndex = clamp(index, 0, 7);
    return palette[safeIndex];
}

void main() {
    vec3 color;
    
    if (useIntegerAttribute == 1) {
        // Use integer color index to select from palette
        color = getColorFromPalette(vColorIndex);
    } else {
        // Use interpolated float color values
        color = vColor;
    }
    
    fragColor = vec4(color, 1.0);
}