import {Canvas} from './Canvas';

var canvas = new Canvas('canvas', 'body', window.innerWidth, window.innerHeight);
var gl = canvas.gl;

canvas.clear(0,0.5,0,1);
