import { DecoratorHandler } from "../utils/decorators/decorator-handler.js";
import type { LegacyArguments, ModernArguments, MonitorType } from "../utils/types/globals.js";

const proxyHandler: ProxyHandler<any> = {
    apply(target, thisArg, argsArray) { 
        console.log({ reflect: 'apply called' })
        return Reflect.apply(target, thisArg, argsArray)
    },
    construct(target, argsArray, targetConstructor) {
        console.log({ reflect: 'construct called' })
        return Reflect.construct(target, argsArray, targetConstructor);
    },
    defineProperty(target, property, attributes) {
        console.log({ reflect: 'defineProperty called', property })
        return Reflect.defineProperty(target, property, attributes);
    },
    deleteProperty(target, property) {
        console.log({ reflect: 'deleteProperty called', property })
        return Reflect.deleteProperty(target, property);
    },
    get(target, property, receiver) {
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
    set(target, property, newValue, receiver) {
        console.log({ reflect: 'set called', property })
        return Reflect.set(target, property, newValue, receiver);
    },
}

//todo types
function MonitorConstructor(...args: any[]) {
    return new.target == MonitorConstructor ? new Proxy(args[0], proxyHandler) : DecoratorHandler
}
export const Monitor = MonitorConstructor as MonitorType;