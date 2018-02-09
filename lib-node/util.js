"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._extend = exports._checkParam = exports._makeRequest = exports.debug = undefined;

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = exports.debug = (0, _debug2.default)("gopherhq");

var _makeRequest = exports._makeRequest = function (requestOptions, cb) {
  debug("Request", requestOptions);
  return (0, _axios2.default)(requestOptions).then(function (res) {
    debug("Response Ok");
    // Add http statusCode to response object
    if (res.data === "") {
      res.data = { statusCode: res.status };
    } else {
      res.data.statusCode = res.status;
    }
    if (cb) cb(null, res.data);
    return Promise.resolve(res.data);
  }).catch(function (err) {
    debug("Response Error:", err);
    var friendlyMessage = err.response.hasOwnProperty("data") ? err.response.data.message : false;
    var errorResponse = friendlyMessage || err.statusText || err.message || err.statusCode;
    if (cb) cb(errorResponse);
    return errorResponse;
  });
};

var _checkParam = exports._checkParam = function (param, paramName) {
  if (!param || typeof param !== "string") {
    throw new Error("'" + paramName + "' is required to connect to Gopher");
  }
};

/**
 * Used to extend one class prototype  with the keys/values of another objects
 */
var _extend = exports._extend = function (base, newObj) {
  Object.keys(newObj).forEach(function (c) {
    base.prototype[c] = newObj[c];
  });
  return base;
};