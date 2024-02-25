import { BaseLog } from "../logs/base-log/base-log";

export class LoggerStateManager {
    private static state = new Map<string, BaseLog[]>();

    public static setKey(key: string) {
        if (!this.state.has(key))
            this.state.set(key, [])
    }

    public static updateState(key: string, log: BaseLog) {
        this.state.get(key)?.push(log)
    }

    public static getImmidiateState() {
        const copiedState = Object.fromEntries(this.state);
        Object.freeze(copiedState);
        for (const key in copiedState) {
            Object.freeze(copiedState[key]);
            copiedState[key].forEach(log => Object.freeze(log));
        }
        return copiedState;
    }

    public static getImmidiateStateByUUID(uuid: string) {
        const uuidState = this.state.get(uuid) ?? [];
        const frozenUUIDState = Array.from(uuidState, log => Object.freeze(log));
        const copiedUUIDState = Object.freeze(frozenUUIDState);
        return copiedUUIDState;
    }

    //TODO think of awaiting promised results in this method
    public static getFulfilledState(uuid?: string) {
    }

    public static clearState() {
        this.state.clear();
    }
}

// for (const [key, logs] of this.state) {
//     for (const log of logs) {
//         if (log instanceof FunctionLog && log.output instanceof Promise) {
//             await log.output
//         }
//     }
// }
// return this.state