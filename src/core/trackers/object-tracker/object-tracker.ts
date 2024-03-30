// import { randomUUID } from "crypto";
// import { FeatureMetadata, TrackingOption } from "../../../utils/types/types.js";
// import { ParentWorker } from "../../workers/parent-worker/parent-worker.js";
// import { FunctionTracker } from "../function-tracker/function-tracker.js";
// import { ObjectLog } from "../../../utils/models/logs/object-log/object-log.js";

// export abstract class ObjectTracker {
//     public static track<T extends {}>(target: T, options?: TrackingOption) {
//         const featureName = options?.featureName ?? randomUUID();
//         const expiresAfter = options?.expiresAfter ?? 24 * 60 * 60 * 1000;
//         const relatedTo = options?.relatedTo ?? 'global'
//         const enrichedOptions: FeatureMetadata = {
//             expiresAfter,
//             relatedTo,
//             featureName
//         }
//         setTimeout(() => {
//             ParentWorker.addFeature(enrichedOptions);
//         }, 0);
//         function hasFunctionSignature(target: unknown): target is (..._: any[]) => any {
//             return target instanceof Function && typeof target === 'function';
//         }

//         return new Proxy(target, {
//             get<K extends keyof T & string, G extends keyof T & symbol>(target: T, property: K | G) {
//                 const targetProp = target[property];
//                 if (hasFunctionSignature(targetProp))
//                     return FunctionTracker.track(targetProp, enrichedOptions);
//                 return target[property]
//             },
//             set<K extends keyof T & string, G extends keyof T & symbol>(target: T, property: K | G, newValue: any) {
//                 const oldVal = target[property];
//                 target[property] = newValue;
//                 const trace = new Error().stack?.split('\n')[2].trim().slice(3) ?? 'untraceable'
//                 setTimeout(() => {
//                     let log;
//                     if (hasFunctionSignature(newValue)) {
//                         log = new ObjectLog(trace, property, oldVal, newValue.name == '' ? 'anonymous function' : newValue.name);
//                     } else {
//                         log = new ObjectLog(trace, property, oldVal, newValue);
//                     }
//                     ParentWorker.addLog(log, enrichedOptions.relatedTo, enrichedOptions.featureName)

//                 }, 0);
//                 return true;
//             },
//         })
//     }
// }




import { randomUUID } from "crypto";
import { FeatureMetadata, TrackingOption } from "../../../utils/types/types.js";
import { ParentWorker } from "../../workers/parent-worker/parent-worker.js";
import { FunctionTracker } from "../function-tracker/function-tracker.js";
import { ObjectLog } from "../../../utils/models/logs/object-log/object-log.js";

export abstract class ObjectTracker {
    public static track<T extends {}>(target: T, options?: TrackingOption) {
        const featureName = options?.featureName ?? randomUUID();
        const expiresAfter = options?.expiresAfter ?? 24 * 60 * 60 * 1000;
        const relatedTo = options?.relatedTo ?? 'global'
        const enrichedOptions: FeatureMetadata = {
            expiresAfter,
            relatedTo,
            featureName
        }

        function hasFunctionSignature(target: unknown): target is (..._: any[]) => any {
            return target instanceof Function && typeof target === 'function';
        }
        const propertiesToLog = new Set(Object.getOwnPropertyNames(target));
        setTimeout(() => {
            propertiesToLog.forEach(property => {
                ParentWorker.addFeature({ ...enrichedOptions, featureName: property });
            })
        }, 0);
        return new Proxy(target, {
            get<K extends keyof T & string, G extends keyof T & symbol>(target: T, property: K | G) {
                const targetProp = target[property];
                if (hasFunctionSignature(targetProp))
                    return FunctionTracker.track(targetProp, enrichedOptions);
                return target[property]
            },
            set<K extends keyof T & string, G extends keyof T & symbol>(target: T, property: K | G, newValue: any) {
                const oldVal = target[property];
                target[property] = newValue;
                const trace = new Error().stack?.split('\n')[2].trim().slice(3) ?? 'untraceable'
                if (propertiesToLog.has(property.toString())) {
                    setTimeout(() => {
                        let log;
                        if (hasFunctionSignature(newValue)) {
                            log = new ObjectLog(trace, oldVal, newValue.name == '' ? 'anonymous function' : newValue.name);
                        } else {
                            log = new ObjectLog(trace, oldVal, newValue);
                        }
                        ParentWorker.addLog(log, enrichedOptions.relatedTo, property.toString())

                    }, 0);
                }
                return true;
            },
        })
    }
}