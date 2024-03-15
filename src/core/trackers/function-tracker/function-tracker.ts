import { randomUUID } from "crypto";
import { FunctionLog } from "../../../utils/models/logs/function-log/function-log.js";
import { LoggerStateManager } from "../../state-manager/state-manager.js";
import { LogsFeature } from "../../../utils/types/types.js";
import { LOG_LEVEL } from "../../../index.js";

export abstract class FunctionTracker {
    public static track<T extends any[], K>(originalFunction: (..._: T) => K, options?: Partial<LogsFeature>) {
        const trackingOptions = {
            trackByName: randomUUID(),
            logContext: LOG_LEVEL.INFO,
            expiresAfter: 60 * 60 * 1000,
            ...options
        };

        LoggerStateManager.addFeature(trackingOptions);
        return (...args: T): K => {
            const startTime = performance.now();
            const originalFunctionResults = originalFunction(...args);
            const endTime = performance.now();
            if (originalFunctionResults instanceof Promise) {

                const executionTime = (endTime - startTime).toFixed(4).concat(' ms');
                const log = new FunctionLog(executionTime, args, originalFunctionResults);
                originalFunctionResults.then((fullfilledOutput) => {
                    const endTime = performance.now();
                    const executionTime = (endTime - startTime).toFixed(4).concat(' ms');
                    log.executionTime = executionTime;
                    log.output = fullfilledOutput;
                    LoggerStateManager.digestor$.next([trackingOptions.trackByName, log]);
                })
            } else {
                const executionTime = (endTime - startTime).toFixed(4).concat(' ms');
                const log = new FunctionLog(executionTime, args, originalFunctionResults);
                LoggerStateManager.digestor$.next([trackingOptions.trackByName, log]);
            }
            return originalFunctionResults;
        };
    }
}