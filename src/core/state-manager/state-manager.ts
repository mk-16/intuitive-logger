import { UUID } from "crypto";
import { Subject, concatMap, filter, map, tap, timer } from "rxjs";
import { BaseLog } from "../../utils/models/logs/base-log/base-log.js";
import { digestLog } from "../../utils/streams-operators/digest-log/digest-log.js";
import { digestedLogHandler } from "../../utils/streams-operators/digested-log-handler/digested-log-handler.js";
import { DigestedLog, DigestorInput, FeatureMetadata, FeatureSnapshot, LoggerState, Scope, ScopeMetadata, ScopeSnapshot, Snapshot } from "../../utils/types/types.js";
import { CONTEXT } from "../../utils/models/enums/log-level/log-level.js";


export abstract class LoggerStateManager {
    private static readonly state: LoggerState = new Map()
    public static readonly digestor$ = new Subject<DigestorInput>();
    public static readonly scopeCleaner$ = new Subject<string>();

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

    static {
        this.scopeCleaner$.pipe(
            map((scopeName): [number | undefined, string] => [this.state.get(scopeName)?.expiresAfter, scopeName]),
            filter(([expirationTime]: [number | undefined, string]) => expirationTime !== undefined),
            concatMap(([expirationTime, scopeName]) =>
                timer(expirationTime!)
                    .pipe(
                        tap(() => {
                            this.state.delete(scopeName);
                        })
                    )
            )
        ).subscribe();
    }

    static {
        this.addScope({
            context: CONTEXT.DEBUG,
            expiresAfter: 24 * 60 * 60 * 1000,
            scopeName: 'global'
        });
    }

    // static updateGlobal() { }
    static addScope({ scopeName, context, expiresAfter }: ScopeMetadata) {
        if (!this.state.has(scopeName)) {
            this.state.set(scopeName, {
                context,
                expiresAfter,
                map: new Map()
            });
            this.scopeCleaner$.next(scopeName);
        }
    }

    public static addFeature({ featureName, context, expiresAfter }: FeatureMetadata, scope: string) {
        const featuresMap = this.state.get(scope)?.map;
        if (featuresMap) {
            if (!featuresMap.has(featureName)) {
                featuresMap.set(featureName, {
                    context,
                    expiresAfter,
                    map: new Map<UUID, BaseLog>()
                });
            }
        }
    }

    public static asd<T>(targetMap: T, map: Map<string, any>) {
        map.forEach((value, key) => {
            Object.defineProperty(targetMap, key, {
                configurable: false,
                enumerable: true,
                value: Object.freeze(Object.setPrototypeOf(structuredClone(value), value)),
                writable: false
            })
        })
    }

    public static get snapshot() {
        const stateClone: Snapshot = {};
        this.state.forEach((scope, scopeKey) => {
            stateClone[scopeKey] = {
                ...scope,
                map: {}
            };

            scope.map.forEach((feature, featureKey) => {
                stateClone[scopeKey].map[featureKey] = {
                    ...feature,
                    map: {}
                };

                feature.map.forEach((log, uuid) => {
                    stateClone[scopeKey].map[featureKey].map[uuid] = Object.freeze(Object.setPrototypeOf(structuredClone(log), log))
                });

                Object.freeze(stateClone[scopeKey].map[featureKey].map);
            });

            Object.freeze(stateClone[scopeKey].map);
        });
        return Object.freeze(stateClone);
    }

    public static getScopeSnapshot(scope: string = 'global') {
        const requestedScope = this.state.get(scope);
        if (requestedScope) {
            const output: ScopeSnapshot = {
                ...requestedScope,
                map: {}
            }

            requestedScope.map.forEach((feature, featureName) => {
                output.map[featureName] = { ...feature, map: {} };
                feature.map.forEach((log, logID) => {
                    output.map[featureName].map[logID] = Object.freeze(Object.setPrototypeOf(structuredClone(log), log));
                })
                Object.freeze(output.map[featureName].map)
                Object.freeze(output.map[featureName])
            })

            Object.freeze(output.map)
            return Object.freeze(output);
        }
    }

    public static getFeatureSnapshot(feature: string, scope: string = 'global') {
        const requestedFeature = this.state.get(scope)?.map.get(feature);
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