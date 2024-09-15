import { filter, Observable } from "rxjs";
import { Data } from "../../types/globals.js";

export function filterLog(source: Observable<Data | null>) {
    return source.pipe(
        filter((data): data is Data => data != null)
    )
}