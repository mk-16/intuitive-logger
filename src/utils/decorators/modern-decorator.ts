import { MonitorOptions } from "../../core/logger.js";
import { applyHandler } from "../handlers/apply-handler/apply-handler.js";
import { constructHandler } from "../handlers/construct-handler/construct-handler.js";

export function modernDecorator<T extends object>(this: { options: Partial<MonitorOptions>, type: "method" }, target: T, context: DecoratorContext) {
    if (context.kind == 'class') {
        return new Proxy(target, {
            construct: constructHandler.bind(this.options),
        })
    }
    return new Proxy(target, {
        apply: applyHandler.bind(this),
    })
}