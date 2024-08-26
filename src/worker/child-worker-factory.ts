import { filter, fromEvent, map, Subscription, tap } from "rxjs";
import { FunctionLog, Log } from "../utils/log/log.js";
import { functionLogGuard } from "../utils/log/log-guards.js";
import { reduceMethodArguments } from "../utils/functions/reduce-method-arguments.js";
import { extractParams } from "../utils/functions/extract-params.js";
import { findFileInStack } from "../utils/functions/find-file-in-stack.js";
import { deserialize } from "v8";
import { DecoratorLogKind, RegularLogKind } from "../utils/types/enums.js";


export abstract class ChildWorkerFactory {
    private static subscription: Subscription;
    static create(worker: any) {
        // this.subscription = fromEvent<MessageEvent<Log>>(worker, "message")
        //     .pipe(
        //         map(event => event.data),
        //         tap(e => console.log('WI WI WI')),
        //         filter((log): log is FunctionLog => functionLogGuard(log)),
        //         map(log => {
        //             const runtime = (log.endTime ?? 0) - (log.startTime ?? 0);
        //             delete log.startTime;
        //             delete log.endTime;
        //             log.inputs = reduceMethodArguments(extractParams(log.stringifiedTarget), log.rawInputs);
        //             delete log.stringifiedTarget;
        //             delete log.rawInputs;
        //             log.runtime = `${runtime}ms`;
        //             log.stack = log.stack ? findFileInStack(log.stack) : undefined;
        //             return log;
        //         }),
        //         tap(console.log)
        //     ).subscribe();

        this.subscription = fromEvent<MessageEvent<Log>>(worker, "message")
            .pipe(
                map(event => event.data),
                map(log => {
                    function isFunction(str: string | undefined) {
                        return str?.startsWith('class') || str?.startsWith('function') || str?.startsWith('() =>')
                    }
                    // function extractFunctionName(str: string) {
                    //     return str.
                    //  }
                    log.name = log.kind == DecoratorLogKind.Constructor ? log.serializedData?.split('class ')[1]?.split(' ')[0].concat('Constructor') : '';
                    log.date = new Date().toISOString();
                    log.stack = log.stack ? findFileInStack(log.stack) : undefined;
                    // delete log.buffer;
                    // log.name = log.rawContext
                    const runtime = (log.endTime ?? 0) - (log.startTime ?? 0);
                    delete log.startTime;
                    delete log.endTime;
                    log.inputs = reduceMethodArguments(extractParams(log.serializedData), log.serializedInputs);
                    delete log.serializedInputs;
                    log.output = log.serializedOutput ? JSON.parse(log.serializedOutput) : undefined;
                    delete log.serializedOutput;
                    delete log.serializedData;
                    log.runtime = `${parseFloat(runtime.toFixed(4))}ms`;

                    // log.stack = log.stack ? findFileInStack(log.stack) : undefined;
                    return log;
                }),
                tap(console.log)
            ).subscribe();
    }
}
