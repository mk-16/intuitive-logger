import { randomUUID } from "crypto";
import { FeatureMetadata, TrackingOption } from "../../../utils/types/types.js";
import { ParentWorker } from "../../workers/parent-worker/parent-worker.js";
import { FunctionLog } from "../../../utils/models/logs/function-log/function-log.js";
export abstract class FunctionTracker {

    public static track<T extends any[], K>(originalFunction: (..._: T) => K, options?: TrackingOption) {
        const enrichedOptionsPromise = new Promise<FeatureMetadata>((resolve) => {
            setTimeout(() => {
                const featureName = options?.featureName ?? (originalFunction.name != '' ? originalFunction.name : randomUUID());
                const expiresAfter = options?.expiresAfter ?? 24 * 60 * 60 * 1000;
                const relatedTo = options?.relatedTo ?? 'global'
                resolve({
                    expiresAfter,
                    relatedTo,
                    featureName
                })
            }, 0);
        })

        enrichedOptionsPromise.then(enrichedOptions => {
            console.log({ enrichedOptions })

            ParentWorker.addFeature(enrichedOptions);
        })

        return (...args: T): K => {
            const startTime = performance.now();
            const originalFunctionResults = originalFunction(...args);
            const endTime = performance.now();
            const trace = new Error().stack?.split('\n')[2].trim().slice(3) ?? 'untraceable'
            enrichedOptionsPromise.then(({ featureName, relatedTo }) => {
                if (originalFunctionResults instanceof Promise) {
                    originalFunctionResults.then((fullfilledOutput) => {
                        const endTime = performance.now()
                        const executionTime = (endTime - startTime).toFixed(4).concat(' ms')
                        const log = new FunctionLog(trace, executionTime, args, fullfilledOutput);
                        ParentWorker.addLog(log, relatedTo, featureName)
                    })
                } else {
                    const executionTime = (endTime - startTime).toFixed(4).concat(' ms')
                    const log = new FunctionLog(trace, executionTime, args, originalFunctionResults);
                    ParentWorker.addLog(log, relatedTo, featureName)
                }
            })

            return originalFunctionResults;
        };
    }
}