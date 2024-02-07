"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserConfig = void 0;
const env_1 = require("./env");
class BrowserConfig extends env_1.Config {
    static get location() {
        try {
            return document.location.pathname;
        }
        catch (err) {
            return null;
        }
    }
}
exports.BrowserConfig = BrowserConfig;
//# sourceMappingURL=browser.env.js.map