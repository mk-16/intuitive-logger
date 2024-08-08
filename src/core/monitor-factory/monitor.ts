import { MonitorDecorator } from "../../utils/decorator/factory/decorator-factory.js";
import { inferDecorator } from "../../utils/decorator/infer/infer-decorator.js";
import type { Monitor } from "../../utils/types/monitor.js";
import { MonitoringOptions } from "../../utils/types/monitoring-options.js";

@inferDecorator
class Defer { }
const kind: "modern-decorator" | "legacy-decorator" = Reflect.getMetadata("design:kind", Defer);

function MonitorConstructorGuard<T>(target: unknown, args: unknown): args is T {
    return target === MonitorConstructor
}

function MonitorConstructor<T extends object>(arg_0: T | MonitoringOptions, arg_1?: MonitoringOptions): T | typeof MonitorDecorator {
    if (MonitorConstructorGuard<T>(new.target, arg_0)) {
        //todo add handler
        const proxy = new Proxy<T>(arg_0, {
            "get":(...args:any[]) => {
                console.log("args", args);
                // return true
            }
        });
        return proxy;
    }
    const timers: number[] = Reflect.getMetadata('error:timer', arg_0) ?? [];
    // const params:
    for (const timer of timers) {
        clearTimeout(timer);
        // timers.push(exceptionThrowTimer(message));
        // Reflect.defineMetadata('error:timer', timers, target.constructor);
    }
    return MonitorDecorator.build(kind).bind({ options: arg_0 })
};

const Monitor = MonitorConstructor as Monitor;
export { Monitor };

