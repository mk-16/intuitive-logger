import { LoggerConfiguration } from "../../core/logger.js";
import { LoggerWorker } from "../../worker/main/main-worker.js";
import { serializeTarget } from '../functions/serialize-target/serialize-target.js'
import { ClassMethodLog } from "../log/log.js";
import { MonitorOptions } from "../types/globals.js";


export function legacyMethodDecorator<T extends Function>(this: Partial<MonitorOptions> | undefined, target: T, property: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod: Function = descriptor.value;
    const log = new ClassMethodLog();
    log.name = property;
    descriptor.value = (...originalArguments: unknown[]) => {
        if ((this?.level ?? 0) >= LoggerConfiguration.level) {

            log.serializedData = originalMethod.toString();
            log.serializedInputs = serializeTarget(originalArguments);
            log.startTime = performance.now();
            const results = originalMethod.apply(this, originalArguments);
            log.endTime = performance.now();
            log.stack = new Error().stack;
            log.serializedOutput = serializeTarget(results);
            log.configuration = this;
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
        return originalMethod.apply(target, originalArguments);
    };
}