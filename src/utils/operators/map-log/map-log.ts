import { map, Observable } from "rxjs";
import { cleanLog } from "../../functions/clean-log/clean-log.js";
import { cleanPropertyLog } from "../../functions/clean-property-log/clean-property-log.js";
import { extractParams } from "../../functions/extract-params/extract-params.js";
import { findFileInStack } from "../../functions/find-file-in-stack/find-file-in-stack.js";
import { mapParamsToValues } from "../../functions/map-params-to-values/map-params-to-values.js";
import { parseTarget } from "../../functions/parse-target/parse-target.js";
import { setRuntime } from "../../functions/set-log-runtime/set-runtime.js";
import { propertyLogGuard } from "../../log/log-guards.js";
import { Log } from "../../log/log.js";
import { PostModes } from "../../types/enums.js";
import { Data, MonitorVendorOption } from "../../types/globals.js";

export function mapLog(source: Observable<Data>) {
    return source.pipe(
        map((data): [Log, keyof typeof PostModes, MonitorVendorOption[] | undefined] => {
            const { log, config } = data;
            log.date = new Date().toISOString();
            log.stack = log.stack ? findFileInStack(log.stack) : undefined;
            log.runtime = setRuntime(log);

            if (propertyLogGuard(log)) {
                log.previousPropertyDescriptor = parseTarget(log.serializedPreviousValue);
                log.currentPropertyDescriptor = parseTarget(log.serializedCurrentValue);
                cleanPropertyLog(log);
            }
            else
                log.inputs = mapParamsToValues(extractParams(log.serializedData), parseTarget(log.serializedInputs))
            log.output = log.serializedOutput ? parseTarget(log.serializedOutput) : undefined;
            const options = { ...config.options, ...log.options };
            log.options = options;
            
            if (config.levels.length > 0) {
                (log as Log).options!.level = config.levels[log.options.level!]
            }
            const { mode, endpoints } = log.options;
            cleanLog(log);
            return [log, mode!, endpoints];
        }),
    )
}