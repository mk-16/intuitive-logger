import { LoggerWorker } from "../../../worker/main/main-worker.js";
import { serializeTarget } from "../../functions/serialize-target/serialize-target.js";
import { PropertyLog } from "../../log/log.js";

export function definePropertyHandler<T extends object, K extends string | symbol>(this: any, target: T, property: K extends keyof T ? K : never, attributes: PropertyDescriptor) {
    const log = new PropertyLog();
    log.options = this;
    log.serializedData = property.toString()
    log.serializedPreviousValue = serializeTarget(Reflect.getOwnPropertyDescriptor(target, property));
    log.startTime = performance.now();
    const output = Reflect.defineProperty(target, property, attributes);
    log.endTime = performance.now();
    log.serializedCurrentValue = serializeTarget(Reflect.getOwnPropertyDescriptor(target, property));
    log.serializedOutput = serializeTarget(output);
    log.stack = new Error().stack;
    LoggerWorker.postLog(log);
    return output;
}