"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerStateManager = void 0;
const log_1 = require("./log");
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
        return __awaiter(this, void 0, void 0, function* () {
            for (const [key, logs] of this.state) {
                for (const log of logs) {
                    if (log instanceof log_1.FunctionLog && log.output instanceof Promise) {
                        yield log.output;
                    }
                }
            }
            return this.state;
        });
    }
}
exports.LoggerStateManager = LoggerStateManager;
LoggerStateManager.state = new Map();
//# sourceMappingURL=state-manager.js.map