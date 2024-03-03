import { randomUUID } from "crypto";
import { Observable, map } from "rxjs";
import { DigestedLog, DigestorInput, LoggerState } from "../types/types.js";

export function digestLog(state: LoggerState) {
    return (source: Observable<DigestorInput>) => source.pipe(
        map(([trackedName, log]): DigestedLog | null => {
            const logsMetadata = state.get(trackedName);
            const uuid = randomUUID();
            if (logsMetadata) {
                logsMetadata.map.set(uuid, log);
                return [logsMetadata.map, uuid, logsMetadata.expiresAfter]
            }
            return null;
        })
    );
}