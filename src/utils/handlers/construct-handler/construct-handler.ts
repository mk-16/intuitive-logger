import { LoggerConfiguration } from "../../../core/logger.js";
import { LoggerWorker } from "../../../worker/main/main-worker.js"
import { serializeTarget } from "../../functions/serialize-target/serialize-target.js";
import { ClassConstructorLog } from "../../log/log.js";
import { MonitorOptions } from "../../types/globals.js";

export function constructHandler<T extends Function>(this: Partial<MonitorOptions> | undefined, target: T extends new (...args: unknown[]) => any ? T : never, argsArray: unknown[], newTarget: Function) {

    if ((this?.level ?? 0) >= LoggerConfiguration.logLevel) {
        const log = new ClassConstructorLog();
        log.configuration = this;
        log.serializedData = target.toString();
        log.serializedInputs = serializeTarget(argsArray);
        log.startTime = performance.now();
        const output = Reflect.construct(target, argsArray, newTarget);
        log.endTime = performance.now();
        log.stack = new Error().stack;
        log.serializedOutput = serializeTarget(output);
        LoggerWorker.postLog(log);
        return output;
    }
    return Reflect.construct(target, argsArray, newTarget);
}