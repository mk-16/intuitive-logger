import { TrackingConfig } from "./asd.js"

export type ITracker<T extends Object> = {
    new(target: T): T
    // new(target: T, config?: TrackingConfig): T
    // new(target: T, ...KeysToTrack: (keyof T)[]): T
    // new(target: T, config: TrackingConfig, ...KeysToTrack: (keyof T)[]): T
}