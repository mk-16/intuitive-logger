import { BaseLog } from './log';

export class LoggerStateManager {
    private static state = new Map<any, BaseLog[]>();

    public static mapKey(key: any) {
        if (!this.state.has(key))
            this.state.set(key, [])
    }

    public static updateState(key: any, log: BaseLog) {
        this.state.get(key)?.push(log)
    }

    public static getState() {
        return this.state
    }
}