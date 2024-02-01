import { Logger } from '../../core/logger';
import type { Class } from '../../types/types';
import { LegacyDecoratorUtils } from "../utils/utils-decorator";
export abstract class LegacyDecorator {
    static executor(...args: unknown[]): Class | void {
        args
        const target = args.shift();
        const context = args.pop();
        if (LegacyDecoratorUtils.methodGuard(context)) {
            const originalMethod = context.value;
            context.value = (...methodArguments: unknown[]) => {

                const startTime = performance.now();
                // const res = originalMethod(...methodArguments);
                const endTime = performance.now();
                const executionTime = (endTime - startTime).toPrecision(3).concat('ms');
                const trace = new Error();
                // console.log({ target, typeof: typeof target, arguments , class: (target as any).name})
                if (typeof target === 'object' && target !== null || typeof target === "function") {

                    Logger.trackMethod({
                        class: target.constructor.name,
                        method: originalMethod.name,
                        inputs: methodArguments,
                        executionTime,
                        at: trace.stack?.split('\n')//.filter(str => str.includes('.ts')).pop()?.split('(')[1]?.slice(0, -1)
                    })
                }
                console.log("executing method decorator")
                // return res;
            }
        }
        else if (LegacyDecoratorUtils.classGuard(target))
            return class extends target {
                constructor(...ctorArguments: any[]) {
                    console.log("class decorator")
                    //todo log functionality
                    super(...ctorArguments)
                }
            };
        else
            console.log('error')
    }

    static validateDecoratorSyntax(...args: unknown[]): void {
        console.log("validating syntax")
        if (args.includes(undefined)) {
            const syntaxError = new SyntaxError();
            syntaxError.cause = "Log decorator was placed on a param or property";
            syntaxError.message = "Log decorator cannot be placed on a param or property \n at:"
            syntaxError.stack = `${syntaxError.name}: \n ${syntaxError.message} ${syntaxError.stack?.split('\n').filter(str => str.includes('.ts')).pop()?.split('(')[1]?.slice(0, -1)}`;
            throw syntaxError;
        }
        console.log("syntax validated")
    }
}