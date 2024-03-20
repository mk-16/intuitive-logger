import { FeaturesMap, Snapshot } from "../../../utils/types/types.js";
import { generateScopeSnapshot } from "./generateScopeSnapshot.js";

export function generateStateSnapshot(state: Map<string, FeaturesMap>) {
    const stateClone: Snapshot = {};
    state.forEach((featuresMap, scopeKey) => {
        stateClone[scopeKey] = generateScopeSnapshot(featuresMap);
    });
    return Object.freeze(stateClone);
}