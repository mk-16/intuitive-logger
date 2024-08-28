import { LoggerWorker } from "../../worker/main/main-worker.js";
import { serializeInputs, serializeOutput } from "../functions/serialize-inputs.js";
import { ClassMethodLog } from "../log/log.js";


export function legacyMethodDecorator<T extends Function>(target: T, property: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod: Function = descriptor.value;
    const log = new ClassMethodLog();
    log.name = property;
    descriptor.value = function (...originalArguments: unknown[]) {
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