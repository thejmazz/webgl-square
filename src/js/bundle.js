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

},{"./Canvas":1}]},{},[2])


//# sourceMappingURL=bundle.js.map
