import { LoggerWorker } from "../../worker/main/main-worker.js";
import { extractParams } from "../functions/extract-params.js";
import { reduceMethodArguments } from "../functions/reduce-method-arguments.js";
import { ClassMethodLog } from "../log/log.js";
export function legacyMethodDecorator(target, property, descriptor) {
    const originalMethod = descriptor.value;
    const log = new ClassMethodLog();
    log.name = property;
    log.class = target.constructor.name;
    const params = extractParams(descriptor.value.toString());
    descriptor.value = function (...originalArguments) {
        log.date = new Date().toISOString();
        log.inputs = reduceMethodArguments(params, originalArguments);
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
//# sourceMappingURL=legacy-decorator.js.map