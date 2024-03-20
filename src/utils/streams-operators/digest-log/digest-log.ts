import { randomUUID } from "crypto";
import { Observable, map } from "rxjs";
import { DigestedLog, DigestorInput, LoggerState } from "../../types/types.js";

export function digestLog(state: LoggerState) {
    return (source: Observable<DigestorInput>) => source.pipe(
        map(([scopeName, featureName, log]): DigestedLog => {
            const feature = state.get(scopeName)!.get(featureName)!;
            const uuid = randomUUID();
            feature.logsMap.set(uuid, log);
            return [uuid, feature]
        })
    );
}