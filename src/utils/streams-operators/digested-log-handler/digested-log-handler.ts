import { Observable, concatMap, tap, timer } from "rxjs";
import { DigestedLog } from "../../types/types.js";

export function digestedLogHandler(digestedLog$: Observable<DigestedLog>) {
    return digestedLog$
        .pipe(
            concatMap(([logsSource, uuid, expirationTIme]) =>
                timer(expirationTIme)
                    .pipe(
                        tap(() => {
                            logsSource.delete(uuid);
                        })
                    )
            )
        );
}