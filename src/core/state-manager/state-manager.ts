import { UUID, randomUUID } from "crypto";
import { Subject } from "rxjs";
import { BaseLog } from "../../utils/models/logs/base-log/base-log.js";
import { DigestorInput, Feature, FeatureMetadata, FeaturesMap } from "../../utils/types/types.js";

//TODO THINK OF A WORKER SOLUTION
export abstract class LoggerStateManager {
    public static readonly state = new Map<string, FeaturesMap>().set('global', new Map<string, Feature>())
    public static readonly digestor$ = new Subject<DigestorInput>();
    public static readonly resetTimer$ = new Subject<void>();

    //TODO: ADD CONTEXT CONDITIONS ADD THIS TO WORKER
    public static addFeature(featureMetadata: FeatureMetadata) {
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