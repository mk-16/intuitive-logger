import { randomUUID } from "crypto";
import { CONTEXT } from "../../../index.js";
import { FunctionLog } from "../../../utils/models/logs/function-log/function-log.js";
import { FeatureMetadata, ScopeMetadata, TrackingOption } from "../../../utils/types/types.js";
import { LoggerStateManager } from "../../state-manager/state-manager.js";

export abstract class FunctionTracker {
    public static track<T extends any[], K>(originalFunction: (..._: T) => K, options?: TrackingOption) {
        const functionName = originalFunction.name != '' ? originalFunction.name : undefined;
        const featureMetadata: FeatureMetadata = {
            context: options?.feature.context ?? CONTEXT.DEBUG,
            expiresAfter: options?.feature.expiresAfter ?? 60 * 60 * 1000,
            featureName: options?.feature.featureName ?? functionName ?? randomUUID(),
        };

        const scope: ScopeMetadata = {
            context: options?.scope?.context ?? CONTEXT.DEBUG,
            expiresAfter: options?.scope?.expiresAfter ?? Infinity,
            scopeName: options?.scope?.scopeName ?? 'global',
        }


        LoggerStateManager.addScope(scope);
        LoggerStateManager.addFeature(featureMetadata, scope.scopeName);

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
                    LoggerStateManager.digestor$.next([scope.scopeName, featureMetadata.featureName, log]);
                })
            } else {
                const executionTime = (endTime - startTime).toFixed(4).concat(' ms');
                const log = new FunctionLog(executionTime, args, originalFunctionResults);
                LoggerStateManager.digestor$.next([scope.scopeName, featureMetadata.featureName, log]);
            }
            return originalFunctionResults;
        };
    }
}