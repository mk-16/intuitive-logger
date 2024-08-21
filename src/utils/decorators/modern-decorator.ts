import { LoggerWorker } from "../../worker/main/main-worker.js";
import { deepCloneInputs } from "../functions/deep-clone-inputs.js";
import { ClassMethodLog } from "../log/log.js";

export function modernDecorator<T extends Function>(target: T | undefined, context: DecoratorContext) {
    const originalMethod = target;
    const log = new ClassMethodLog();
    log.name = context.name;
    log.class = target?.constructor.name;
    log.stringifiedTarget = target?.toString();
    return function <K>(this: K, ...originalArguments: unknown[]) {
        log.date = new Date().toISOString();
        log.rawInputs = deepCloneInputs(originalArguments);
        log.startTime = performance.now();
        const results = originalMethod?.apply(this, originalArguments);
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