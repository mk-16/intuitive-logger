import { TrackingOption } from "../../utils/types/types.js";
import { LoggerStateManager } from "../state-manager/state-manager.js";
import { FunctionTracker } from "../trackers/function-tracker/function-tracker.js";
import { ObjectTracker } from "../trackers/object-tracker/object-tracker.js";

export abstract class Logger {

    public static get snapshot() {
        return LoggerStateManager.snapshot;
    }
    
    public static getFeatureSnapshot(feature: string) {
        return LoggerStateManager.getFeatureSnapshot(feature);
    }

    public static track<T extends object>(target: T, options?: TrackingOption): T
    public static track<T extends any[], K>(target: (..._: T) => K, options?: TrackingOption) {
        if (typeof target === 'object')
            return ObjectTracker.track(target, options);
        return FunctionTracker.track(target, options);
    }
}
