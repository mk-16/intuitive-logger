import { TrackingOption } from "../../utils/types/types.js";
import { LoggerStateManager } from "../state-manager/state-manager.js";
import { generateFeatureSnapshot } from "../state-manager/utils/generateFeatureSnapshot.js";
import { generateScopeSnapshot } from "../state-manager/utils/generateScopeSnapshot.js";
import { generateStateSnapshot } from "../state-manager/utils/generateStateSnapshot.js";
import { FunctionTracker } from "../trackers/function-tracker/function-tracker.js";
import { ObjectTracker } from "../trackers/object-tracker/object-tracker.js";

export abstract class Logger {

    public static get snapshot() {
        return generateStateSnapshot(LoggerStateManager.state);
    }

    public static getScopeSnapshot(scopeName: string) {
        const featuresMap = LoggerStateManager.state.get(scopeName);
        if (featuresMap)
            return generateScopeSnapshot(featuresMap)
    }

    public static getFeatureSnapshot(featureName: string, relatedTo: string) {
        const featuresMap = LoggerStateManager.state.get(relatedTo);
        if (featuresMap) {
            const feature = featuresMap.get(featureName);
            if (feature)
                return generateFeatureSnapshot(feature)
        }
    }

    public static track<T extends object>(target: T, options?: TrackingOption): T
    public static track<T extends any[], K>(target: (..._: T) => K, options?: TrackingOption) {
        if (typeof target === 'object')
            return ObjectTracker.track(target, options);
        return FunctionTracker.track(target, options);
    }
}
