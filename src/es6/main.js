var glslify = require('glslify');
import {Canvas} from './Canvas';

var canvas = new Canvas('canvas', 'body', window.innerWidth, window.innerHeight);
var gl = canvas.gl;

canvas.clear(0, 0.5, 0, 1);

var vertexSource = glslify('../shaders/vertex.glsl');
var fragmentSource = glslify('../shaders/fragment.glsl');

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
if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS))
    console.log(gl.getShaderInfoLog(vs));
if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS))
    console.log(gl.getShaderInfoLog(fs));
if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    console.log(gl.getProgramInfoLog(program));

var aspect = canvas.width / canvas.height;

var vertices = new Float32Array([
    // Triangle 1 x1,y1,x2,y2,x3,y3
    -0.5, 0.5*aspect, 0.5, 0.5*aspect, 0.5, -0.5*aspect,
    // Triangle 2
    -0.5, 0.5*aspect, 0.5, -0.5*aspect, -0.5, -0.5*aspect
]);

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
