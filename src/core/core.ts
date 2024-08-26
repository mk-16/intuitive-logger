import { deserialize, serialize, Serializer } from "v8";
import { DecoratorHandler } from "../utils/decorators/decorator-handler.js";
import { constructHandler } from "../utils/handlers/construct-handler.js";
import { createLog } from "../utils/log/initialize-log.js";
import { FunctionLog, Log, ObjectLog } from "../utils/log/log.js";
import { DecoratorLogKind, RegularLogKind } from "../utils/types/enums.js";
import type { MonitorType } from "../utils/types/globals.js";
import { LoggerWorker } from "../worker/main/main-worker.js";
import { serializeInputs } from "../utils/functions/serialize-inputs.js";

function populateLogSync(this: Log, cb: Function, ...args: unknown[]) {
    const index = args.pop() as number;
    console.log(args[index])
    this.serializedInputs = serializeInputs(args[index] as unknown[]);
    this.startTime = performance.now();
    this.output = cb(...args);
    this.endTime = performance.now();
    // console.log(cb(...args), args)
}
function createProxyHandler<T extends Function>(this: FunctionLog | ObjectLog, ...args: any[]): ProxyHandler<T> {
    const proxyHandler: ProxyHandler<T> = {
        apply: (target, thisArg, argsArray) => {
            LoggerWorker.postLog(this);
            console.log(thisArg)
            populateLogSync.call(this, Reflect.apply, target, thisArg, argsArray, 2)
            return Reflect.apply(target, thisArg, argsArray)
        },
        construct: constructHandler.bind(this),
        defineProperty(target, property, attributes) {
            console.log({ reflect: 'defineProperty called', property })
            return Reflect.defineProperty(target, property, attributes);
        },
        deleteProperty(target, property) {
            console.log({ reflect: 'deleteProperty called', property })
            return Reflect.deleteProperty(target, property);
        },
        get: (target, property, receiver) => {
            console.log({ reflect: 'get called', property })
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
        const log = typeof args[0] == "function" ? new FunctionLog() : new ObjectLog();
        log.serializedData = JSON.stringify(args[0]) ?? args[0].toString();
        // console.log(log)
        // console.log({ name: foo.name, length: foo.length, t: foo.constructor.length, ff: foo.constructor() })
        // log.buffer = serialize(typeof args[0] == "function" ? docode(args[0]) : args[0]);
        // log.stack = new Error().stack;
        // log.name = args[1] ?? 'anonymous';
        //     const stringifyedFunction: string = args[0].toString();
        //     const kind = stringifyedFunction.startsWith('class') ? DecoratorLogKind.Constructor : RegularLogKind.Function;
        //     const log = createLog(kind);
        //     return new Proxy(args.shift(), createProxyHandler.bind(log)(...args));
        // }
        // const log = new ObjectLog();
        return new Proxy(args.shift(), createProxyHandler.bind(log)(...args));

    }
    return DecoratorHandler
}
export const Monitor = MonitorConstructor as MonitorType;

// const foo = new Monitor((param: number) => { })
// foo()
const t = () => { };
const foo = new Monitor((a: 1) => { return 1 }, "someScope");
// foo.bind({})(1)
// new foo()
// foo();
foo(1)
// foo.a = 3

// @Monitor({ hello: 1 })
class myClass {
    property = 1
}