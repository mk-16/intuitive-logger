import { fromEvent, map, Subscription, tap } from "rxjs";
import { extractParams } from "../utils/functions/extract-params.js";
import { findFileInStack } from "../utils/functions/find-file-in-stack.js";
import { reduceMethodArguments } from "../utils/functions/reduce-method-arguments.js";
import { Log } from "../utils/log/log.js";
import { DecoratorLogKind } from "../utils/types/enums.js";
import { propertyLogGuard } from "../utils/log/log-guards.js";


export abstract class ChildWorkerFactory {
    static create(worker: any) {
        fromEvent<MessageEvent<Log>>(worker, "message")
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

                    if (propertyLogGuard(log)) {
                        log.previousValue = log.serializedPreviousValue ? JSON.parse(log.serializedPreviousValue) : undefined;
                        log.currentValue = log.serializedCurrentValue ? JSON.parse(log.serializedCurrentValue) : undefined;
                        delete log.serializedPreviousValue;
                        delete log.serializedCurrentValue;
                    }
                    else
                        log.inputs = reduceMethodArguments(extractParams(log.serializedData), log.serializedInputs);
                    log.output = log.serializedOutput ? JSON.parse(log.serializedOutput) : undefined;

                    delete log.startTime;
                    delete log.endTime;
                    delete log.serializedInputs;
                    delete log.serializedOutput;
                    delete log.serializedData;
                    return log;
                }),
                tap(console.log)
            ).subscribe();
    }
}
