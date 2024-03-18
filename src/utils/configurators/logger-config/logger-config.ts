import { LoggerStateManager } from "../../../core/state-manager/state-manager.js";
import { LogsMetadata } from "../../types/types.js";

export abstract class LoggerConfig {
    public static set globalScope(value: LogsMetadata) {
        LoggerStateManager.addScope({
            persist: value.persist,
            context: value.context,
            expiresAfter: value.expiresAfter,
            scopeName: 'global'
        }, true, true);
    }
}