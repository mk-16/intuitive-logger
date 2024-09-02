import { fromEvent, map } from "rxjs";
import { extractParams } from "../utils/functions/extract-params/extract-params.js";
import { findFileInStack } from "../utils/functions/find-file-in-stack/find-file-in-stack.js";
import { mapParamsToValues } from "../utils/functions/map-params-to-values/map-params-to-values.js";
import { propertyLogGuard } from "../utils/log/log-guards.js";
import { Log } from "../utils/log/log.js";
import { DecoratorLogKind } from "../utils/types/enums.js";


export abstract class ChildWorkerFactory {
    static create(worker: any) {
        return fromEvent<MessageEvent<Log>>(worker, "message")
            .pipe(
                map(({ data: log }) => {
                    log.date = new Date().toISOString();
                    log.stack = log.stack ? findFileInStack(log.stack) : undefined;
                    log.runtime = `${parseFloat(((log.endTime ?? 0) - (log.startTime ?? 0)).toFixed(4))}ms`;
                    log.name = log.kind == DecoratorLogKind.Constructor ?
                        log.name != undefined ?
                            log.name.toString().concat('Constructor') :
                            log.serializedData?.split('class ')[1]?.split(' ')[0].concat('Constructor') :
                        log.serializedData?.split('(')[0];
                    log.name = log.name != '' ? log.name : 'anonymous'
                    if (propertyLogGuard(log)) {
                        log.previousValue = log.serializedPreviousValue ? JSON.parse(log.serializedPreviousValue) : undefined;
                        log.currentValue = log.serializedCurrentValue ? JSON.parse(log.serializedCurrentValue) : undefined;
                        delete log.serializedPreviousValue;
                        delete log.serializedCurrentValue;
                    }
                    else
                        log.inputs = mapParamsToValues(extractParams(log.serializedData), JSON.parse(log.serializedInputs ?? ''));
                    try {
                        log.output = log.serializedOutput ? JSON.parse(log.serializedOutput) : undefined;
                    }
                    catch (e) {
                        log.output = log.serializedOutput;
                    }
                    delete log.startTime;
                    delete log.endTime;
                    delete log.serializedInputs;
                    delete log.serializedOutput;
                    delete log.serializedData;
                    // console.log({ log, params: log.inputs?.param, rest: log.inputs?.rest, anotherParam: log.inputs?.anotherParam })
                    return log;
                }),
            )
    }
}
