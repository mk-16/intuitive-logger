import { LoggerWorker } from "../../worker/main/main-worker.js";
import { serializeInputs } from "../functions/serialize-inputs.js";
import { ClassMethodLog } from "../log/log.js";

export function modernDecorator<T extends object>(target: T | undefined, context: DecoratorContext) {
    const log = new ClassMethodLog();
    log.name = context.name;
    log.class = (target as any)?.name;
    log.stringifiedTarget = target?.toString();

    if (target)
        return new Proxy(target, {
            construct(target, argsArray, newTarget) {
                log.date = new Date().toISOString();
                log.serializedInputs = serializeInputs(argsArray);
                log.startTime = performance.now();
                const results = new (target as any)(...argsArray);
                log.endTime = performance.now();
                log.stack = new Error().stack;
                log.output = results;
                LoggerWorker.postLog(log);
                return results;
            },

            apply(target, thisArg, argsArray) {
                log.date = new Date().toISOString();
                log.serializedInputs = serializeInputs(argsArray);
                log.startTime = performance.now();
                const results = (target as Function)(...argsArray);
                log.endTime = performance.now();
                log.stack = new Error().stack;
                log.output = results;
                LoggerWorker.postLog(log);
                return results;
            },
        })
}