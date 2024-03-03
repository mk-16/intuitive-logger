import { randomUUID } from "crypto";
import { FunctionLog } from "../../../utils/models/logs/function-log/function-log.js";
import { LoggerStateManager } from "../../state-manager/state-manager.js";
import { TrackOptions } from "../../../utils/types/types.js";

export abstract class FunctionTracker {
    public static track<T extends any[], K>(originalFunction: (..._: T) => K, options?: TrackOptions) {
        const uuid = options?.trackByName ?? originalFunction.name !== '' ? originalFunction.name : randomUUID();
        // LoggerStateManager.setKey(uuid);
        return (...args: T): K => {
            const startTime = performance.now();
            const originalFunctionResults = originalFunction(...args);
            const endTime = performance.now();
            // if (originalFunctionResults instanceof Promise) {
            //     originalFunctionResults.then(fullfilledOutput => {
            //         const endTime = performance.now();
            //         const executionTime = (endTime - startTime).toFixed(4).concat(' ms');
            //         const log = new FunctionLog(executionTime, args, fullfilledOutput);
            //         LoggerStateManager.updateState(uuid, log);
            //     })
            // } else {
            //     const executionTime = (endTime - startTime).toFixed(4).concat(' ms');
            //     const log = new FunctionLog(executionTime, args, originalFunctionResults);
            //     LoggerStateManager.updateState(uuid, log);
            // }
            return originalFunctionResults;
        };
    }
}