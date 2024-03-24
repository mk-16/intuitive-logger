import { ObjectLog } from "../../../utils/models/logs/object-log/object-log.js";
import { TrackingOption } from "../../../utils/types/types.js";

export abstract class ObjectTracker {
    public static track<T extends {}>(target: T, options?: TrackingOption) {
        // const scope: ScopeMetadata = {
        //     context: options?.scope?.context ?? CONTEXT.DEBUG,
        //     scopeName: options?.scope?.scopeName ?? 'global',
        // };

        // const featureMetadata: FeatureMetadata = {
        //     context: options?.feature.context ?? CONTEXT.DEBUG,
        //     expiresAfter: options?.feature.expiresAfter ?? 24 * 60 * 60 * 1000,
        //     featureName: options?.feature.featureName ?? randomUUID(),
        // };


        // LoggerStateManager.addScope(scope);
        // LoggerStateManager.addFeature(featureMetadata, scope.scopeName);

        function hasFunctionSignature(target: unknown): target is (..._: any[]) => any {
            return target instanceof Function && typeof target === 'function';
        }
        return new Proxy(target, {
            get<K extends keyof T & string, G extends keyof T & symbol>(target: T, property: K | G) {
                const targetProp = target[property];
                if (hasFunctionSignature(targetProp))
                    // return FunctionTracker.track(targetProp, { feature: featureMetadata, scope });
                return target[property]
            },
            set<K extends keyof T & string, G extends keyof T & symbol>(target: T, property: K | G, newValue: any) {
                const oldVal = target[property];
                target[property] = newValue;
                const trace = new Error().stack?.split('\n')[1].trim().slice(3) ?? 'untraceable';
                const log = new ObjectLog(property, oldVal, newValue, trace);
                // LoggerStateManager.digestor$.next([scope.scopeName, featureMetadata.featureName, log]);
                return true;
            },
        })
    }
}