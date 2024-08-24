
import { LoggerWorker } from "../../worker/main/main-worker.js";
import { deepCloneInputs } from "../functions/deep-clone-inputs.js";
import { ClassConstructorLog } from "../log/log.js";
import { LegacyArguments, ModernArguments } from "../types/globals.js";
import { modernDecoratorGuard } from "./decorator-kind-guard.js";
import { legacyMethodDecorator } from "./legacy-decorator.js";
import { modernDecorator } from "./modern-decorator.js";



//todo fix types
export function DecoratorHandler<T extends new (...args: unknown[]) => any>(...args: ModernArguments<T> | LegacyArguments<T>) {
    if (modernDecoratorGuard(args)) {
        return modernDecorator(args[0], args[1])
    }
    return (<T extends Function>(target: T, property?: string | symbol, descriptor?: PropertyDescriptor | number) => {
        if (typeof descriptor == "number") {
            const message = `cannot decorate parameter in "${property?.toString() ?? target.name}" with Method decorator`;
            const error = new SyntaxError(message);
            delete error.stack;
            throw error;
        }
        else
            if (property !== undefined) {
                if (descriptor !== undefined)
                    return legacyMethodDecorator(target, property, descriptor)
                const message = `cannot decorate "${property.toString()}" with Method when experimentalDecorators is set to true in ts-config.json`;
                const error = new SyntaxError(message);
                delete error.stack;
                throw error;
            } else {
                return (<T extends new (...args: unknown[]) => T>(target: T) => {
                    const log = new ClassConstructorLog();
                    log.name = target.name.concat("Constructor");
                    log.class = target.name;
                    log.stringifiedTarget = target.toString();
                    return new Proxy(target, {
                        construct(target, targetArguments) {
                            log.date = new Date().toISOString();
                            log.rawInputs = deepCloneInputs(targetArguments);
                            log.startTime = performance.now();
                            const results = new target(targetArguments);
                            log.endTime = performance.now();
                            log.stack = new Error().stack;
                            log.output = results.toString();
                            LoggerWorker.postLog(log);
                            return results;
                        }
                    })
                })(args[0])
            }
    })(args[0], args[1], args[2])
}