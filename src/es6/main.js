var glslify = require('glslify');
import {Canvas} from './Canvas';

var canvas = new Canvas('canvas', 'body', window.innerWidth, window.innerHeight);

canvas.clear(0,0.5,0,1);

var vertexShader = glslify('../shaders/vertex.glsl');
var fragmentShader = glslify('../shaders/fragment.glsl');

console.log(vertexShader);
console.log(fragmentShader);
