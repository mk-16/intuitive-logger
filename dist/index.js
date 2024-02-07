"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
// import { Logger } from "./core/logger";
const browser_env_1 = require("./environments/browser.env");
__exportStar(require("./core/logger"), exports);
if (browser_env_1.BrowserConfig.location === null) {
    const a = '';
    // console.log({
    // a: NodeConfig.location,
    // })
}
else {
    // console.log({
    // a: BrowserConfig.location,
    // })
}
const Log = (...args) => {
    return (...args) => { };
};
exports.Log = Log;
//# sourceMappingURL=index.js.map