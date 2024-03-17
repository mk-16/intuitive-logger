import { Logger } from './core/logger/logger.js';
import { ScopeConfigDecorator } from './utils/configurators/scope-config-decorator/scope-config-decorator.js';
// import { DecoratorAdapter } from './utils/configurators/scope-configurator-decorator/scope-configurator-decorator.js';
import { CONTEXT } from './utils/models/enums/log-level/log-level.js';

export type { UUID } from 'crypto';
export { CONTEXT } from './utils/models/enums/log-level/log-level.js';
// export { Logger } from "./core/logger/logger.js";
export { FunctionLog } from "./utils/models/logs/function-log/function-log.js";
export { ObjectLog } from './utils/models/logs/object-log/object-log.js';
export type { FeatureSnapshot, Snapshot } from './utils/types/types.js';

// @Log({ expiresAfter: 1000, context: CONTEXT.INFO })
// class Myclass {
//     @Log({ expiresAfter: 1000, context: CONTEXT.INFO })
//     myMethod() { }

//     @Log()
//     private prop = 1;

//     mymy() { }
// }



// const myInstance = new Myclass();
// myInstance.myMethod();
// myInstance.myMethod();
// LoggerConfiguration.globalScope = { context: CONTEXT.INFO, expiresAfter: 5000 };
const trackedFunction = Logger.track(function (a: number, b: number) { return a + b }, { feature: { expiresAfter: 100, context: CONTEXT.INFO, featureName: 'aaaa' } });
const proxy = Logger.track({ hello: 'world', method: function () { } }, { feature: { expiresAfter: 100 } });
trackedFunction(1, 2);
trackedFunction(2, 3);
proxy.hello = 'world2';
proxy.hello = 'world3';
proxy.method();
proxy.method();
proxy.method();
proxy.method();
// Object.values(Logger.snapshot['global'].map).forEach(feature => {
//     Object.values(feature.map).forEach(log => {
//         if (log instanceof FunctionLog) { 
//             console.log({inputs: log.inputs})
//         }
//     })
// })
// LoggerConfig.globalScope = {context: CONTEXT.FATAL, expiresAfter: 500}
setTimeout(() => {
    console.log(Logger.snapshot);
    setTimeout(() => {
        console.log(Logger.snapshot);
    }, 2000);
}, 500);




function ConfigLogsScope(...config: any[]) {
    return function (..._: any) {
        console.log({ config })
    }
}




// @ConfigLogsScope({ expiresAfter: 1000, context: CONTEXT.INFO })
// @DecoratorAdapter.decorate()
class A {
    // @ConfigLogsScope({ expiresAfter: 1000, context: CONTEXT.INFO })

    @ScopeConfigDecorator.decorate({ context: CONTEXT.DEBUG })
    MYmEHTOD() { }
}


const a = new A();
// console.log(map)
// DecoratorAdapter.decorate({}, 'string', {})

