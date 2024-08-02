import { ITrackKeys } from "../../interfaces/track-keys-interface/track-keys.js";
import { ITracker } from "../../interfaces/tracker-interface/tracker.js";
import { KeysTracker } from "../keys-tracker/keys-tracker.js";

export class Tracker implements ITracker {
    constructor() {
    }

    track<T extends object>(target: T): ITrackKeys<T> {
        return new KeysTracker(target)
    }
}
