import { LoggerConfiguration } from "../../../core/logger.js";
import { LoggerWorker } from "../../../worker/main/main-worker.js";
import { serializeTarget } from "../../functions/serialize-target/serialize-target.js";
import { ClassMethodLog, FunctionLog } from "../../log/log.js";
import { MonitorOptions } from "../../types/globals.js";

export function applyHandler<T>(this: Partial<MonitorOptions> | undefined, target: T extends Function ? T : never, thisArg: unknown, argsArray: unknown[]) {
    if ((this?.level ?? 0) >= LoggerConfiguration.logLevel) {
        const log = this?.context?.source == 'method' ? new ClassMethodLog() : new FunctionLog();
        log.configuration = this;
        log.serializedData = target.toString();
        log.serializedInputs = serializeTarget(argsArray as unknown[]);
        log.startTime = performance.now();
        const results = Reflect.apply(target, thisArg, argsArray);
        log.endTime = performance.now();
        log.serializedOutput = serializeTarget(results);
        log.stack = new Error().stack;
        switch (this?.async) {
            case "invocation":
                LoggerWorker.postLog(log);
                break;
            case "results":
                if (results instanceof Promise) {
                    results.then(data => {
                        log.endTime = performance.now();
                        log.serializedOutput = serializeTarget(data);
                        LoggerWorker.postLog(log);
                    });
                }
                break;
            default:
                LoggerWorker.postLog(log);
                if (results instanceof Promise) {
                    results.then(data => {
                        log.endTime = performance.now();
                        log.serializedOutput = serializeTarget(data);
                        LoggerWorker.postLog(log);
                    });
                }
        }
        return results;
    }
    return Reflect.apply(target, thisArg, argsArray);
}