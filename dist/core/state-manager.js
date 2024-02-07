"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerStateManager = void 0;
class LoggerStateManager {
    static mapKey(key) {
        if (!this.state.has(key))
            this.state.set(key, []);
    }
    static updateState(key, log) {
        var _a;
        (_a = this.state.get(key)) === null || _a === void 0 ? void 0 : _a.push(log);
    }
    static getState() {
        return this.state;
    }
}
exports.LoggerStateManager = LoggerStateManager;
LoggerStateManager.state = new Map();
//# sourceMappingURL=state-manager.js.map