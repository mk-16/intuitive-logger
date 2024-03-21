import { randomUUID } from "crypto";
import { Worker } from "worker_threads";
import { isNode } from "../../../utils/is-node/is-node.js";
import { FunctionLog } from "../../../utils/models/logs/function-log/function-log.js";
import { FeatureMetadata, TrackingOption } from "../../../utils/types/types.js";
import { LoggerStateManager } from "../../state-manager/state-manager.js";

export abstract class FunctionTracker {

    public static track<T extends any[], K>(originalFunction: (..._: T) => K, options?: TrackingOption) {
        const functionName = originalFunction.name != '' ? originalFunction.name : undefined;
        const featureMetadata: FeatureMetadata = {
            expiresAfter: options?.expiresAfter ?? 24 * 60 * 60 * 1000,
            featureName: options?.featureName ?? functionName ?? randomUUID(),
            relatedTo: options?.relatedTo ?? 'global'
        };

        LoggerStateManager.addFeature(featureMetadata);

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
                    LoggerStateManager.digestor$.next([featureMetadata.relatedTo, featureMetadata.featureName, log]);
                })
            } else {
                const executionTime = (endTime - startTime).toFixed(4).concat(' ms');
                const log = new FunctionLog(executionTime, args, originalFunctionResults);
                LoggerStateManager.digestor$.next([featureMetadata.relatedTo, featureMetadata.featureName, log]);
            }
            return originalFunctionResults;
        };
    }
}