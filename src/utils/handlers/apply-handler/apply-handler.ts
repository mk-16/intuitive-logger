import { LoggerWorker } from "../../../worker/main/main-worker.js";
import { serializeTarget } from "../../functions/serialize-target/serialize-target.js";
import { ClassMethodLog, FunctionLog } from "../../log/log.js";

export function applyHandler<T>(this: undefined | "method" | unknown, target: T extends Function ? T : never, thisArg: unknown, argsArray: unknown[]) {
    const log = this == 'method' ? new ClassMethodLog() : new FunctionLog();
    log.serializedData = target.toString();
    log.serializedInputs = serializeTarget(argsArray as unknown[]);
    log.startTime = performance.now();
    const output = Reflect.apply(target, thisArg, argsArray);
    log.endTime = performance.now();
    log.serializedOutput = serializeTarget(output);
    log.stack = new Error().stack;
    if (output instanceof Promise) {
        output.then(data => {
            log.endTime = performance.now();
            log.serializedOutput = serializeTarget(data);
            LoggerWorker.postLog(log);
        });
    }
    LoggerWorker.postLog(log);
    return output;
}