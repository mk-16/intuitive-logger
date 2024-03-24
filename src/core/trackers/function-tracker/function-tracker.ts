import { randomUUID } from "crypto";
import { Worker } from "worker_threads";
import { isNode } from "../../../utils/is-node/is-node.js";
import { FunctionLog } from "../../../utils/models/logs/function-log/function-log.js";
import { FeatureMetadata, TrackingOption } from "../../../utils/types/types.js";
import { LoggerStateManager } from "../../state-manager/state-manager.js";
import { ParentWorker } from "../../workers/parent-worker/parent-worker.js";
import 'source-map-support/register.js';
export abstract class FunctionTracker {

    public static track<T extends any[], K>(originalFunction: (..._: T) => K, options?: TrackingOption) {
        const featureMetadataPromise = new Promise<FeatureMetadata>((resolve) => {
            setTimeout(() => {
                const functionName = originalFunction.name != '' ? originalFunction.name : undefined;
                const featureMetadata: FeatureMetadata = {
                    expiresAfter: options?.expiresAfter ?? 24 * 60 * 60 * 1000,
                    featureName: options?.featureName ?? functionName ?? randomUUID(),
                    relatedTo: options?.relatedTo ?? 'global'
                };
                LoggerStateManager.addFeature(featureMetadata);
                resolve(featureMetadata)
            }, 0);
        })

        return (...args: T): K => {
            const startTime = performance.now();
            const originalFunctionResults = originalFunction(...args);
            const endTime = performance.now();
            const trace = new Error().stack?.split('\n')[2].trim().slice(3) ?? 'untraceable';
            if (originalFunctionResults instanceof Promise) {
                originalFunctionResults.then((fullfilledOutput) => {
                    setTimeout(() => {
                        const endTime = performance.now();
                        featureMetadataPromise.then(featureMetadata => {
                            const executionTime = (endTime - startTime).toFixed(4).concat(' ms');
                            const log = new FunctionLog(executionTime, args, fullfilledOutput, trace);
                            LoggerStateManager.addLog(log, featureMetadata.relatedTo, featureMetadata.featureName);
                        })
                    }, 0);
                })
            } else {
                setTimeout(() => {
                    featureMetadataPromise.then(featureMetadata => {
                        const executionTime = (endTime - startTime).toFixed(4).concat(' ms');
                        const log = new FunctionLog(executionTime, args, originalFunctionResults, trace);
                        LoggerStateManager.addLog(log, featureMetadata.relatedTo, featureMetadata.featureName);
                    })
                }, 0);
            }
            return originalFunctionResults;
        };
    }
}