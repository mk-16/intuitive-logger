import { filter, fromEvent, map, tap } from "rxjs";
import { findFileInStack } from "../../utils/functions/findFileInStack.js";
import { functionLogGuard } from "../../utils/log/log-guards.js";
import('node:worker_threads')
    .then(({ isMainThread, parentPort }) => {
    if (!isMainThread && parentPort)
        fromEvent(parentPort, "message")
            .pipe(map(event => event.data), filter((log) => functionLogGuard(log)), map(log => {
            const runtime = (log.endTime ?? 0) - (log.startTime ?? 0);
            delete log.startTime;
            delete log.endTime;
            log.runtime = runtime;
            log.stack = log.stack ? findFileInStack(log.stack) : undefined;
            return log;
        }), tap(console.log))
            .subscribe();
})
    .catch(e => console.log("DID NOT FOUND THE WORKER MODULE", process));
export const url = import.meta.url;
//# sourceMappingURL=worker-thread.js.map