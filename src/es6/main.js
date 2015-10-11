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
