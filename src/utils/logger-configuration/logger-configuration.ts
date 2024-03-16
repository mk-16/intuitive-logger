import { LoggerStateManager } from "../../core/state-manager/state-manager.js";
import { LogsMetadata } from "../types/types.js";

export abstract class LoggerConfiguration {
    private static flag = false;
    public static set globalScope(value: LogsMetadata) {
        if (!this.flag) {
            this.flag = true;
            LoggerStateManager.addScope({
                context: value.context,
                expiresAfter: value.expiresAfter,
                scopeName: 'global'
            });
        }
    }
}