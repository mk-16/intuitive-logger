import { UUID } from "crypto";
import { Subject, filter, tap } from "rxjs";
import { BaseLog } from "../../utils/models/logs/base-log/base-log.js";
import { digestLog } from "../../utils/streams-operators/digest-log/digest-log.js";
import { digestedLogHandler } from "../../utils/streams-operators/digested-log-handler/digested-log-handler.js";
import { DigestedLog, DigestorInput, FeatureSnapshot, LoggerState, LogsFeature, Snapshot } from "../../utils/types/types.js";

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
        const stateClone: Snapshot = {};
        this.state.forEach((feature, featureKey) => {
            stateClone[featureKey] = Object.freeze({
                expiresAfter: feature.expiresAfter,
                logContext: feature.logContext,
                map: {}
            });

            feature.map.forEach((log, uuid) => {
                stateClone[featureKey].map[uuid] = Object.freeze(Object.setPrototypeOf(structuredClone(log), log))
            });

            Object.freeze(stateClone[featureKey].map);
        })

        return Object.freeze(stateClone);
    }

    public static getFeatureSnapshot(feature: string) {
        const requestedFeature = this.state.get(feature);
        if (requestedFeature) {
            const output: FeatureSnapshot = {
                ...requestedFeature,
                map: {}
            }
            requestedFeature.map.forEach((log, key) => {
                output.map[key] = Object.freeze(Object.setPrototypeOf(structuredClone(log), log));
            })

            Object.freeze(output.map)
            return Object.freeze(output);
        }
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