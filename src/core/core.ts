import { deserialize, serialize, Serializer } from "v8";
import { DecoratorHandler } from "../utils/decorators/decorator-handler.js";
import { constructHandler } from "../utils/handlers/construct-handler.js";
import { createLog } from "../utils/log/initialize-log.js";
import { ClassConstructorLog, FunctionLog, Log, ObjectLog, PropertyLog } from "../utils/log/log.js";
import { DecoratorLogKind, RegularLogKind } from "../utils/types/enums.js";
import type { MonitorType } from "../utils/types/globals.js";
import { LoggerWorker } from "../worker/main/main-worker.js";
import { serializeInputs, serializeOutput } from "../utils/functions/serialize-inputs.js";


function createProxyHandler<T extends Function>(...args: any[]): ProxyHandler<T> {
    const proxyHandler: ProxyHandler<T> = {
        apply: (target, thisArg, argsArray) => {
            console.log({ reflect: 'set apply', argsArray })
            const log = new FunctionLog();
            log.serializedData = target.toString();
            log.serializedInputs = serializeInputs(argsArray as unknown[]);
            log.startTime = performance.now();
            const output = Reflect.apply(target, thisArg, argsArray);
            log.endTime = performance.now();
            log.stack = new Error().stack;
            if (output instanceof Promise) {
                output.then(data => {
                    log.endTime = performance.now();
                    log.output = data;
                    // LoggerWorker.postLog(log);
                });
                log.output = "Promise";
            }
            // LoggerWorker.postLog(log);
            return output;
        },
        construct: <T extends Function>(target: T extends new (...args: unknown[]) => any ? T : never, argsArray: unknown[], newTarget: Function) => {
            const log = new ClassConstructorLog();
            log.serializedData = target.toString();
            log.serializedInputs = serializeInputs(argsArray as unknown[]);
            log.startTime = performance.now();
            // const output = new target(...argsArray);
            const output = Reflect.construct(target, argsArray, newTarget);
            log.endTime = performance.now();
            log.stack = new Error().stack;
            log.serializedOutput = serializeOutput(output);
            // LoggerWorker.postLog(log);
            return output;
        },
        defineProperty(target, property, attributes) {
            console.log({ reflect: 'defineProperty called', property })
            return Reflect.defineProperty(target, property, attributes);
        },
        deleteProperty(target, property) {
            console.log({ reflect: 'deleteProperty called', property })
            return Reflect.deleteProperty(target, property);
        },
        get: <T extends object>(target: T, property: keyof typeof target, receiver: T) => {
            // console.log({ reflect: 'get called', property })
            const log = new PropertyLog();
            log.serializedData = JSON.stringify(target) ?? target.toString();
            // console.log({ serializeData: log.serializedData, property })
            log.serializedInputs = serializeInputs([property] as unknown[]);
            // , Object.getOwnPropertyDescriptors(target)
            log.startTime = performance.now();
            const output = Reflect.get(target, property, receiver);
            log.endTime = performance.now();
            log.stack = new Error().stack;
            log.serializedOutput = serializeOutput(output);
            // LoggerWorker.postLog(log);

            return output;
        },
        getOwnPropertyDescriptor(target, property) {
            console.log({ reflect: 'getOwnPropertyDescriptor called', property })
            return Reflect.getOwnPropertyDescriptor(target, property);
        },
        getPrototypeOf(target) {
            console.log({ reflect: 'getPrototypeOf called' })
            return Reflect.getPrototypeOf(target);
        },
        has(target, property) {
            console.log({ reflect: 'has called', property })
            return Reflect.has(target, property);
        },
        isExtensible(target) {
            console.log({ reflect: 'isExtensible called' })
            return Reflect.isExtensible(target);
        },
        ownKeys(target) {
            console.log({ reflect: 'ownKeys called' })
            return Reflect.ownKeys(target);
        },
        preventExtensions(target) {
            console.log({ reflect: 'preventExtensions called' })
            return Reflect.preventExtensions(target);
        },
        set: <K extends Record<string | symbol, unknown>>(target: K, property: string | symbol, newValue: unknown, receiver: K) => {
            console.log({ reflect: 'set called', property })
            // if (this instanceof ObjectLog) {
            //     this.previousValue = target[property];
            //     this.currentValue = newValue;
            // }
            // LoggerWorker.postLog(this);
            return Reflect.set(target, property, newValue, receiver);
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

        const serializedData = JSON.stringify(args[0]) ?? args[0].toString();

        // const log = typeof args[0] == "function" ?
        //     new FunctionLog(
        //         serializedData.startsWith('class') ?
        //             DecoratorLogKind.Constructor :
        //             RegularLogKind.Function
        //     ) :
        //     new ObjectLog();

        // console.log(Object.getOwnPropertyDescriptors(args[0]))
        // for (const prop in args[0]) {
        //     console.log({ prop })
        // }

        function chainCrawler<T extends { prototype: T }>(object: T): any {
            console.log({ JIT: Object.getOwnPropertyNames(object ?? {}) }, '\n\n')
            return object?.prototype ? chainCrawler(object.prototype) : null;
        }
        chainCrawler(args[0])
        // console.log({ t: args[0], p: Object.getOwnPropertyNames(args[0].prototype ?? {}) })
        for (const prop2 in args[0].prototype) {
            console.log({ prop2 })
        }
        return new Proxy(args.shift(), {

        });

    }
    return DecoratorHandler
}
export const Monitor = MonitorConstructor as MonitorType;
class T {
    ke;
    constructor(hello: number) {
        this.ke = hello;
    }
    static method() { }
    other() { }
}
// const foo = new Monitor((param: number) => { })
// foo()
// function t(a: any) { return true };
// const foo = new Monitor(function () { }, "someScope");
const foo2 = new Monitor(T, "someScope");
// const ultimate = new Monitor(new foo2(4), "someScope");
// const foo3 = new Monitor({ a: 3, som() { } }, "someScope");
foo2.method()
// const tt = new foo2(4);
// tt.other()
// foo3.a
// foo3.som()
// ultimate.other()
// foo.bind({})(1)
// const b = new foo2(7)
// T.name
// b.ke = 5;
// console.log(b)
// T.method();

// foo();
// foo(1)
// foo.a = 3

// @Monitor({ hello: 1 })
class myClass {
    property = 1
}