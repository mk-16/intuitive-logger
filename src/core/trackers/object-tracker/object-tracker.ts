import { randomUUID } from "crypto";
import { LOG_LEVEL } from "../../../utils/models/enums/log-level/log-level.js";
import { ObjectLog } from "../../../utils/models/logs/object-log/object-log.js";
import { LogsFeature } from "../../../utils/types/types.js";
import { LoggerStateManager } from "../../state-manager/state-manager.js";
import { FunctionTracker } from "../function-tracker/function-tracker.js";

export abstract class ObjectTracker {
    public static track<T extends {}>(target: T, options?: Partial<LogsFeature>) {
        const trackingOptions = {
            trackByName: randomUUID(),
            logContext: LOG_LEVEL.INFO,
            expiresAfter: 60 * 60 * 1000,
            ...options
        };
        LoggerStateManager.addFeature(trackingOptions);
        function hasFunctionSignature(target: unknown): target is (..._: any[]) => any {
            return target instanceof Function && typeof target === 'function';
        }
        return new Proxy(target, {
            get<K extends keyof T & string, G extends keyof T & symbol>(target: T, property: K | G) {
                const targetProp = target[property];
                if (hasFunctionSignature(targetProp))
                    return FunctionTracker.track(targetProp, trackingOptions);
                return target[property]
            },
            set<K extends keyof T & string, G extends keyof T & symbol>(target: T, property: K | G, newValue: any) {
                const oldVal = target[property];
                target[property] = newValue;
                const log = new ObjectLog(property, oldVal, newValue);
                LoggerStateManager.digestor$.next([trackingOptions.trackByName, log]);
                return true;
            },
        })
    }
}