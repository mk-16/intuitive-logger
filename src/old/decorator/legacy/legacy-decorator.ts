import { constants, accessSync, readFileSync } from 'fs';
import { join } from 'path';
import { Logger } from '../../core/logger';
Logger;
import type { Class } from '../../types/types';
import { LegacyDecoratorUtils } from "../utils/utils-decorator";
import { cwd } from 'process';
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
                executionTime; methodArguments; originalMethod;
                const trace = new Error();
                try {
                    const fileName = 'intuitive-logger.json';
                    const filePath = join(cwd(), fileName);
                    accessSync(fileName, constants.R_OK | constants.W_OK)
                    const config = readFileSync(filePath, 'utf-8');
                    console.log({ config: JSON.parse(config) })

                } catch (e) {
                    console.log('no filepath')
                    console.log('no filepath')
                }
                const splittedStack = trace.stack?.split('\n') ?? [];
                const tracedIndex = splittedStack?.findIndex(str => str.includes('intuitive-logger')) + 1;
                // const tracedTarget = splittedStack[tracedIndex]?.split('(')[1]?.slice(0, -1);
                // const currentDirectory = cwd();
                // const stack = currentDirectory + '\\' + tracedTarget?.replaceAll('/', '\\').split('\\').slice(currentDirectory.split('\\').length).join('\\')
                if (typeof target === 'object' && target !== null || typeof target === "function") {

                    Logger.trackMethod({
                        class: target.constructor.name,
                        method: originalMethod.name,
                        inputs: methodArguments,
                        executionTime,
                        at: tracedIndex,
                        ssss: splittedStack,
                        asd: splittedStack[tracedIndex]
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