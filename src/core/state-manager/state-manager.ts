import { BehaviorSubject, of } from "rxjs";
import { BaseLog } from "../logs/base-log/base-log";
import { FunctionLog } from "../logs/function-log/function-log";
import { UUID, randomUUID } from "crypto";
export class LoggerStateManager {
    private static readonly state = new Map<string, Map<UUID, BaseLog>>();
    // private static state = new Map<string, LogType<FunctionLog | ObjectLog>[]>();

    public static newMap(key: string) {
        if (!this.state.has(key))
            this.state.set(key, new Map<UUID, BaseLog>());
        else
            throw new Error('Key already exists');
    }

    public static setKey(key: string) {
        if (!this.state.has(key)) { }
        // this.state.set(key, [])
    }

    public static updateState(key: string, log: BaseLog) {
        if (!this.state.has(key))
            throw new Error('Key does not exist');
        this.state.get(key)!.set(randomUUID(), log);
    }

    public static async getState() {
        const returningStateMap = new Map<string, readonly BaseLog[]>();
        // if (log instanceof FunctionLog && log.output instanceof Promise) {
        //     log.output.then(fullfilledOutput => {
        //         const endTime = performance.now();
        //         // log.output = fullfilledOutput;
        //         // log.executionTime = (endTime - log.date.getTime()).toFixed(4).concat(' ms')
        //         this.updateState(log.id, log);
        //     })
        // }
        for (const [stateKey, logsContainer] of this.state) {
            const returningLogsContainer: BaseLog[] = [];
            // for (const log of logsContainer) {
            //     if (log instanceof FunctionLog && log.output instanceof Promise)
            //         await log.output;
            //     const logClone = structuredClone(log);
            //     Object.freeze(logClone);
            //     returningLogsContainer.push(logClone);
            // }
            // Object.freeze(returningLogsContainer);
            // returningStateMap.set(stateKey, returningLogsContainer);
        }
        const returningState = Object.fromEntries(returningStateMap);
        Object.freeze(returningState);
        return returningState;
    }

    public static async getStateByUUID(uuid: string) {
        const returningStateSet = new Set<BaseLog>();
        const logsContainer = this.state.get(uuid) ?? [];
        // for (const log of logsContainer) {
        //     // if (log instanceof FunctionLog && log.output instanceof Promise)
        //     //     await log.output;
        //     // const logClone = structuredClone(log)
        //     // Object.freeze(logClone);
        //     // returningStateSet.add(logClone);
        // }
        const returningState = [...returningStateSet.values()];
        Object.freeze(returningState);
        return returningState;
    }

    public static clearState() {
        this.state.clear();
    }
}

