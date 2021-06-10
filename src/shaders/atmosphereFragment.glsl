uniform vec4 globeAtmosphere;
uniform float atmosphereIntensity;

varying vec3 vertexNormal;

void main() {
    float intensity = pow(atmosphereIntensity - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0);

    gl_FragColor = globeAtmosphere * intensity;
}