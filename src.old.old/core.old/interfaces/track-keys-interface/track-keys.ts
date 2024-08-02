import { ITrackByCondition } from "../track-by-condintion-interface/track-by-condition.js"

export type ITrackKeys<T extends object> = {
    track_keys(...keys: (keyof T)[]): ITrackByCondition<T>
}