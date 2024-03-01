import path from "path";
import { Tracker } from "../tracker/tracker.js";
import { UUID } from "crypto";
import { BaseLog } from "../../models/logs/base-log/base-log.js";

export abstract class Logger {
    static {
        console.log('logger is initializing...');
    }

    public static track<T extends object>(target: T, options?: any): T
    public static track<T extends any[], K>(target: (..._: T) => K, options?: any) {
        if (typeof target === 'object') {
            return Tracker.trackObject(target, options)
        }
        return Tracker.trackFunction(target, options)
    }

    public static decorate(configuration?: any) {
        return function decorator(target: any, context?: DecoratorContext | string, descriptor?: PropertyDescriptor) {
            const isLegacyDecorator = typeof context === 'string' || typeof context === 'symbol' || typeof context === 'undefined';
            if (isLegacyDecorator)
                return Tracker.trackLegacyDecorator(target, context, descriptor, configuration);
            return Tracker.trackModernDecorator(target, context, configuration);
        }
    }
}
