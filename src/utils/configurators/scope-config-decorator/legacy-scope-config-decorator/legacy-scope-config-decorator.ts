import { LogsMetadata } from "../../../types/types.js";

export abstract class LegacyScopeConfigDecorator {
    static decorate(options?: Partial<LogsMetadata>) {
        return function <T>(target: T) {
            console.log({ options, target })
        }
    }
}