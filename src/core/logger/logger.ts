import { Tracker } from "../tracker/tracker";
import { trackingConfiguration } from "../tracker/types";

export class Logger {
    static track<T extends object>(target: T, options?: trackingConfiguration): T
    static track<T extends any[], K>(target: (..._: T) => K, options?: trackingConfiguration) {
        if (typeof target === 'object') {
            return Tracker.trackObject(target, options)
        }
        return Tracker.trackFunction(target, options)
    }
    //TODO other functionalities other than track
}
