import { Class } from "../../types/types";
import { LegacyDecorator } from "../legacy/legacy-decorator";

export abstract class ModernDecorator extends LegacyDecorator {
    protected static target: ClassDecorator | MethodDecorator;
    protected static context: ClassDecoratorContext | ClassMethodDecoratorContext
    static modernClassGuard(target: unknown): target is Class {
        return target instanceof Function && target['constructor'] !== undefined;
    }

    static modernContextGuard(context: unknown): context is DecoratorContext {
        return context instanceof Object && context.hasOwnProperty('kind')
    }
    static override validateDecoratorSyntax(context: DecoratorContext) {
        if (context.kind === "field") {
            const syntaxError = new SyntaxError();
            syntaxError.cause = "Log decorator was placed on a property";
            syntaxError.message = "Log decorator cannot be placed on a property \n at:"
            syntaxError.stack = `${syntaxError.name}: \n ${syntaxError.message} ${syntaxError.stack?.split('\n').filter(str => str.includes('.ts')).pop()?.split('(')[1]?.slice(0, -1)}`;
            throw syntaxError;
        }
    };

    static override executor<T extends new (...args: any[]) => any>(...args: unknown[]): T | void {
        const target = args.shift();
        const context = args.pop();
        console.log({ target, context })
        if (ModernDecorator.modernContextGuard(context) && context.kind !== 'class') {
            // context.value = (...methodArguments: unknown[]) => {
            //     //todo log functionality
            //     const res = originalMethod(methodArguments);
            //     return res;
            // }
        }
        else
            return class extends (target as T) {
                constructor(...ctorArguments: any[]) {
                    //todo log functionality
                    console.log('wi wi instance created')
                    super(...ctorArguments)
                }
            }
    }


    // static override executor(...args: unknown[]) {

    //     const target = args.shift();
    //     // const context: DecoratorContext = args.shift();
    //     console.log({ target, args })
    //     // if (ModernDecorator.classGuard(target, args)) {
    //     // console.log('class DECORATOR')
    //     // }
    //     // const originalMethod: new (...args: unknown[]) => any = (args[0] as any)
    //     // originalMethod;

    //     // return class extends originalMethod {
    //     //     constructor(...ctorArguments: unknown[]) {
    //     //         super(...ctorArguments)
    //     //     }
    //     // };


    //     console.log('executing')
    // }
}