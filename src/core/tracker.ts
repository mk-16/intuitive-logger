import { FunctionLog, ObjectLog } from "./log";
import { LoggerStateManager } from "./state-manager";

export abstract class Tracker {
    private static stateManager = LoggerStateManager;
    static trackObject(target: { [key: string | symbol]: any }, label?: string) {
        const stateKey = label ?? target;
        return new Proxy(target, {
            get(target, property) {
                return target[property]
            },
            set(target, property, newValue) {
                LoggerStateManager.mapKey(stateKey);
                const oldVal = target[property];
                target[property] = newValue;

                const log = new ObjectLog(oldVal, newValue)
                LoggerStateManager.updateState(stateKey, log)
                return true;
            },
        })
    }

    static trackFunction<T extends any[], K>(originalFunction: (..._: T) => K) {
        this.stateManager.mapKey(originalFunction.name)
        return (...args: T): K => {
            const startTime = performance.now();
            const originalFunctionResults = originalFunction(...args);
            const endTime = performance.now();
            const log = new FunctionLog(originalFunction.name, startTime, endTime, args, originalFunctionResults);
            this.stateManager.updateState(originalFunction.name, log);
            return originalFunctionResults;
        };
    }
}
