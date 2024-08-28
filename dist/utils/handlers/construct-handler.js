import { LoggerWorker } from "../../worker/main/main-worker.js";
import { serializeInputs, serializeOutput } from "../functions/serialize-inputs.js";
import { ClassConstructorLog } from "../log/log.js";
export function constructHandler(target, argsArray, newTarget) {
    const log = new ClassConstructorLog();
    log.serializedData = target.toString();
    log.name = typeof this == "string" ? this : undefined;
    log.serializedInputs = serializeInputs(argsArray);
    log.startTime = performance.now();
    const output = Reflect.construct(target, argsArray, newTarget);
    log.endTime = performance.now();
    log.stack = new Error().stack;
    log.serializedOutput = serializeOutput(output);
    LoggerWorker.postLog(log);
    return output;
}
//# sourceMappingURL=construct-handler.js.map