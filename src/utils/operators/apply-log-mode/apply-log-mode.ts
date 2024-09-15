import { filter, map, mergeMap, Observable, of, tap } from "rxjs";
import { noPostError } from "../../constants/constants.js";
import { postLog } from "../../functions/post-log/post-log.js";
import { InternalLog, Log } from "../../log/log.js";
import { PostModes } from "../../types/enums.js";
import { MonitorVendorOption } from "../../types/globals.js";

export function applyLogMode(source: Observable<[Log, keyof typeof PostModes, MonitorVendorOption[] | undefined]>) {
    return source.pipe(
        mergeMap(([log, mode, endpoints]) => {
            switch (mode) {
                case "both":// TODO: THIS CASES DO NOT MATCH THE CURRENT NEED FIX
                    if (endpoints)
                        return of(endpoints.map(endpoint => postLog(endpoint, log)))
                            .pipe(map(() => log), tap(console.log));
                    throw noPostError;
                case "network":
                    if (endpoints)
                        return of(endpoints.map(endpoint => postLog(endpoint, log)));
                    throw noPostError;
                case "user":
                    return of(log);
                default:
                    return of(undefined).pipe(
                        tap(() => console.log(log)),
                        filter(event => event != null)
                    );
            }
        }),
    )
}