import { LoggerWorker } from "../../worker/main/main-worker.js";
import { ClassMethodLog } from "../log/log.js";


export function legacyMethodDecorator<T extends Function>(target: T, property: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod: Function = descriptor.value;
    const log = new ClassMethodLog();
    log.name = property;
    log.class = target.constructor.name;
    log.stringifiedTarget = descriptor.value.toString();
    descriptor.value = function (...originalArguments: unknown[]) {
        log.date = new Date().toISOString();
        // log.rawInputs = deepCloneInputs(originalArguments);
        log.startTime = performance.now();
        const results = originalMethod.apply(this, originalArguments);
        log.endTime = performance.now();
        log.stack = new Error().stack;
        log.output = results;
        if (results instanceof Promise) {
            results.then(data => {
                log.endTime = performance.now();
                log.output = data;
                LoggerWorker.postLog(log);
            });
            log.output = "Promise";
        }
        LoggerWorker.postLog(log);
        return results;
    };
}