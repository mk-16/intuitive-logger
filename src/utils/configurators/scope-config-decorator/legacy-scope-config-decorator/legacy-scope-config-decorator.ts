import { CONTEXT } from "../../../models/enums/log-level/log-level.js";
import { LogsMetadata } from "../../../types/types.js";

export abstract class LegacyScopeConfigDecorator {
    static decorate(options?: Partial<LogsMetadata>) {
        return function <T>(target: T) {
            const scopeContext = options?.context ?? CONTEXT.INFO;
            const scopeExpTime = options?.expiresAfter ?? 24 * 60 * 60 * 1000
        }
    }
}