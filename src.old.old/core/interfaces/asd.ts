export type KeysToTrack<T extends object> = (keyof T)[]
export type TrackingConfig = {
    condition: () => any
}
export type TrackerOptions<T extends object> = [TrackingConfig?, ...[...KeysToTrack<T>]]