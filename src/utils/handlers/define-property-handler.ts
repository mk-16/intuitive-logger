import { LoggerWorker } from "../../worker/main/main-worker.js";
import { serializeInputs, serializeOutput } from "../functions/serialize-inputs.js";
import { PropertyLog } from "../log/log.js";

export function definePropertyHandler<T extends object, K extends string | symbol>(target: T, property: K extends keyof T ? K : never, attributes: PropertyDescriptor) {
    const log = new PropertyLog();
    log.serializedData = property.toString()
    log.serializedPreviousValue = serializeOutput(target[property]);
    log.serializedCurrentValue = serializeOutput(attributes.value);
    log.startTime = performance.now();
    const output = Reflect.defineProperty(target, property, attributes);
    log.endTime = performance.now();
    log.serializedOutput = serializeOutput(output);
    log.stack = new Error().stack;
    LoggerWorker.postLog(log);
    return output;
}