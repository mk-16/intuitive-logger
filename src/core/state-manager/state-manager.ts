import { UUID, randomUUID } from "crypto";
import { Subject, filter } from "rxjs";
import { BaseLog } from "../../utils/models/logs/base-log/base-log.js";
import { digestLog } from "../../utils/streams-operators/digest-log/digest-log.js";
import { digestedLogHandler } from "../../utils/streams-operators/digested-log-handler/digested-log-handler.js";
import { DigestedLog, DigestorInput, Feature, FeatureMetadata, FeaturesMap } from "../../utils/types/types.js";
import { FunctionLog } from "../../utils/models/logs/function-log/function-log.js";
import { ObjectLog } from "../../utils/models/logs/object-log/object-log.js";

//TODO THINK OF A WORKER SOLUTION
export abstract class LoggerStateManager {
    public static readonly state = new Map<string, FeaturesMap>()
    public static readonly digestor$ = new Subject<DigestorInput>();
    public static readonly resetTimer$ = new Subject<void>();

    private static digestedLog(log: unknown): log is DigestedLog {
        return log !== null;
    }

    static {
        //todo?
        this.digestor$.pipe(
            digestLog(this.state),
            filter(this.digestedLog),
            digestedLogHandler,
        ).subscribe();
    }


    static {
        this.state.set('global', new Map())
    }

    //TODO: ADD CONTEXT CONDITIONS ADD THIS TO WORKER
    public static async addFeature(featureMetadata: FeatureMetadata) {
        const featuresMap = this.state.get(featureMetadata.relatedTo);
        const feature: Feature = {
            expiresAfter: featureMetadata.expiresAfter,
            logsMap: new Map<UUID, BaseLog>()
        }
        if (featuresMap) {
            if (!featuresMap.has(featureMetadata.featureName))
                featuresMap.set(featureMetadata.featureName, feature)
        }
        else
            this.state.set(featureMetadata.relatedTo, new Map<string, Feature>()
                .set(featureMetadata.featureName, feature)
            );
    }

    public static addLog([log, scopeName, featureName]: [BaseLog, string, string]) {
        const feature = this.state.get(scopeName)?.get(featureName);
        if (feature) {
            const uuid = randomUUID();
            feature.logsMap.set(uuid, log);
            setTimeout(() => {
                feature.logsMap.delete(uuid);
            }, feature.expiresAfter);
        }
        
        else {
            const error = new Error(`Cant Generate Log => Feature ${featureName} does not exist in ${scopeName} scope`);
            error.stack = undefined;
            throw error;
        }
    }
}