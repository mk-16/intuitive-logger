// // import { Logger } from './core/logger/logger.js';
// // import { LoggerConfig } from './utils/configurators/logger-config/logger-config.js';
// // import { ConfigScope } from './utils/configurators/scope-config-decorator/scope-config-decorator.js';
// // // import { DecoratorAdapter } from './utils/configurators/scope-configurator-decorator/scope-configurator-decorator.js';
// // import { FunctionTracker } from "./core/trackers/function-tracker/function-tracker.js";
// import { Log } from './core/trackers/decorator-tracker/decorator-tracker.js';
// import { ParentWorker } from './core/workers/parent-worker/parent-worker.js';

import { Logger } from "./core/logger/logger.js";
import { Log } from "./core/trackers/decorator-tracker/decorator-tracker.js";
import { ParentWorker } from "./core/workers/parent-worker/parent-worker.js";
import 'source-map-support/register.js';

// // export type { UUID } from 'crypto';
// // export { LOG_LEVEL } from './utils/models/enums/log-level/log-level.js';
// // // export { Logger } from "./core/logger/logger.js";
// // export { FunctionLog } from "./utils/models/logs/function-log/function-log.js";
// // export { ObjectLog } from './utils/models/logs/object-log/object-log.js';
// // export type { FeatureSnapshot, Snapshot } from './utils/types/types.js';

abstract class A {
    @Log()
    prop2 = false;
    public prop3: number = 3
    constructor(a: number) { }
    @Log()
    greet() {
        console.log('GOOD BYE')
    }
    @Log()
    static goodbye() {
        console.log('HELLO from goodbye')
    }
}

// @Log({ expiresAfter: 1000 })
class F extends A {
    constructor(a: number) {
        super(a)
    }
    @Log()
    myMethod(str: string) {
        console.log('WI WI')
        return 1
    }
    // @Log()
    prop = 1;
    @Log()
    mymy() { }
}

const classs = new F(1)
const classf = new F(2)
classs.prop3 = 3
classs.prop3
classf.prop3 = 3
classf.prop3
console.log({ classf, classs })
classs.greet();
classs.myMethod('sd');
classs.mymy();
F.goodbye()

classf.greet();
classf.myMethod('sd');
classf.mymy();
A.goodbye()
// classs.myMethod('ads')
// setTimeout(() => {
//     ParentWorker.log()
// }, 100);
// const trackedFunction = Logger.track(() => {
//     const promise = new Promise(resolve => {
//         setTimeout(() => {
//             resolve('NAOR')
//         }, 10 * 1000);

//     })
//     return promise;
// })


setTimeout(() => {
    ParentWorker.log()
}, 100);

