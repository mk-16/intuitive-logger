import { Observable, switchMap, tap, timer } from "rxjs";
import { DigestedLog } from "../types/types.js";

export function handleDigestedLog(digestedLog$: Observable<DigestedLog>) {
    return digestedLog$
        .pipe(
            switchMap(([map, uuid, timeToDigest]) =>
                timer(timeToDigest.value)
                    .pipe(
                        tap(() => {
                            map.delete(uuid);
                        })
                    )
            )
        );
}