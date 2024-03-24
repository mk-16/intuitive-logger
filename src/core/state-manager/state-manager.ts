import { UUID, randomUUID } from "crypto";
import { BaseLog } from "../../utils/models/logs/base-log/base-log.js";
import { Feature, FeatureMetadata, FeaturesMap } from "../../utils/types/types.js";

//TODO THINK OF A WORKER SOLUTION
export abstract class LoggerStateManager {
    public static readonly state = new Map<string, FeaturesMap>()
    static {
        this.state.set('global', new Map())
    }

    public static addScope(scopeName: string) {
        if (!this.state.has(scopeName))
            this.state.set(scopeName, new Map())
        else {
            const error = new Error('Context Error');
            error.message = `scope name already in scope and cannot be overwritten`
            error.stack = undefined;
            throw error;
        }
    }

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

    static addLog(log: BaseLog, scopeName: string, featureName: string) {
        const feature = this.state.get(scopeName)?.get(featureName);
        if (feature) {
            const uuid = randomUUID();
            feature.logsMap.set(uuid, log);
            setTimeout(() => {
                feature.logsMap.delete(uuid);
            }, feature.expiresAfter);
        }
        else {
            const error = new Error('Context Error');
            error.message = `feature ${featureName}, does not exist in ${scopeName} scope`
            error.stack = undefined;
            throw error;
        }
    }
}