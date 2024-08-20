import { filter, fromEvent, map, tap } from "rxjs";
import { findFileInStack } from "../../utils/functions/findFileInStack.js";
import { functionLogGuard } from "../../utils/log/log-guards.js";
try {
    if (self) {
        fromEvent(window, "message")
            .pipe(tap(event => console.log(event.target.name)), filter(event => event.target.name === "intuitive-logger-web-worker"), map(event => event.data), filter((log) => functionLogGuard(log)), map(log => {
            const runtime = (log.endTime ?? 0) - (log.startTime ?? 0);
            delete log.startTime;
            delete log.endTime;
            log.runtime = runtime;
            log.stack = log.stack ? findFileInStack(log.stack) : undefined;
            return log;
        }), tap(console.log))
            .subscribe();
    }
}
catch (e) {
}
export const url = import.meta.url;
//# sourceMappingURL=web-worker.js.map