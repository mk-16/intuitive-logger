"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeConfig = void 0;
const process_1 = require("process");
const env_1 = require("./env");
class NodeConfig extends env_1.Config {
    static get location() {
        try {
            return (0, process_1.cwd)();
        }
        catch (err) {
            return null;
        }
    }
}
exports.NodeConfig = NodeConfig;
//# sourceMappingURL=node.env.js.map