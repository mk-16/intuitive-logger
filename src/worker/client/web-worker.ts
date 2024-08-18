import { filter, fromEvent, map, tap } from "rxjs";
import { findFileInStack } from "../../utils/functions/findFileInStack.js";
import { FunctionLog, Log } from "../../utils/log/log.js";
import { functionLogGuard } from "../../utils/log/log-guards.js";
export const url = import.meta.url;

try {
    self 
    fromEvent<MessageEvent<Log>>(self, "message")
    .pipe(
        filter(event => (event.target as any).name === "intuitive-logger-web-worker"),
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
}
catch (e){
    // console.log(e)
}
