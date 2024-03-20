import { Feature, FeatureSnapshot } from "../../../utils/types/types.js";

export function generateFeatureSnapshot(feature: Feature) {
    const output: FeatureSnapshot = {
        expiresAfter: feature.expiresAfter,
        logsMap: {}
    }

    feature.logsMap.forEach((log, logID) => {
        output.logsMap[logID] = Object.freeze(Object.setPrototypeOf(structuredClone(log), log));
    })

    return Object.freeze(output);
}