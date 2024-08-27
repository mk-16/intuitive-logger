import { DecoratorHandler } from "../utils/decorators/decorator-handler.js";
import { serializeInputs, serializeOutput } from "../utils/functions/serialize-inputs.js";
import { ClassConstructorLog, ClassMethodLog, FunctionLog, PropertyLog } from "../utils/log/log.js";
import type { MonitorType } from "../utils/types/globals.js";
import { LoggerWorker } from "../worker/main/main-worker.js";


function createProxyHandler<T extends Function>(this: any, ...args: any[]): ProxyHandler<T> {
    const buffer = new Set();
    const proxyHandler: ProxyHandler<T> = {
        apply: (target, thisArg, argsArray) => {
            const log = args[1] == 'method' ? new ClassMethodLog() : new FunctionLog();
            log.serializedData = target.toString();
            log.serializedInputs = serializeInputs(argsArray as unknown[]);
            log.startTime = performance.now();
            const output = Reflect.apply(target, thisArg, argsArray);
            log.endTime = performance.now();
            log.serializedOutput = serializeOutput(output);
            log.stack = new Error().stack;
            if (output instanceof Promise) {
                output.then(data => {
                    log.endTime = performance.now();
                    log.output = data;
                    LoggerWorker.postLog(log);
                });
                log.output = "Promise";
            }
            LoggerWorker.postLog(log);
            return output;
        },
        construct: <T extends Function>(target: T extends new (...args: unknown[]) => any ? T : never, argsArray: unknown[], newTarget: Function) => {
            const log = new ClassConstructorLog();
            log.serializedData = target.toString();
            log.serializedInputs = serializeInputs(argsArray as unknown[]);
            log.startTime = performance.now();
            buffer.add(target);
            const output = Reflect.construct(target, argsArray, newTarget);
            log.endTime = performance.now();
            log.stack = new Error().stack;
            log.serializedOutput = serializeOutput(output);
            LoggerWorker.postLog(log);
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
            if (typeof target[property] == 'function' || args[0] == "crawler" || buffer.size > 0) {
                buffer.clear();
                return Reflect.get(target, property, receiver);;
            }
            const log = new PropertyLog();
            log.serializedData = property.toString();
            log.startTime = performance.now();
            const output = Reflect.get(target, property, receiver);
            log.endTime = performance.now();
            log.stack = new Error().stack;
            log.serializedOutput = serializeOutput(output);
            LoggerWorker.postLog(log);
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

        function getTargetProperties<T extends { prototype: T }>(target: T): (keyof T)[] {
            return Object.getOwnPropertyNames(target) as (keyof T)[]
        }
        function chainCrawler<T extends { prototype: T }>(object: T): any {
            for (const property of getTargetProperties(object)) {
                if (typeof object[property] == "function") {
                    object[property] = new Proxy(object[property], createProxyHandler('crawler', 'method'))
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
// const foo = new Monitor((param: number) => { })
// foo()
// function t(a: any) { return true };
const foo = new Monitor(function (param: number) { }, "someScope");
const foo2 = new Monitor(T, "someScope");
const ultimate = new Monitor(new foo2(4), "someScope");
const foo3 = new Monitor({ a: 3, som(a: number) { return 3 } }, "someScope");
const tt = new foo2(4);
foo2.method(1)

tt.other()
foo3.a
foo3.som(55)
ultimate.other()
foo.bind({})(1)
const b = new foo2(7)
T.name
b.ke = 5;
console.log(b)
T.method(1);

// foo(1)
// foo.a = 3

// @Monitor({ hello: 1 })
class myClass {
    property = 1
}