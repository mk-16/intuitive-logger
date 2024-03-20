// import { Logger } from './core/logger/logger.js';
// import { LoggerConfig } from './utils/configurators/logger-config/logger-config.js';
// import { ConfigScope } from './utils/configurators/scope-config-decorator/scope-config-decorator.js';
// // import { DecoratorAdapter } from './utils/configurators/scope-configurator-decorator/scope-configurator-decorator.js';

// import { FunctionTracker } from "./core/trackers/function-tracker/function-tracker.js";
import { LoggerStateManager } from "./core/state-manager/state-manager.js";
import { ParentWorker } from "./core/workers/parent-worker/parent-worker.js";
setTimeout(() => {
    LoggerStateManager.state.set('1', new Map())
    ParentWorker.addFeature({ featureName: 'some' })
    ParentWorker.handleFunctionLog({ startTime: 0, endTime: 1, output: 2, inputs: [1, 2] })
    ParentWorker.handleObjectLog({ property: 'prop', oldVal: 0, newVal: 1 })
    console.log(LoggerStateManager.state)

}, 0);
// export type { UUID } from 'crypto';
// export { LOG_LEVEL } from './utils/models/enums/log-level/log-level.js';
// // export { Logger } from "./core/logger/logger.js";
// export { FunctionLog } from "./utils/models/logs/function-log/function-log.js";
// export { ObjectLog } from './utils/models/logs/object-log/object-log.js';
// export type { FeatureSnapshot, Snapshot } from './utils/types/types.js';


// if (window) {
//     console.log('window')
// }
// // @Log({ expiresAfter: 1000 })
// // class Myclass {
// //     @Log({ expiresAfter: 1000, context: CONTEXT.INFO })
// //     myMethod() { }

// //     @Log()
// //     private prop = 1;

// //     mymy() { }
// // }



// // const myInstance = new Myclass();
// // myInstance.myMethod();
// // myInstance.myMethod();
// // LoggerConfiguration.globalScope = { context: CONTEXT.INFO, expiresAfter: 5000 };
// // const trackedFunction = Logger.track(function (a: number, b: number) { return a + b }, { feature: { expiresAfter: 100, context: CONTEXT.INFO, featureName: 'aaaa' } });
// // const proxy = Logger.track({ hello: 'world', method: function () { } }, { : { expiresAfter: 100 } });
// // trackedFunction(1, 2);
// // trackedFunction(2, 3);

// // Rest extends BaseContextType<Rest> ? BaseContextType<Rest> : Rest : Element;

// // const context: BaseContextType<> =
// // LoggerConfig.defineContext('asd', 0)
// // proxy.hello = 'world2';
// // proxy.hello = 'world3';
// // proxy.method();
// // proxy.method();
// // proxy.method();
// // proxy.method();
// // Object.values(Logger.snapshot['global'].map).forEach(feature => {
// //     Object.values(feature.map).forEach(log => {
// //         if (log instanceof FunctionLog) {
// //             console.log({inputs: log.inputs})
// //         }
// //     })
// // })
// // LoggerConfig.globalScope = {context: CONTEXT.FATAL, expiresAfter: 500}
// setTimeout(() => {
//     console.log(Logger.snapshot);
//     setTimeout(() => {
//         console.log(Logger.snapshot);
//     }, 2000);
// }, 500);




// // @ConfigLogsScope({ expiresAfter: 1000, context: CONTEXT.INFO })
// // @DecoratorAdapter.decorate()
// @ConfigScope()
// class A {
//     // @ConfigLogsScope({ expiresAfter: 1000, context: CONTEXT.INFO })
//     MYmEHTOD() { }
// }


// // const a = new A();
// // console.log(map)
// // DecoratorAdapter.decorate({}, 'string', {})



// const a = [1, 2, 3,];


// const isBrowser = !isNode && typeof window !== 'undefined';
// if (isNode) {
//     import("node:worker_threads").then((module) => {
//         const { Worker, isMainThread, parentPort, workerData } = module;
//         console.log({ isMainThread })
//         if (isMainThread) {
//             const worker = new Worker(new URL(import.meta.url), { workerData: { FUCKYOU: 'hello' } });
//             worker.postMessage(LoggerStateManager.state)
//             LoggerStateManager.state.set('fff', new Map())
//             // worker.postMessage(LoggerStateManager.state)
//         }
//         else {
//             parentPort!.on('message', console.log)
//             console.log("INSIDE THE WORKER")
//             // parentPort?
//         }
//     });
// }