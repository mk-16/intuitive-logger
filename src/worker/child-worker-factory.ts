import { fromEvent } from "rxjs";
import { Log } from "../utils/log/log.js";
import { applyLogMode } from "../utils/operators/apply-log-mode/apply-log-mode.js";
import { filterLog } from "../utils/operators/filter-log/filter-log.js";
import { mapLog } from "../utils/operators/map-log/map-log.js";


export abstract class ChildWorkerFactory {
    static create(worker: any) {
        return fromEvent(worker, "message", (event: MessageEvent): Log => {
            return event.data.source == "intuitive-logger-worker" ? event.data : null;
        }).pipe(filterLog, mapLog, applyLogMode);
    }
}
