import { BehaviorSubject, of } from "rxjs";
import { UUID, randomUUID } from "crypto";
import { BaseLog } from "../../models/logs/base-log/base-log.js";
export abstract class LoggerStateManager {
    private static readonly state = new Map<string, Map<UUID, BaseLog>>();
    public static setKey(key: string) {
        if (!this.state.has(key)) {
            this.state.set(key, new Map<UUID, BaseLog>());
        }
    }

    public static updateState(key: string, log: BaseLog) {
        this.state.get(key)?.set(randomUUID(), log);
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


    public static clearState(key?: string) {
        if (key) {
            this.state.delete(key);
        } else {
            this.state.clear();
        }
    }
}