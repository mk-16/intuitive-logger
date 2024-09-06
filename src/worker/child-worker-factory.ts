import { filter, fromEvent, map, tap } from "rxjs";
import { extractParams } from "../utils/functions/extract-params/extract-params.js";
import { findFileInStack } from "../utils/functions/find-file-in-stack/find-file-in-stack.js";
// import { mapParamsToValues } from "../utils/functions/map-params-to-values/map-params-to-values.js";
import { propertyLogGuard } from "../utils/log/log-guards.js";
import { Log } from "../utils/log/log.js";
import { DecoratorLogKind } from "../utils/types/enums.js";
import { parseTarget } from "../utils/functions/parse-target/parse-target.js";
import { mapParamsToValues } from "../utils/functions/map-params-to-values/map-params-to-values.js";


export abstract class ChildWorkerFactory {
    static create(worker: any) {
        // worker.on("message", (log: Log) => {
        //     log.date = new Date().toISOString();
        //     log.stack = log.stack ? findFileInStack(log.stack) : undefined;
        //     log.runtime = `${parseFloat(((log.endTime ?? 0) - (log.startTime ?? 0)).toFixed(4))}ms`;
        //     log.name = log.kind == DecoratorLogKind.Constructor ?
        //         log.name != undefined ?
        //             log.name.toString().concat('Constructor') :
        //             log.serializedData?.split('class ')[1]?.split(' ')[0].concat('Constructor') :
        //         log.serializedData?.split('(')[0];
        //     log.name = log.name != '' ? log.name : 'anonymous'
        //     if (propertyLogGuard(log)) {
        //         log.previousValue = log.serializedPreviousValue ? JSON.parse(log.serializedPreviousValue) : undefined;
        //         log.currentValue = log.serializedCurrentValue ? JSON.parse(log.serializedCurrentValue) : undefined;
        //         delete log.serializedPreviousValue;
        //         delete log.serializedCurrentValue;
        //     }
        //     else
        //         log.inputs = mapParamsToValues(extractParams(log.serializedData), parseTarget(log.serializedInputs) as string[]) as any;
        //     log.output = log.serializedOutput ? parseTarget(log.serializedOutput) : undefined;
        //     delete log.startTime;
        //     delete log.endTime;
        //     delete log.serializedInputs;
        //     delete log.serializedOutput;
        //     delete log.serializedData;
        //     delete log.stack;
        //     return log;
        // })

        return fromEvent(worker, "message", (event: MessageEvent): Log => event.data)
            .pipe(
                map(log => {
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
                        log.inputs = mapParamsToValues(extractParams(log.serializedData), parseTarget(log.serializedInputs) as string[]) as any;
                    log.output = log.serializedOutput ? parseTarget(log.serializedOutput) : undefined;
                    delete log.startTime;
                    delete log.endTime;
                    delete log.serializedInputs;
                    delete log.serializedOutput;
                    delete log.serializedData;
                    delete log.stack;
                    return log;
                }),
            ).subscribe(console.log)
    }
}
