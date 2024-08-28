import { DecoratorHandler } from "../utils/decorators/decorator-handler.js";
import { applyHandler } from "../utils/handlers/apply-handler.js";
import { constructHandler } from "../utils/handlers/construct-handler.js";
import { definePropertyHandler } from "../utils/handlers/define-property-handler.js";
import { deletePropertyHandler } from "../utils/handlers/delete-property-handler.js";
import type { MonitorType } from "../utils/types/globals.js";


function createProxyHandler<T extends Function>(this: any, ...args: any[]): ProxyHandler<T> {
    const proxyHandler: ProxyHandler<T> = {
        apply: applyHandler.bind(args[0]),
        construct: constructHandler,
        defineProperty: definePropertyHandler,
        deleteProperty: deletePropertyHandler,
    }
    return proxyHandler;
}

function MonitorConstructor(...args: [...any]) {

    if (new.target == MonitorConstructor) {
        function getTargetProperties<T extends { prototype: T }>(target: T): (keyof T)[] {
            return Object.getOwnPropertyNames(target) as (keyof T)[]
        }
        function chainCrawler<T extends { prototype: T }>(object: T): any {
            for (const property of getTargetProperties(object)) {
                if (typeof object[property] == "function") {
                    object[property] = new Proxy(object[property], createProxyHandler('method'))
                }
            }
            return object?.prototype ? chainCrawler(object.prototype) : null;
        }
        chainCrawler(args[0])
        return new Proxy(args.shift(), createProxyHandler());

    }
    return DecoratorHandler
}
export const Monitor = MonitorConstructor as MonitorType;