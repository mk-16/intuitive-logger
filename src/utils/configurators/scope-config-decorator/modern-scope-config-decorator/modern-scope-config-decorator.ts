import { CONTEXT } from "../../../../index.js";
import { LogsMetadata } from "../../../types/types.js";

export abstract class ModernScopeConfigDecorator {
    static decorate(options?: Partial<LogsMetadata>) {
        return function <T>
            (target: T, context: ClassDecoratorContext) {
            console.log({ target, context })
            const scopeContext = options?.context ?? CONTEXT.INFO;
            const scopeExpTime = options?.expiresAfter ?? 24 * 60 * 60 * 1000
        }
    }
}