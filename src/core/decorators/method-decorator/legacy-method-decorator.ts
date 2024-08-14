import { extractParams } from "../../../utils/extract-params.js";
import { MethodLog } from "../../../utils/log.js";
import { reduceFunctionArguments } from "../../../utils/reduce-function-arguments.js";
import { LoggerWorker } from "./../../../node-main-worker.js";
const config: Record<string, any> = {};
config.env = typeof window != "undefined" && window.document ? "client" : "server"

export function legacyMethodDecorator<T extends Function>(target: T, property: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod: Function = descriptor.value;
    const log = new MethodLog();
    log.name = property;
    log.class = target.constructor.name;
    const params = extractParams(descriptor.value.toString());

    descriptor.value = function (...originalArguments: unknown[]) {
        log.date = new Date().toISOString();
        log.inputs = reduceFunctionArguments(params, originalArguments);
        log.startTime = performance.now();
        const results = originalMethod.apply(this, originalArguments);
        log.endTime = performance.now();
        log.stack = new Error().stack;
        log.output = results;
        if (results instanceof Promise) {
            results.then(data => {
                log.endTime = performance.now();
                log.output = data;
        
                // if (config.env == "server") {
                    // console.log(import.meta.resolve("node-main-worker.js"))
                    // import('./../../../node-main-worker.js').then(({ LoggerWorker }) => {
                    LoggerWorker.postLog(log);
                    // })
                // }
            })
            log.output = "Promise";
        }
        // if (config.env == "server") {
            // console.log(import.meta.dirname, import.meta.filename, import.meta.url)

            // console.log({context: "legacy decorator", log})
            // import('./../../../node-main-worker.js').then(({ LoggerWorker }) => {
            //     LoggerWorker?.postLog(log);
            // });
            LoggerWorker.postLog(log)
        // }
        return results;
    };
}