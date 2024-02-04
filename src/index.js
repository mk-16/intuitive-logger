"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
var browser_env_1 = require("./environments/browser.env");
var node_env_1 = require("./environments/node.env");
try {
    process;
    console.log({ location: node_env_1.NodeConfig.location });
}
catch (error) {
    console.log({ location: browser_env_1.BrowserConfig.location });
    console.log('runnign in browser');
}
function log() {
    var argsv1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        argsv1[_i] = arguments[_i];
    }
    argsv1;
    return function () {
        var argsv2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argsv2[_i] = arguments[_i];
        }
        argsv2;
    };
}
exports.Log = log;
