import { LogsMetadata } from "../../../types/types.js";

export abstract class ModernScopeConfigDecorator {
    static decorate(options: Partial<LogsMetadata>): any {

        // return function <This, Args extends any[], Return, Fn extends (this: This, ...args: Args) => Return>
        //     (this: This, target: Fn, context: DecoratorContext) {
        //     console.log({ target, context })
        // }

        return function <This, Args extends any[], Return, Fn extends (this: This, ...args: Args) => Return>
            (target: Fn, context: DecoratorContext) {
            console.log({ target, context })
        }
    }
}