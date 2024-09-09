import { DecoratorHandler } from "../utils/decorators/decorator-handler.js";
import { applyHandler } from "../utils/handlers/apply-handler/apply-handler.js";
import { constructHandler } from "../utils/handlers/construct-handler/construct-handler.js";
import { definePropertyHandler } from "../utils/handlers/define-property-handler/define-property-handler.js";
import { deletePropertyHandler } from "../utils/handlers/delete-property-handler/delete-property-handler.js";
import type { MonitorOptions, MonitorType } from "../utils/types/globals.js";

function createProxyHandler<T extends Function>(monitorOptions: Partial<MonitorOptions> | undefined): ProxyHandler<T> {
    const proxyHandler: ProxyHandler<T> = {
        apply: applyHandler.bind({ ...monitorOptions, context: { ...monitorOptions?.context, source: "method" } }),
        construct: constructHandler.bind(monitorOptions),
        defineProperty: definePropertyHandler.bind(monitorOptions),
        deleteProperty: deletePropertyHandler.bind(monitorOptions),
    }
    return proxyHandler;
}

function MonitorConstructor<T extends Function>(...args: [Partial<MonitorOptions> | undefined] | [T, Partial<MonitorOptions> | undefined]) {
    if (new.target == MonitorConstructor) {
        function getTargetProperties<T extends { prototype: T }>(target: T): (keyof T)[] {
            return Object.getOwnPropertyNames(target) as (keyof T)[]
        }
        const handler = createProxyHandler(args[1])

        function chainCrawler<T extends { prototype: T }>(object: T): any {
            for (const property of getTargetProperties(object)) {
                if (typeof object[property] == "function") {
                    object[property] = new Proxy(object[property], handler) as any;
                }
            }
            return object?.prototype ? chainCrawler(object.prototype) : null;
        }
        chainCrawler(args[0] as T);
        return new Proxy(args.shift() as T, handler);

    }
    return DecoratorHandler.bind(args[0] as (Partial<MonitorOptions> | undefined))
}
export const Monitor = MonitorConstructor as MonitorType;