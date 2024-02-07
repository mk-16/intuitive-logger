import { BaseLog } from './log';
export declare class LoggerStateManager {
    private static state;
    static mapKey(key: any): void;
    static updateState(key: any, log: BaseLog): void;
    static getState(): Map<any, BaseLog[]>;
}
//# sourceMappingURL=state-manager.d.ts.map