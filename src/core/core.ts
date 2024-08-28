import { DecoratorHandler } from "../utils/decorators/decorator-handler.js";
import { serializeInputs, serializeOutput } from "../utils/functions/serialize-inputs.js";
import { applyHandler } from "../utils/handlers/apply-handler.js";
import { constructHandler } from "../utils/handlers/construct-handler.js";
import { definePropertyHandler } from "../utils/handlers/define-property-handler.js";
import { ClassConstructorLog, ClassMethodLog, FunctionLog, PropertyLog } from "../utils/log/log.js";
import type { MonitorType } from "../utils/types/globals.js";
import { LoggerWorker } from "../worker/main/main-worker.js";


function createProxyHandler<T extends Function>(this: any, ...args: any[]): ProxyHandler<T> {
    const buffer = new Set();
    const proxyHandler: ProxyHandler<T> = {
        apply: applyHandler.bind(args[0]),
        construct: constructHandler,
        defineProperty: definePropertyHandler,
        deleteProperty(target, property) {
            console.log({ reflect: 'deleteProperty called', property })
            return Reflect.deleteProperty(target, property);
        },
        has(target, property) {
            console.log({ reflect: 'has called', property })
            return Reflect.has(target, property);
        },
        isExtensible(target) {
            console.log({ reflect: 'isExtensible called' })
            return Reflect.isExtensible(target);
        },
        preventExtensions(target) {
            console.log({ reflect: 'preventExtensions called' })
            return Reflect.preventExtensions(target);
        },
        setPrototypeOf(target, prototype) {
            console.log({ reflect: 'setPrototypeOf called' })
            return Reflect.setPrototypeOf(target, prototype);
        },
    }
    return proxyHandler;
}

function MonitorConstructor(...args: [...any]) {

    if (new.target == MonitorConstructor) {
        //function
        if (false) {

        }
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
class T {
    ke;
    constructor(hello: number) {
        this.ke = hello;
    }
    static method(number: 1) { return 8 }
    other() { }
}

const foo1 = new Monitor((param: number) => { });
const foo2 = new Monitor(function (param: number) { }, "someScope");
const foo3 = new Monitor(T, "someScope");
// foo1(1);
// foo2(2);
// new foo3(3);
const foo4 = new Monitor(new foo3(4), "someScope");
// const foo3 = new Monitor({ a: 3, som(a: number) { return 3 } }, "someScope");
// const tt = new foo2(4);
foo3.method(1)
foo4.other();
foo4.ke;
foo4.ke = 6;
// tt.other()
// foo3.a = 4
// foo3.som(55)
// ultimate.other()
// ultimate.ke = 8
// foo.bind({})(1)
// const b = new foo2(7)
// T.name
// b.ke = 3;
// T.method(1);
// // foo(1)
// // foo.a = 3

// // @Monitor({ hello: 1 })
// class myClass {
//     property = 1
// }