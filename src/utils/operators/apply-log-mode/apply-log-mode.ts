import { filter, map, mergeMap, Observable, of, tap } from "rxjs";
import { noPostError } from "../../constants/constants.js";
import { postLog } from "../../functions/post-log/post-log.js";
import { Log } from "../../log/log.js";
import { MonitorOptions } from "../../types/globals.js";

export function applyLogMode(source: Observable<{ log: Log, configuration: Partial<MonitorOptions> | undefined }>) {
    return source.pipe(
        mergeMap(({ log, configuration }) => {
            switch (configuration?.mode) {
                case "both":
                    if (configuration?.post)
                        return of(configuration.post.map(endpoint => postLog(endpoint, log)))
                            .pipe(map(() => log), tap(console.log));
                    throw noPostError;
                case "network":
                    if (configuration?.post)
                        return of(configuration.post.map(endpoint => postLog(endpoint, log)));
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