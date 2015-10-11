// Every shader has one function `main`
// Variables declared in header are paramaters for main
// Can be attributes or uniforms

// Attribute:
// * passed in from JS
// * an array of data that will be processed
// * shader's main function will be called for each element in this array
// * typically holds data related to
//       * positions of vertices
//       * colours
//       * texture coordinates
// * is just an array of numbers - can be interpreted in any way

attribute vec2 aVertexPosition;

void main() {
    // assign to gl_Position - no return statement
    // 0.0 -> 'depth'. If > 1 or < 1, vertex will not be drawn. Similar to x-index from css.
    // 1.0 -> homogeneous coordinate used in perspective projection
    gl_Position = vec4(aVertexPosition, 0.0, 1.0);
}
