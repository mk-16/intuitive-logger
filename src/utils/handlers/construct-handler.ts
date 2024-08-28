import { LoggerWorker } from "../../worker/main/main-worker.js"
import { serializeInputs, serializeOutput } from "../functions/serialize-inputs.js";
import { ClassConstructorLog } from "../log/log.js";

export function constructHandler<T extends Function>(this: unknown | undefined, target: T extends new (...args: unknown[]) => any ? T : never, argsArray: unknown[], newTarget: Function) {
    const log = new ClassConstructorLog();
    log.serializedData = target.toString();
    log.name = typeof this == "string" ? this : undefined;
    log.serializedInputs = serializeInputs(argsArray as unknown[]);
    log.startTime = performance.now();
    const output = Reflect.construct(target, argsArray, newTarget);
    log.endTime = performance.now();
    log.stack = new Error().stack;
    log.serializedOutput = serializeOutput(output);
    LoggerWorker.postLog(log);
    return output;
}