import { applyHandler } from "../handlers/apply-handler/apply-handler.js";
import { constructHandler } from "../handlers/construct-handler/construct-handler.js";
import { MonitorOptions } from "../types/globals.js";

export function modernDecorator<T extends object>(this: Partial<MonitorOptions> | undefined, target: T, context: DecoratorContext) {
    if (context.kind == 'class') {
        return new Proxy(target, {
            construct: constructHandler.bind(this),
        })
    }
    return new Proxy(target, {
        apply: applyHandler.bind({ ...this, context: { ...this?.context, source: "method" } }),
    })
}