import { LoggerStateManager } from "../state-manager/state-manager.js";
import { FunctionTracker } from "../trackers/function-tracker/function-tracker.js";
import { LegacyDecoratorTracker } from "../trackers/decorator-tracker/legacy-decorator-tracker/legacy-decorator-tracker.js";
import { ModernDecoratorTracker } from "../trackers/decorator-tracker/modern-decorator-tracker/modern-decorator-tracker.js";
import { ObjectTracker } from "../trackers/object-tracker/object-tracker.js";

export abstract class Logger {

    public static get snapshot() {
        return LoggerStateManager.snapshot;
    }
    public static getFeatureSnapshot(feature: string) {
        return LoggerStateManager.getFeatureSnapshot(feature);
    }
    
    public static track<T extends object>(target: T, options?: any): T
    public static track<T extends any[], K>(target: (..._: T) => K, options?: any) {
        if (typeof target === 'object')
            return ObjectTracker.track(target, options);
        return FunctionTracker.track(target, options);
    }

    public static decorate(configuration?: any) {
        return function decorator(target: any, context?: DecoratorContext | string, descriptor?: PropertyDescriptor) {
            const isLegacyDecorator = typeof context === 'string' || typeof context === 'symbol' || typeof context === 'undefined';
            if (isLegacyDecorator)
                return LegacyDecoratorTracker.track(target, context, descriptor, configuration);
            return ModernDecoratorTracker.track(target, context, configuration);
        }
    }
}
