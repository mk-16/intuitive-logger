import { LogsMetadata } from "../../../types/types.js";

export abstract class LegacyScopeConfigDecorator {
    static decorate(options: Partial<LogsMetadata>): any {
        return function <This, Args extends any[], Return, Fn extends (this: This, ...args: Args) => Return>
            (target: Fn, propertyKey?: string | undefined, propertyDescriptor?: PropertyDescriptor) {

        }
    }
}