import { Observable, concatMap, tap, timer } from "rxjs";
import { DigestedLog } from "../../types/types.js";

export function digestedLogHandler(digestedLog$: Observable<DigestedLog>) {
    return digestedLog$
        .pipe(
            concatMap(([uuid, Feature]) =>
                timer(Feature.expiresAfter)
                    .pipe(
                        tap(() => {
                            Feature.logsMap.delete(uuid);
                        })
                    )
            )
        );
}