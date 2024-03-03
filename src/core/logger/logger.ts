import { FunctionTracker } from "../trackers/function-tracker/function-tracker.js";
import { LegacyDecoratorTracker } from "../trackers/legacy-decorator-tracker/legacy-decorator-tracker.js";
import { ModernDecoratorTracker } from "../trackers/modern-decorator-tracker/modern-decorator-tracker.js";
import { ObjectTracker } from "../trackers/object-tracker/object-tracker.js";

export abstract class Logger {
    static {
        console.log('logger is initializing...');
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
