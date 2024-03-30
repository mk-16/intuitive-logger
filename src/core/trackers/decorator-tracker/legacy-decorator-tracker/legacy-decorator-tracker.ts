import { FunctionLog } from "../../../../utils/models/logs/function-log/function-log.js";
import { FeatureMetadata } from "../../../../utils/types/types.js";
import { ParentWorker } from "../../../workers/parent-worker/parent-worker.js";
import { FunctionTracker } from "../../function-tracker/function-tracker.js";
import { ObjectTracker } from "../../object-tracker/object-tracker.js";
export abstract class LegacyDecoratorTracker {
    public static decorate(options?: Partial<FeatureMetadata>) {
        // console.log('DECORATOR CALLED')
        return function <T extends { new <K>(...args: any[]): K }>(target: T, propertyKey?: string, descriptor?: PropertyDescriptor): void | any {
            const scopeName = options?.relatedTo ?? target.name ?? target.constructor.name;
            const featureName = options?.featureName ?? propertyKey ?? scopeName;
            const expiresAfter = options?.expiresAfter ?? 24 * 60 * 60 * 1000;
            const enrichedOptions: FeatureMetadata = {
                relatedTo: scopeName,
                featureName,
                expiresAfter
            }

            const features = Object.getOwnPropertyDescriptors((target as any)['constructor']);
            console.log({ features, target })

            setTimeout(() => {
                // ParentWorker.addFeature(enrichedOptions)
            }, 0);

            if (propertyKey && descriptor) {
                descriptor.value = FunctionTracker.track(descriptor.value, enrichedOptions);
            } else if (!propertyKey && !descriptor) {

                function constructor(...args: any[]) {
                    const start = performance.now();
                    const instance = Reflect.construct(target, args);

                    const end = performance.now();
                    const executionTime = (end - start).toFixed(4).concat(' ms');
                    const trace = new Error().stack?.split('\n')[3].trim().slice(3) ?? 'untraceable';
                    setTimeout(() => {
                        const log = new FunctionLog(trace, executionTime, args, `[${target.toString().split('{')[0]}]`);
                        // ParentWorker.addLog(log, scopeName, featureName);
                    }, 0);
                    return target;
                }
                Reflect.defineProperty(constructor, 'name', {
                    value: target.toString().split('{')[0]
                });
                // console.log(constructor())

                Object.setPrototypeOf(constructor, target);

                return constructor;
            } else {
                const features = Object.getOwnPropertyDescriptors(target as any);
                const descriptor: PropertyDescriptor = {
                    configurable: false,
                    enumerable: true,
                    get() {
                        return 3
                    },
                    set(value: any) {
                        console.log('ffs', value);

                    }
                }
                return descriptor;
                // console.log({
                // features,
                // target,
                // keys: Object.keys(target),
                // setter: (target as any)['setter'],
                // ctor: Object.getOwnPropertyDescriptors(target['constructor'])
                // })

                // const syms = Object.getOwnPropertySymbols(target)
                // console.log({ syms })
                // const trackedSettter = FunctionTracker.track((value: any) => {
                //     (target as any)[propertyKey!] = value;
                // })
                // Object.defineProperty(target, propertyKey!, {
                //     get() { 3 },
                //     set: trackedSettter
                // })


                // console.log({ target: Object.keys(target) })
                // const error = new Error();
                // error.name = 'Syntax Error =>';
                // error.message = ` Cannot use @Log decorator directly on property,
                // if you want to log property changes, set 
                // class decorator to report property updates by
                // setting reportPropertiesUpdates array to the properties
                // you want to log or ['*'] to log all properties,
                // set the value for null to avoid logs for properties change.\n\n`;
                // error.stack = error.name + error.message + "Trace => " + error.stack?.split('\n')[10].trim().slice(3) ?? 'untraceable';

                // throw error;
            }
        };
    }
}
