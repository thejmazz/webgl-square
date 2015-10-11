(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Canvas = (function () {
    function Canvas(id, parent, width, height) {
        _classCallCheck(this, Canvas);

        var canvas = document.createElement('canvas');
        this.id = canvas.id = id;
        this.width = canvas.width = width;
        this.height = canvas.height = height;

        if (parent === 'body') {
            document.body.appendChild(canvas);
        } else {
            document.getElementById(parent).appendChild(canvas);
        }

        this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }

    _createClass(Canvas, [{
        key: 'clear',
        value: function clear(r, g, b, a) {
            this.gl.viewport(0, 0, this.width, this.height);
            this.gl.clearColor(r, g, b, a);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        }
    }]);

    return Canvas;
})();

exports.Canvas = Canvas;

},{}],2:[function(require,module,exports){
'use strict';

var _Canvas = require('./Canvas');



var canvas = new _Canvas.Canvas('canvas', 'body', window.innerWidth, window.innerHeight);
var gl = canvas.gl;

canvas.clear(0, 0.5, 0, 1);

var vertexSource = "#define GLSLIFY 1\n// Every shader has one function `main`\n// Variables declared in header are paramaters for main\n// Can be attributes or uniforms\n\n// Attribute:\n// * passed in from JS\n// * an array of data that will be processed\n// * shader's main function will be called for each element in this array\n// * typically holds data related to\n//       * positions of vertices\n//       * colours\n//       * texture coordinates\n// * is just an array of numbers - can be interpreted in any way\n\nattribute vec2 aVertexPosition;\n\nvoid main() {\n    // assign to gl_Position - no return statement\n    // 0.0 -> 'depth'. If > 1 or < 1, vertex will not be drawn. Similar to x-index from css.\n    // 1.0 -> homogeneous coordinate used in perspective projection\n    gl_Position = vec4(aVertexPosition, 0.0, 1.0);\n}\n";
var fragmentSource = "#define GLSLIFY 1\n#ifdef GL_ES\nprecision highp float;\n#endif\n\n// Uniforms are constant unlike attributes\n\n// will pass value for uColor from JS\n// rgba\nuniform vec4 uColor;\n\nvoid main() {\n    gl_FragColor = uColor;\n}\n";

console.log(vertexSource);
console.log(fragmentSource);

// Compile vertex shader
var vs = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vs, vertexSource);
gl.compileShader(vs);

// Compile fragment shader
var fs = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fs, fragmentSource);
gl.compileShader(fs);

// Create and link program
var program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);

// Check for compile and link status
if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) console.log(gl.getShaderInfoLog(vs));
if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) console.log(gl.getShaderInfoLog(fs));
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) console.log(gl.getProgramInfoLog(program));

var aspect = canvas.width / canvas.height;

var vertices = new Float32Array([
// Triangle 1 x1,y1,x2,y2,x3,y3
-0.5, 0.5 * aspect, 0.5, 0.5 * aspect, 0.5, -0.5 * aspect,
// Triangle 2
-0.5, 0.5 * aspect, 0.5, -0.5 * aspect, -0.5, -0.5 * aspect]);

var vbuffer = gl.createBuffer();
// make vbuffer the 'current' buffer
gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

var itemSize = 2;
var numItems = vertices.length / itemSize;

// Use program for any subsequent calls
gl.useProgram(program);
// `uColor` could have been in vertex or fragment shader
program.uColor = gl.getUniformLocation(program, 'uColor');
// rgba
gl.uniform4fv(program.uColor, [0.0, 0.3, 0.0, 1.0]);

program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
// Explicitly enable attribute and set a pointer
gl.enableVertexAttribArray(program.aVertexPosition);
// specify item size: every attribute is composed of two subsequent numbers in the array
gl.vertexAttribPointer(program.aVertexPosition, itemSize, gl.FLOAT, false, 0, 0);

// Lets gooo
// gl.TRIANGLES -> draw mode. can also be gl.POINTS or gl.LINES
// use buffer that is currently bound and call shader program for each attribute
// as many times as numItems
gl.drawArrays(gl.TRIANGLES, 0, numItems);

},{"./Canvas":1}]},{},[2])


//# sourceMappingURL=bundle.js.map
