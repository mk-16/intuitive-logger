import { randomUUID } from "crypto";
import { Observable, map } from "rxjs";
import { DigestedLog, DigestorInput, LoggerState } from "../../types/types.js";

export function digestLog(state: LoggerState) {
    return (source: Observable<DigestorInput>) => source.pipe(
        map(([scopeName, trackedName, log]): DigestedLog | null => {
            const { map: featureMap, expiresAfter } = state.get(scopeName)?.map.get(trackedName) ?? {};
            const uuid = randomUUID();
            if (featureMap && expiresAfter) {
                featureMap.set(uuid, log);
                return [featureMap, uuid, expiresAfter]
            }
            return null;
        })
    );
}