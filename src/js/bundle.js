(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _multiply = require('./multiply');

console.log((0, _multiply.multiply)(5, 3));

function timeout() {
    var duration = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

    return new Promise(function (resolve, reject) {
        setTimeout(resolve, duration);
    });
}

var p = timeout(1000).then(function () {
    console.log('first promise');
    return timeout(2000);
}).then(function () {
    console.log('second promise');
})['catch'](function (err) {
    throw new Error("hmm");
});

},{"./multiply":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multiply = multiply;

function multiply(a, b) {
  return a * b;
}

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map
