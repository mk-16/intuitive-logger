import { DecoratorHandler } from "../utils/decorators/decorator-handler.js";
import { applyHandler } from "../utils/handlers/apply-handler.js";
import { constructHandler } from "../utils/handlers/construct-handler.js";
import { definePropertyHandler } from "../utils/handlers/define-property-handler.js";
import { deletePropertyHandler } from "../utils/handlers/delete-property-handler.js";
function createProxyHandler(...args) {
    const proxyHandler = {
        apply: applyHandler.bind(args[0]),
        construct: constructHandler,
        defineProperty: definePropertyHandler,
        deleteProperty: deletePropertyHandler,
    };
    return proxyHandler;
}
function MonitorConstructor(...args) {
    if (new.target == MonitorConstructor) {
        function getTargetProperties(target) {
            return Object.getOwnPropertyNames(target);
        }
        function chainCrawler(object) {
            for (const property of getTargetProperties(object)) {
                if (typeof object[property] == "function") {
                    object[property] = new Proxy(object[property], createProxyHandler('method'));
                }
            }
            return object?.prototype ? chainCrawler(object.prototype) : null;
        }
        chainCrawler(args[0]);
        return new Proxy(args.shift(), createProxyHandler());
    }
    return DecoratorHandler;
}
export const Monitor = MonitorConstructor;
//# sourceMappingURL=core.js.map