import { LoggerWorker } from "../../worker/main/main-worker.js";
import { serializeOutput } from "../functions/serialize-inputs.js";
import { PropertyLog } from "../log/log.js";
export function definePropertyHandler(target, property, attributes) {
    const log = new PropertyLog();
    log.serializedData = property.toString();
    log.serializedPreviousValue = serializeOutput(Reflect.getOwnPropertyDescriptor(target, property));
    log.startTime = performance.now();
    const output = Reflect.defineProperty(target, property, attributes);
    log.endTime = performance.now();
    log.serializedCurrentValue = serializeOutput(Reflect.getOwnPropertyDescriptor(target, property));
    log.serializedOutput = serializeOutput(output);
    log.stack = new Error().stack;
    LoggerWorker.postLog(log);
    return output;
}
//# sourceMappingURL=define-property-handler.js.map