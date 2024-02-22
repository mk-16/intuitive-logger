"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
const log_1 = require("./log");
const state_manager_1 = require("./state-manager");
class Tracker {
    static trackObject(target, label) {
        const stateKey = label !== null && label !== void 0 ? label : target;
        return new Proxy(target, {
            get(target, property) {
                return target[property];
            },
            set(target, property, newValue) {
                state_manager_1.LoggerStateManager.mapKey(stateKey);
                const oldVal = target[property];
                target[property] = newValue;
                const log = new log_1.ObjectLog(newValue, oldVal);
                state_manager_1.LoggerStateManager.updateState(stateKey, log);
                return true;
            },
        });
    }
    static trackFunction(originalFunction) {
        this.stateManager.mapKey(originalFunction.name);
        return (...args) => {
            const startTime = performance.now();
            const originalFunctionResults = originalFunction(...args);
            const endTime = performance.now();
            const log = new log_1.FunctionLog(originalFunction.name, startTime, endTime, args, originalFunctionResults);
            this.stateManager.updateState(originalFunction.name, log);
            return originalFunctionResults;
        };
    }
}
exports.Tracker = Tracker;
Tracker.stateManager = state_manager_1.LoggerStateManager;
//# sourceMappingURL=tracker.js.map