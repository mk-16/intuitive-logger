import { filter, Observable } from "rxjs";
import { Log } from "../../log/log.js";

export function filterLog(source: Observable<Log | null>) {
    return source.pipe(
        filter((data): data is Log => data != null)
    )
}