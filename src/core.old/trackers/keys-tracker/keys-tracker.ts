import { ITrackKeys } from "../../interfaces/track-keys-interface/track-keys.js";
import { ConditionalTracker } from "../conditional-tracker/conditional-tracker.js";

export class KeysTracker<T extends object> implements ITrackKeys<T> {
    constructor(private target: T) { }
    track_keys(...keys: (keyof T)[]): ConditionalTracker<T> {
        return new ConditionalTracker(this.target, new Set(keys))
    }
}