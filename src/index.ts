import "reflect-metadata";
import "./core/monitor-factory/monitor.js"
import { DecoratorArguments } from "./utils/types/decorator-arguments.js";
import { Monitor } from "./core/monitor-factory/monitor.js";

// function MonitorConstructor<T extends object>(this: any, ...args: any[]) {
//     if (this instanceof Monitor) {
//         //todo add handler
//         const proxy = new Proxy<T>(args[0], {});
//         return proxy; 
//     }
//     return <T extends object>(target: T | undefined, ...args: DecoratorArguments<T>) => {
//         if (typeof args[0] == "object") {
//             const ctx = args[0]
//         } else {
//             const [property, descriptor] = args;
//             // console.log({target, property, descriptor})
//             if (target && property) {
//                 // console.log({target,property, tp: target[property], c: target.constructor})
//                 // Reflect.defineMetadata(property, 3, target.constructor);
//                 const timers = Reflect.getOwnMetadata('timers', target.constructor);
//                 const timer = setTimeout(() => {
//                     const error = new Error(`Cannot use @Log in class ${target.constructor.name} without using @Monitor`);
//                     delete error.stack;
//                     throw error;
//                 }, 0);
//                 Reflect.defineMetadata('timers', timers ? [...timers, timer] : [timer], target.constructor);
//                 if (typeof descriptor == "number") {
//                     const params = Reflect.getOwnMetadata('params', target.constructor) ?? {};
//                     params[property] = descriptor;
//                     Reflect.defineMetadata('params', params, target.constructor)
//                 }
//             }
//             else if (target) {
//                 for (const timer of Reflect.getOwnMetadata("timers", target)) {
//                     clearTimeout(timer);
//                 }
//                 for (const method in Reflect.getOwnMetadata("params", target)) {
//                     // console.log(method)
//                 }
//             }
//         }
//     }
// };

// const Monitor: Monitor = MonitorConstructor as Monitor;

// function foo(a: number) { return a; }
// const monitored = new Monitor(foo);



// import "./utils/decorator/property/property.js";
// (() => {
//     function InferContext(...args: any[]) {
//         legacyClassDecorator(args[0]);
//         MonitorC.setStrategy("classDecorator", legacyClassDecorator)
//         if (args.length == 2 && typeof args[1] == "object") {
//             // console.log('a', args)
//             // Logger
//         }
//     }

//     @InferContext
//     class Test { }
// })()


function foo(param: number) { }
const z = new Monitor(foo, { 'metered': false });
// z.a;
// z.a = 3;

//I/O P SC TR?

@Monitor({ metered: true })
class b {

    @Log({})
    property = false;

    // @Monitor()
    // method(@Monitor() param: any) { };
    // anotherMethod(@Monitor() param: any) { }
    // constructor(@Monitor() muahah: any) { }
}



