import { LogsMetadata } from "../../../types/types.js";

export abstract class LegacyScopeConfigDecorator {
    static decorate(options?: Partial<LogsMetadata>) {
        return function (target: unknown) {
            console.log({ options, target })
        }
    }
}