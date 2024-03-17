import { randomUUID } from "crypto";
import { CONTEXT } from "../../../../index.js";
import { FeatureMetadata } from "../../../../utils/types/types.js";

export class ModernDecoratorTracker {
    public static decorate(options: FeatureMetadata) {
        // target: any, context: DecoratorContext, options?: LogsFeature
        // const config: LogsFeature = { expiresAfter: 30 * 1000, logContext: LOG_LEVEL.INFO, trackByName: randomUUID(), ...options };
        return ( ..._rest: any[]) => {
            // console.log({ target, context, name: target?.name ?? target?.constructor.name});
            // console.log(Object.getOwnPropertyNames(target));
            console.log(_rest)
            // if (target instanceof Object) {
            //     // console.log(Object.getOwnPropertyNames(target?.prototype ?? target));
            //     // console.log(Object.getOwnPropertyDescriptors(target?.prototype ?? {}))
            // }
        };
    }
}
