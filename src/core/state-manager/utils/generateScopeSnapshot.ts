import { FeaturesMap, ScopeSnapshot } from "../../../utils/types/types.js";
import { generateFeatureSnapshot } from "./generateFeatureSnapshot.js";

export function generateScopeSnapshot(featuresMap: FeaturesMap) {
    const output: ScopeSnapshot = {}
    featuresMap.forEach((feature, featureName) => {
        const featureSnapshot = generateFeatureSnapshot(feature)
        output[featureName] = featureSnapshot
    })

    return Object.freeze(output);
}