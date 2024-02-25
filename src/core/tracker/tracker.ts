import { randomUUID } from "crypto";
import { LoggerStateManager } from "../state-manager/state-manager";
import { trackingConfiguration } from "./types";
import { ObjectLog } from "../logs/object-log/object-log";
import { FunctionLog } from "../logs/function-log/function-log";

export abstract class Tracker {
    //TODO: currently cannot track changes to the target's properties made inside the target's method, unless tracked explicitly NEED FIX
    //FOR NOW I CAN WORK WITH DECORATORS
    private static stateManager = LoggerStateManager;
    static trackObject(target: { [key: string | symbol]: any }, options?: trackingConfiguration) {
        const uuid = options?.uuid ?? randomUUID();
        LoggerStateManager.setKey(uuid);

        return new Proxy(target, {
            get(target, property, reciever) {
                if (target[property] instanceof Function) {
                    return Tracker.trackFunction(target[property].bind(target), { uuid });
                }
                return target[property]
            },
            set(target, property, newValue) {
                const oldVal = target[property];
                target[property] = newValue;
                const log = new ObjectLog(newValue, oldVal)
                LoggerStateManager.updateState(uuid, log)
                return true;
            },
        })
    }

    static trackFunction<T extends any[], K>(originalFunction: (..._: T) => K, options?: trackingConfiguration) {
        const uuid = options?.uuid ?? randomUUID();
        this.stateManager.setKey(uuid)
        return (...args: T): K => {
            const startTime = performance.now();
            const originalFunctionResults = originalFunction(...args);
            const endTime = performance.now();
            const log = new FunctionLog(startTime, endTime, args, originalFunctionResults);
            this.stateManager.updateState(uuid, log);
            return originalFunctionResults;
        };
    }
}
