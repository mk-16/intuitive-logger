import { Logger } from './core/logger/logger.js';
import { ConfigLogs, Log } from './core/trackers/decorator-tracker/decorator-tracker.js';
import { CONTEXT } from './utils/models/enums/log-level/log-level.js';

export type { UUID } from 'crypto';
export { CONTEXT } from './utils/models/enums/log-level/log-level.js';
// export { Logger } from "./core/logger/logger.js";
export { FunctionLog } from "./utils/models/logs/function-log/function-log.js";
export { ObjectLog } from './utils/models/logs/object-log/object-log.js';
export type { FeatureSnapshot, Snapshot } from './utils/types/types.js';

@Log({ expiresAfter: 1000, context: CONTEXT.INFO })
class Myclass {
    @Log({ expiresAfter: 1000, context: CONTEXT.INFO })
    myMethod() { }

    @Log()
    private prop = 1;

    mymy() { }
}



// const myInstance = new Myclass();
// myInstance.myMethod();
// myInstance.myMethod();
// LoggerConfiguration.globalScope = { context: CONTEXT.INFO, expiresAfter: 5000 };
// const trackedFunction = Logger.track(function foo() { }, { feature: { expiresAfter: 100, context: CONTEXT.INFO, featureName: 'aaaa' } });
// const proxy = Logger.track({ hello: 'world', method: function () { } }, { feature: { expiresAfter: 100 } });
// trackedFunction();
// trackedFunction();
// proxy.hello = 'world2';
// proxy.hello = 'world3';
// proxy.method();
// proxy.method();
// proxy.method();
// proxy.method();
// // console.log(Logger.snapshot['global'].map);
// setTimeout(() => {
//     console.log(Logger.snapshot['global'].map);
//     setTimeout(() => {
//         console.log(Logger.snapshot);
//     }, 2000);
// }, 2000);
