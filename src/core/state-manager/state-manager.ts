import { UUID, randomUUID } from "crypto";
import { Subject, filter } from "rxjs";
import { BaseLog } from "../../utils/models/logs/base-log/base-log.js";
import { digestLog } from "../../utils/streams-operators/digest-log.js";
import { handleDigestedLog } from "../../utils/streams-operators/handle-digested-log.js";
import { DigestedLog, DigestorInput, LoggerState, TrackOptions } from "../../utils/types/types.js";

export abstract class LoggerStateManager {
    private static readonly state: LoggerState = new Map();
    public static readonly digestor$ = new Subject<DigestorInput>();
    private static digestedLog(log: unknown): log is DigestedLog {
        return log !== null;
    }
    static {
        this.digestor$.pipe(
            digestLog(this.state),
            filter(this.digestedLog),
            handleDigestedLog,
        ).subscribe();
    }

    public static setContext({ trackByName, expiresAfter, logContext }: Required<TrackOptions>) {
        if (!this.state.has(trackByName)) {
            this.state.set(trackByName, {
                logContext: logContext,
                expiresAfter: expiresAfter,
                map: new Map<UUID, BaseLog>()
            });
        }
    }

    public static updateState(trackedName: string, log: BaseLog) {
        const logsMetadata = this.state.get(trackedName);
        if (logsMetadata) {
            const uuid = randomUUID();
            logsMetadata.map.set(uuid, log);
            // this.digestor$.next();
        }
    }

    public static async getState() {
        const returningStateMap = new Map<string, readonly BaseLog[]>();
        // if (log instanceof FunctionLog && log.output instanceof Promise) {
        //     log.output.then(fullfilledOutput => {
        //         const endTime = performance.now();
        //         // log.output = fullfilledOutput;
        //         // log.executionTime = (endTime - log.date.getTime()).toFixed(4).concat(' ms')
        //         this.updateState(log.id, log);
        //     })
        // }
        for (const [stateKey, logsContainer] of this.state) {
            const returningLogsContainer: BaseLog[] = [];
            // for (const log of logsContainer) {
            //     if (log instanceof FunctionLog && log.output instanceof Promise)
            //         await log.output;
            //     const logClone = structuredClone(log);
            //     Object.freeze(logClone);
            //     returningLogsContainer.push(logClone);
            // }
            // Object.freeze(returningLogsContainer);
            // returningStateMap.set(stateKey, returningLogsContainer);
        }
        const returningState = Object.fromEntries(returningStateMap);
        Object.freeze(returningState);
        return returningState;
    }

    public static async getStateByUUID(uuid: string) {
        const returningStateSet = new Set<BaseLog>();
        const logsContainer = this.state.get(uuid) ?? [];
        // for (const log of logsContainer) {
        //     // if (log instanceof FunctionLog && log.output instanceof Promise)
        //     //     await log.output;
        //     // const logClone = structuredClone(log)
        //     // Object.freeze(logClone);
        //     // returningStateSet.add(logClone);
        // }
        const returningState = [...returningStateSet.values()];
        Object.freeze(returningState);
        return returningState;
    }


    public static clearState(key?: string) {
        if (key) {
            this.state.delete(key);
        } else {
            this.state.clear();
        }
    }
}