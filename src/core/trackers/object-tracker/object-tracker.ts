import { randomUUID } from "crypto";
import { LOG_LEVEL } from "../../../utils/models/enums/log-level/log-level.js";
import { ObjectLog } from "../../../utils/models/logs/object-log/object-log.js";
import { minutes } from "../../../utils/to-new-lib/time-units/index.js";
import { TrackOptions } from "../../../utils/types/types.js";
import { LoggerStateManager } from "../../state-manager/state-manager.js";

export abstract class ObjectTracker {
    public static track(target: { [key: string | symbol | number]: any }, options?: TrackOptions) {
        const trackingOptions = options ?? {
            trackByName: randomUUID(),
            logContext: LOG_LEVEL.INFO,
            expiresAfter: minutes(60),
        };
        LoggerStateManager.setContext(trackingOptions);

        return new Proxy(target, {
            get(target, property) {
                // if (target[property] instanceof Function)
                // return FunctionTracker.track(target[property].bind(target), { trackByName });
                return target[property]
            },
            set(target, property, newValue) {
                const oldVal = target[property];
                target[property] = newValue;
                const log = new ObjectLog(property, newValue, oldVal);
                LoggerStateManager.digestor$.next([trackingOptions.trackByName, log]);
                return true;
            },
        })
    }
}