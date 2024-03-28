import { randomUUID } from "crypto";
import { FeatureMetadata, TrackingOption } from "../../../utils/types/types.js";
import { ParentWorker } from "../../workers/parent-worker/parent-worker.js";
import { FunctionLog } from "../../../utils/models/logs/function-log/function-log.js";
export abstract class FunctionTracker {

    public static track<T extends any[], K>(originalFunction: ((..._: T) => K), options?: TrackingOption) {
        const enrichedOptionsPromise = new Promise<FeatureMetadata>((resolve) => {
            setTimeout(() => {
                const featureName = options?.featureName ?? (originalFunction.name != '' ? originalFunction.name : randomUUID());
                const expiresAfter = options?.expiresAfter ?? 24 * 60 * 60 * 1000;
                const relatedTo = options?.relatedTo ?? 'global'
                const enrichedOptions = {
                    expiresAfter,
                    relatedTo,
                    featureName
                }
                ParentWorker.addFeature(enrichedOptions);
                resolve(enrichedOptions)
            }, 0);
        })

        function trackedFunction(...args: T): K {
            const startTime = performance.now();
            const originalFunctionResults = originalFunction(...args);
            const resultsName = typeof originalFunctionResults == "function" ? originalFunctionResults.name : null;
            const allowedArgs = args.map(arg => typeof arg == "function" ? `[function ${arg.name}]` : arg);
            const endTime = performance.now();
            const trace = new Error().stack?.split('\n')[2].trim().slice(3) ?? 'untraceable'
            enrichedOptionsPromise.then(({ featureName, relatedTo }) => {
                if (originalFunctionResults instanceof Promise) {
                    originalFunctionResults.then((fullfilledOutput) => {
                        const resultsName = typeof fullfilledOutput == "function" ? fullfilledOutput.name : null;
                        const endTime = performance.now()
                        const executionTime = (endTime - startTime).toFixed(4).concat(' ms')
                        const log = new FunctionLog(trace, executionTime, allowedArgs, resultsName ?? fullfilledOutput);
                        ParentWorker.addLog(log, relatedTo, featureName)
                    })
                } else {
                    const executionTime = (endTime - startTime).toFixed(4).concat(' ms')
                    const log = new FunctionLog(trace, executionTime, allowedArgs, resultsName ?? originalFunctionResults);
                    ParentWorker.addLog(log, relatedTo, featureName)
                }
            })

            return originalFunctionResults;
        };

        Reflect.defineProperty(trackedFunction, 'name', {
            value: originalFunction.name
        })

        return trackedFunction;
    }
}