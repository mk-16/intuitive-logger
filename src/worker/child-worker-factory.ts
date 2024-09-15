import { fromEvent } from "rxjs";
import { applyLogMode } from "../utils/operators/apply-log-mode/apply-log-mode.js";
import { filterLog } from "../utils/operators/filter-log/filter-log.js";
import { mapLog } from "../utils/operators/map-log/map-log.js";
import { Data } from "../utils/types/globals.js";


export abstract class ChildWorkerFactory {
    static create(worker: any) {
        return fromEvent(worker, "message", (event: MessageEvent): Data | null => {
            return event.data.log.source == "intuitive-logger-worker" ? event.data : null;
        }).pipe(filterLog, mapLog, applyLogMode);
    }
}
