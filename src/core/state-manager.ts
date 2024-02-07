import { BaseLog } from './log';

export class LoggerStateManager {
    //TODO check option for weakMap
    private static state = new Map<string, BaseLog[]>();

    public static mapKey(key: string) {
        if (!this.state.has(key))
            this.state.set(key, [])
    }

    public static updateState(key: string, log: BaseLog) {
        this.state.get(key)?.push(log)
    }

    public static getImmidiateState(uuid?: string) {
        return uuid ? this.state.get(uuid) : this.state;
    }

    //TODO think of awaiting promised results in this method
    public static getFulfilledState(uuid?: string) {
    }
}