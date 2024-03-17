import { CONTEXT } from "../../../../index.js";
import { LogsMetadata } from "../../../../utils/types/types.js";
import { LoggerStateManager } from "../../../state-manager/state-manager.js";

export abstract class LegacyDecoratorTracker {

    public static decorate(options?: Partial<LogsMetadata>) {

        // target: any, context: DecoratorContext, options?: LogsFeature
        // const config: LogsFeature = { expiresAfter: 30*1000, logContext: LOG_LEVEL.INFO,...options };
        return (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) => {
            const { context, expiresAfter } = options ?? {};
            const scopeName = target.name ?? target.constructor.name;

            if (!propertyKey && !descriptor) {
                LoggerStateManager.addScope({ scopeName, context: context ?? CONTEXT.INFO, expiresAfter: expiresAfter ?? 24 * 60 * 60 * 1000 });
            } else {
                LoggerStateManager.addScope({ scopeName, context: CONTEXT.INFO, expiresAfter: 24 * 60 * 60 * 1000 });
            }

            if (propertyKey) {
                const feature = { featureName: propertyKey, context: context ?? CONTEXT.INFO, expiresAfter: expiresAfter ?? 24 * 60 * 60 * 1000 };
                LoggerStateManager.addFeature(feature, scopeName);
            }

            console.log({ snapshot: LoggerStateManager.snapshot['Myclass'].map });

        };
    }
}
