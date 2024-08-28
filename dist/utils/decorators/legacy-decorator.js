import { LoggerWorker } from "../../worker/main/main-worker.js";
import { serializeInputs, serializeOutput } from "../functions/serialize-inputs.js";
import { ClassMethodLog } from "../log/log.js";
export function legacyMethodDecorator(target, property, descriptor) {
    const originalMethod = descriptor.value;
    const log = new ClassMethodLog();
    log.name = property;
    descriptor.value = function (...originalArguments) {
        log.serializedData = originalMethod.toString();
        log.serializedInputs = serializeInputs(originalArguments);
        log.startTime = performance.now();
        const results = originalMethod.apply(this, originalArguments);
        log.endTime = performance.now();
        log.stack = new Error().stack;
        log.serializedOutput = serializeOutput(results);
        if (results instanceof Promise) {
            results.then(data => {
                log.endTime = performance.now();
                log.serializedOutput = serializeOutput(data);
                LoggerWorker.postLog(log);
            });
            log.serializedOutput = "Promise";
        }
        LoggerWorker.postLog(log);
        return results;
    };
}
//# sourceMappingURL=legacy-decorator.js.map