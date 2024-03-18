import { randomUUID } from "crypto";
import { CONTEXT } from "../../../utils/models/enums/log-level/log-level.js";
import { ObjectLog } from "../../../utils/models/logs/object-log/object-log.js";
import { FeatureMetadata, ScopeMetadata, TrackingOption } from "../../../utils/types/types.js";
import { LoggerStateManager } from "../../state-manager/state-manager.js";
import { FunctionTracker } from "../function-tracker/function-tracker.js";

export abstract class ObjectTracker {
    public static track<T extends {}>(target: T, options?: TrackingOption) {
        const scope: ScopeMetadata = {
            persist: options?.scope?.persist ?? false,
            context: options?.scope?.context ?? CONTEXT.DEBUG,
            expiresAfter: options?.scope?.expiresAfter ?? 24 * 60 * 60 * 1000,
            scopeName: options?.scope?.scopeName ?? 'global',
        };

        const featureMetadata: FeatureMetadata = {
            persist: options?.feature.persist ?? false,
            context: options?.feature.context ?? CONTEXT.DEBUG,
            expiresAfter: options?.feature.expiresAfter ?? 24 * 60 * 60 * 1000,
            featureName: options?.feature.featureName ?? randomUUID(),
        };


        LoggerStateManager.addScope(scope);
        LoggerStateManager.addFeature(featureMetadata, scope.scopeName);

        function hasFunctionSignature(target: unknown): target is (..._: any[]) => any {
            return target instanceof Function && typeof target === 'function';
        }
        return new Proxy(target, {
            get<K extends keyof T & string, G extends keyof T & symbol>(target: T, property: K | G) {
                const targetProp = target[property];
                if (hasFunctionSignature(targetProp))
                    return FunctionTracker.track(targetProp, { feature: featureMetadata, scope });
                return target[property]
            },
            set<K extends keyof T & string, G extends keyof T & symbol>(target: T, property: K | G, newValue: any) {
                const oldVal = target[property];
                target[property] = newValue;
                const log = new ObjectLog(property, oldVal, newValue);
                LoggerStateManager.digestor$.next([scope.scopeName, featureMetadata.featureName, log]);
                return true;
            },
        })
    }
}