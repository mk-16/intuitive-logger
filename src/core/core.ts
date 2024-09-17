import { DecoratorHandler } from "../utils/decorators/decorator-handler.js";
import { applyHandler } from "../utils/handlers/apply-handler/apply-handler.js";
import { constructHandler } from "../utils/handlers/construct-handler/construct-handler.js";
import { definePropertyHandler } from "../utils/handlers/define-property-handler/define-property-handler.js";
import { deletePropertyHandler } from "../utils/handlers/delete-property-handler/delete-property-handler.js";
import { Log } from "../utils/log/log.js";
import { AsyncModes } from "../utils/types/enums.js";
import type { MonitorType } from "../utils/types/globals.js";
import { LoggerWorker } from "../worker/main/main-worker.js";
import { LoggerConfiguration, MonitorOptions } from "./logger.js";
function getTargetProperties<T extends { prototype: T }>(target: T): (keyof T)[] {
    return Object.getOwnPropertyNames(target) as (keyof T)[]
}


function createProxyHandler<T extends Function>(monitorOptions: Partial<MonitorOptions> = LoggerConfiguration.options, type: "function" | "method" = "method"): ProxyHandler<T> {
    const proxyHandler: ProxyHandler<T> = {
        apply: applyHandler.bind({ options: monitorOptions, type }),
        construct: constructHandler.bind(monitorOptions),
        defineProperty: definePropertyHandler.bind(monitorOptions),
        deleteProperty: deletePropertyHandler.bind(monitorOptions),
    }
    return proxyHandler
}

function MonitorConstructor<T extends Function>(...args: [Partial<MonitorOptions> | undefined] | [T, Partial<MonitorOptions> | undefined]) {
    if (new.target == MonitorConstructor) {
        if (typeof args[0] == "function") {
            const handler = createProxyHandler(args[1], "function")
            return new Proxy(args.shift() as T, handler);
        }


        const handler = createProxyHandler(args[1]);
        function chainCrawler<T extends { prototype: T }>(object: T): any {
            for (const property of getTargetProperties(object)) {
                if (typeof object[property] == "function") {
                    // console.log(object[property], handler.apply)
                    object[property] = new Proxy(object[property], handler) as any;
                }
            }
            console.log(object.prototype)
            return object?.prototype ? chainCrawler(object.prototype) : null
        }
        chainCrawler(args[0] as T);
        // console.log({ handler })
        return new Proxy(args.shift() as T, handler);
    }
    return DecoratorHandler.bind(args[0] as (Partial<MonitorOptions> | undefined))
}
export const Monitor = MonitorConstructor as MonitorType;
// export const Logger = LoggerWorker.logStream;
// enum Level {
//     Info = 0,
//     Warning,
//     Fatal
// }

// const monitorOptions: Partial<MonitorOptions> = {
//     level: Level.Warning,
//     // hide: ["options"],
//     async: AsyncModes.results,
//     mode: "user"
// };
// LoggerConfiguration.options.hide = ["tag"];
// //  {
// //     post: [{
// //         url: "http://localhost:4000/api/test",
// //         headers: { "Content-Type": "application/json" },
// //     }],
// //     mode: "local",
// //     level: LogLevel.WARNING,
// //     tag: "event",
// //     async: "results",
// //     extension: { id: randomUUID() },
// //     hide: ["extension", "environments"],
// //     environments: process.env,
// // }

// class myClass {
//     title = "title";
//     @Monitor(monitorOptions)
//     lateMethod() {
//         return new Promise(resolve => setTimeout(() => {
//             resolve(true);
//         }, 300))
//     }
// }

// Logger.subscribe(console.log);
// LoggerConfiguration.options.level = 1;
// new myClass().lateMethod();
enum LogLevel {
    Info = 0,
    Warning,
    Fatal
}
LoggerConfiguration.levels = Object.values(LogLevel).filter(value => typeof value == "string");
LoggerConfiguration.options.async = "results";

class MyClass {
    // @Monitor({ async: "results", mode: "local", level: LogLevel.Warning })
    async foo(name: string) {
        return new Promise(resolve => setTimeout(() => resolve(3), 300));
    }
}

const m = new MyClass();
// m.foo("cunt");

// const foo = new Monitor({ method: (name: string) => 1231 })
const ctor = new Monitor(new MyClass())
console.log(ctor.foo("test"))