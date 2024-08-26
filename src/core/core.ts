import { deserialize, serialize, Serializer } from "v8";
import { DecoratorHandler } from "../utils/decorators/decorator-handler.js";
import { constructHandler } from "../utils/handlers/construct-handler.js";
import { createLog } from "../utils/log/initialize-log.js";
import { FunctionLog, Log, ObjectLog } from "../utils/log/log.js";
import { DecoratorLogKind, RegularLogKind } from "../utils/types/enums.js";
import type { MonitorType } from "../utils/types/globals.js";
import { LoggerWorker } from "../worker/main/main-worker.js";
import { serializeInputs, serializeOutput } from "../utils/functions/serialize-inputs.js";


function createProxyHandler<T extends Function>(this: FunctionLog | ObjectLog, ...args: any[]): ProxyHandler<T> {
    const proxyHandler: ProxyHandler<T> = {
        apply: (target, thisArg, argsArray) => {
            this.serializedInputs = serializeInputs(argsArray as unknown[]);
            this.startTime = performance.now();
            const output = Reflect.apply(target, thisArg, argsArray);
            this.endTime = performance.now();
            this.stack = new Error().stack;
            if (output instanceof Promise) {
                output.then(data => {
                    this.endTime = performance.now();
                    this.output = data;
                    LoggerWorker.postLog(this);
                });
                this.output = "Promise";
            }
            LoggerWorker.postLog(this);
            return output;
        },
        construct: (target, argsArray, newTarget) => {
            this.serializedInputs = serializeInputs(argsArray as unknown[]);
            this.startTime = performance.now();
            const output = Reflect.construct(target, argsArray, newTarget);
            this.endTime = performance.now();
            this.stack = new Error().stack;
            this.serializedOutput = serializeOutput(output);
            LoggerWorker.postLog(this);
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
            // this.serializedInputs = serializeInputs([target[property]] as unknown[]);
            // this.startTime = performance.now();
            // const output = Reflect.get(target, property, receiver);
            // this.endTime = performance.now();
            // this.stack = new Error().stack;
            // this.serializedOutput = serializeOutput(output);
            // LoggerWorker.postLog(this);

            return Reflect.get(target, property, receiver);
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
            if (this instanceof ObjectLog) {
                this.previousValue = target[property];
                this.currentValue = newValue;
            }
            LoggerWorker.postLog(this);
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

        const log = typeof args[0] == "function" ?
            new FunctionLog(
                serializedData.startsWith('class') ?
                    DecoratorLogKind.Constructor :
                    RegularLogKind.Function
            ) :
            new ObjectLog();

        log.serializedData = JSON.stringify(args[0]) ?? args[0].toString();

        return new Proxy(args.shift(), createProxyHandler.bind(log)(...args));

    }
    return DecoratorHandler
}
export const Monitor = MonitorConstructor as MonitorType;
class T {
    ke;
    constructor(hello: number) {
        this.ke = hello;
    }
    method() { }
}
// const foo = new Monitor((param: number) => { })
// foo()
function t(a: any) { return true };
const foo = new Monitor(function () { }, "someScope");
const foo2 = new Monitor(T, "someScope");
// foo.bind({})(1)
const b = new foo2(7)
// b.ke;

// foo();
// foo(1)
// foo.a = 3

// @Monitor({ hello: 1 })
class myClass {
    property = 1
}