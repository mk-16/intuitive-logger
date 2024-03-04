import { UUID } from "crypto";
import { Subject, filter } from "rxjs";
import { BaseLog } from "../../utils/models/logs/base-log/base-log.js";
import { FunctionLog } from "../../utils/models/logs/function-log/function-log.js";
import { digestLog } from "../../utils/streams-operators/digest-log/digest-log.js";
import { digestedLogHandler } from "../../utils/streams-operators/digested-log-handler/digested-log-handler.js";
import { DigestedLog, DigestorInput, LoggerSnapshot, LoggerState, LogsFeature } from "../../utils/types/types.js";

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
            digestedLogHandler,
        ).subscribe();
    }

    public static addFeature({ trackByName, expiresAfter, logContext }: Required<LogsFeature>) {
        if (!this.state.has(trackByName)) {
            this.state.set(trackByName, {
                logContext: logContext,
                expiresAfter: expiresAfter,
                map: new Map<UUID, BaseLog>()
            });
        }
    }

    public static get snapshot() {
        const output: LoggerSnapshot = {};
        const snapshot = Object.fromEntries([...this.state.entries()]);
        for (const feature in snapshot) {
            for (const [metadataKey, log] of snapshot[feature].map.entries()) {
                output[feature] = {
                    logContext: snapshot[feature].logContext,
                    expiresAfter: snapshot[feature].expiresAfter,
                    map: {
                        ...output[feature]?.map,
                        [metadataKey]: log
                    }
                }
                Object.freeze(output[feature].map);
                Object.freeze(output[feature].map[metadataKey]);
                Object.freeze(output[feature]);
                if (log instanceof FunctionLog) {
                    Object.freeze(log.inputs);
                    Object.freeze(log.output);
                }
            }
        }
        return output;
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


    public static removeFeature(key: string) {
        this.state.delete(key);
        return this.state.size;
    }

    public static cleanse() {
        this.state.clear();
        return this.state.size;
    }
}