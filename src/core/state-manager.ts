import { BaseLog, FunctionLog } from './log';

export class LoggerStateManager {
    private static state = new Map<any, BaseLog[]>();

    public static mapKey(key: any) {
        if (!this.state.has(key))
            this.state.set(key, [])
    }

    public static updateState(key: any, log: BaseLog) {
        this.state.get(key)?.push(log)
    }

    public static async getState() {
        for (const [key, logs] of this.state) {
            for (const log of logs) {
                if (log instanceof FunctionLog && log.output instanceof Promise) {
                    await log.output
                }
            }
        }
        return this.state
    }
}