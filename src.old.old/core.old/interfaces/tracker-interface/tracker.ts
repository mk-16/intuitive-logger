import { ITrackKeys } from "../track-keys-interface/track-keys.js"

export type ITracker = {
    track<T extends object>(target: T): ITrackKeys<T>
}