import { map, Observable } from "rxjs";
import { Log } from "../../log/log.js";
import { findFileInStack } from "../../functions/find-file-in-stack/find-file-in-stack.js";
import { setRuntime } from "../../functions/set-log-runtime/set-runtime.js";
import { setName } from "../../functions/set-log-name/set-name.js";
import { propertyLogGuard } from "../../log/log-guards.js";
import { parseTarget } from "../../functions/parse-target/parse-target.js";
import { cleanPropertyLog } from "../../functions/clean-property-log/clean-property-log.js";
import { mapParamsToValues } from "../../functions/map-params-to-values/map-params-to-values.js";
import { extractParams } from "../../functions/extract-params/extract-params.js";
import { cleanLog } from "../../functions/clean-log/clean-log.js";
import { deleteNestedProperty } from "../../functions/delete-nested-property/delete-nested-property.js";

export function mapLog(source: Observable<Log>) {
    return source.pipe(
        map(log => {
            log.date = new Date().toISOString();
            log.stack = log.stack ? findFileInStack(log.stack) : undefined;
            log.runtime = setRuntime(log);
            log.name = setName(log);

            if (propertyLogGuard(log)) {
                log.previousPropertyDescriptor = parseTarget(log.serializedPreviousValue);
                log.currentPropertyDescriptor = parseTarget(log.serializedCurrentValue);
                cleanPropertyLog(log);
            }
            else
                log.inputs = mapParamsToValues(extractParams(log.serializedData), parseTarget(log.serializedInputs))
            log.output = log.serializedOutput ? parseTarget(log.serializedOutput) : undefined;
            cleanLog(log);


            const configuration = log.configuration;
            log.configuration?.hide?.forEach((key) => {
                deleteNestedProperty(log, key as string);
            })
            return { log, configuration };
        }),
    )
}