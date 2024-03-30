import { FunctionLog } from "../../../../utils/models/logs/function-log/function-log.js";
import { FeatureMetadata } from "../../../../utils/types/types.js";
import { ParentWorker } from "../../../workers/parent-worker/parent-worker.js";
import { FunctionTracker } from "../../function-tracker/function-tracker.js";
import { ObjectTracker } from "../../object-tracker/object-tracker.js";

export abstract class LegacyDecoratorTracker {
    static dec: symbol = Symbol('dec')
    public static decorate(options?: Partial<FeatureMetadata>) {
        return function <T extends typeof Function>(target: T, propertyKey: string, descriptor: PropertyDescriptor): void | any {
            const scopeName = target.name ?? target.constructor.name;
            const featureName = propertyKey;
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
            }
        };
    }
}
