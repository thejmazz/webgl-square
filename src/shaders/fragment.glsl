#ifdef GL_ES
precision highp float;
#endif

// Uniforms are constant unlike attributes

// will pass value for uColor from JS
// rgba
uniform vec4 uColor;

void main() {
    gl_FragColor = uColor;
}
