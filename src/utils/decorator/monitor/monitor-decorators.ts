import { MonitoringOptions } from "../../types/monitoring-options.js";
import { clearExceptionTimers } from "../timer/timer.js";

export function legacyClassDecorator<T extends object>(target: T) {
    console.log({ kind: "legacy", args: arguments })
    clearExceptionTimers(target);
}

export function modernClassDecorator<T extends object>(target: T, context: ClassFieldDecoratorContext) {
    // console.log({ kind: "modern", args: arguments })
    // console.log({ test:  })
    // console.log({ mii: target.constructor[Symbol.] })
    const properties = Object.getOwnPropertyDescriptors((target as any).prototype);
    for (const property in properties) {
        // console.log((target as any)[property])
        if ((target as any)[property] instanceof Function) {
            // console.log(Reflect.getMetadataKeys((target as any)[property]))

        }
    }
    // console.log(Reflect.getMetadataKeys(target.constructor.prototype))
    clearExceptionTimers(target);
}

