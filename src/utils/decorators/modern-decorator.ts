import { applyHandler } from "../handlers/apply-handler.js";
import { constructHandler } from "../handlers/construct-handler.js";

export function modernDecorator<T extends object>(target: T, context: DecoratorContext) {
    if (context.kind == 'class')
        return new Proxy(target, {
            construct: constructHandler.bind(context.name),
        })
    return new Proxy(target, {
        apply: applyHandler.bind('method'),
    })
}