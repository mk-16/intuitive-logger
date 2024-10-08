import { LoggerWorker } from "../../worker/main/main-worker.js";
import { serializeInputs, serializeOutput } from "../functions/serialize-inputs.js";
import { ClassMethodLog, FunctionLog } from "../log/log.js";

export function applyHandler<T>(this: undefined | "method", target: T extends Function ? T : never, thisArg: unknown, argsArray: unknown[]) {
    const log = this == 'method' ? new ClassMethodLog() : new FunctionLog();
    log.serializedData = target.toString();
    log.serializedInputs = serializeInputs(argsArray as unknown[]);
    log.startTime = performance.now();
    const output = Reflect.apply(target, thisArg, argsArray);
    log.endTime = performance.now();
    log.serializedOutput = serializeOutput(output);
    log.stack = new Error().stack;
    if (output instanceof Promise) {
        output.then(data => {
            log.endTime = performance.now();
            log.output = data;
            LoggerWorker.postLog(log);
        });
        log.output = "Promise";
    }
    LoggerWorker.postLog(log);
    return output;
}