import { filter, fromEvent, map, tap } from "rxjs";
import { isMainThread, parentPort } from "node:worker_threads";
import { findFileInStack } from "../../utils/functions/findFileInStack.js";
import { functionLogGuard } from "../../utils/log/log-guards.js";
import { FunctionLog, Log } from "../../utils/log/log.js";
if (!isMainThread && parentPort)
    fromEvent<MessageEvent<Log>>(parentPort, "message")
        .pipe(
            map(event => event.data),
            filter((log): log is FunctionLog => functionLogGuard(log)),
            map(log => {
                const runtime = (log.endTime ?? 0) - (log.startTime ?? 0);
                delete log.startTime
                delete log.endTime
                log.runtime = runtime;
                log.stack = log.stack ? findFileInStack(log.stack) : undefined
                return log;
            }),
            tap(console.log)
        )
        .subscribe();

export const url = import.meta.url;