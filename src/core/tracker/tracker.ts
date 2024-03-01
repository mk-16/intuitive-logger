import { randomUUID } from "crypto";
import { LoggerStateManager } from "../state-manager/state-manager.js";
import { ObjectLog } from "../../models/logs/object-log/object-log.js";
import { FunctionLog } from "../../models/logs/function-log/function-log.js";

export abstract class Tracker {
    //TODO: currently cannot track changes to the target's properties made inside the target's method, unless tracked explicitly NEED FIX
    //FOR NOW I CAN WORK WITH DECORATORS
    static trackObject(target: { [key: string | symbol]: any }, options?: any) {
        const uuid = options?.uuid ?? randomUUID();
        LoggerStateManager.setKey(uuid);

        return new Proxy(target, {
            get(target, property) {
                if (target[property] instanceof Function) {
                    return Tracker.trackFunction(target[property].bind(target), { uuid });
                }
                return target[property]
            },
            set(target, property, newValue) {
                const oldVal = target[property];
                target[property] = newValue;
                const log = new ObjectLog(property, newValue, oldVal);
                LoggerStateManager.updateState(uuid, log);
                return true;
            },
        })
    }

    static trackFunction<T extends any[], K>(originalFunction: (..._: T) => K, options?: any) {
        const uuid = options?.uuid ?? originalFunction.name !== '' ? originalFunction.name : randomUUID();
        LoggerStateManager.setKey(uuid);
        return (...args: T): K => {
            const startTime = performance.now();
            const originalFunctionResults = originalFunction(...args);
            const endTime = performance.now();
            if (originalFunctionResults instanceof Promise) {
                originalFunctionResults.then(fullfilledOutput => {
                    const endTime = performance.now();
                    const executionTime = (endTime - startTime).toFixed(4).concat(' ms');
                    const log = new FunctionLog(executionTime, args, fullfilledOutput);
                    LoggerStateManager.updateState(uuid, log);
                })
            } else {
                const executionTime = (endTime - startTime).toFixed(4).concat(' ms');
                const log = new FunctionLog(executionTime, args, originalFunctionResults);
                LoggerStateManager.updateState(uuid, log);
            }
            return originalFunctionResults;
        };
    }

    static trackModernDecorator(target: any, context: DecoratorContext, options?: any) { }
    static trackLegacyDecorator(target: any, propertyName?: string | symbol, descriptor?: PropertyDescriptor, options?: any) { }
}