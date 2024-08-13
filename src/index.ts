import { legacyMethodDecorator } from "./core/decorators/method-decorator/legacy-method-decorator.js";
import { LoggerWorker } from "./node-main-worker.js";
import { extractParams } from "./utils/extract-params.js";
import { ConstructorLog } from "./utils/log.js";
import { reduceFunctionArguments } from "./utils/reduce-function-arguments.js";
import { LegacyArguments, ModernArguments, MonitorType } from "./utils/types.js";


function modernDecoratorGuard<T>(args: ModernArguments<T> | LegacyArguments<T>): args is ModernArguments<T> {
    return typeof args[1] == "object"
}
function MonitorConstructor(this: any) {
    if (new.target == MonitorConstructor) {
        console.log("win");
        throw new Error("cannot be initiated with new keyword")
    }

    return <T extends new (...args: unknown[]) => T>(...args: ModernArguments<T> | LegacyArguments<T>) => {
        if (modernDecoratorGuard(args)) {
            return (<T>(target: T | undefined, context: DecoratorContext) => {
                console.log("modern decorator called", context.name)
            })(args[0], args[1])
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
                        const log = new ConstructorLog();
                        log.name = `${target.name}Constructor`;
                        log.class = target.name;
                        const params = extractParams(target.toString());
                        return new Proxy(target, {
                            construct(target, targetArguments) {
                                log.date = new Date().toISOString();
                                log.inputs = reduceFunctionArguments(params, targetArguments);
                                log.startTime = performance.now();
                                const results = new target(targetArguments);
                                log.endTime = performance.now();
                                log.stack = new Error().stack;
                                log.output = results;
                                LoggerWorker.postLog(log);
                                return results;
                            }
                        });
                    })(args[0])
                }
        })(args[0], args[1], args[2])
    }
}

const config: Record<string, any> = {};
config.env = typeof window != "undefined" && window.document ? "client" : "server"

const Monitor = MonitorConstructor as MonitorType;



@Monitor()
class Calculator {
    property = 1;
    constructor(param: number, parpar?: any) { }

    @Monitor()
    sum(left: number, right: number) {
        console.time("[method-time]")
        const results = Promise.resolve(1);
        console.timeEnd("[method-time]")
        return results;
    }

    @Monitor()
    multiply(a: number, b: number) {
        return this.sum(a, b);
    }
}

const test = new Calculator(1);
const test3 = new Calculator(2);
console.log(test)
test.multiply(3, 4);