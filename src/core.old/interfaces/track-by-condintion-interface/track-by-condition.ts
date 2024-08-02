export type ITrackByCondition<T extends object> = {
    track_by_condition(condition: (options: any) => boolean): T
}