import { legacyMethodDecorator } from "../utils/decorators/legacy-decorator.js";
import { extractParams } from "../utils/functions/extract-params.js";
import { reduceMethodArguments } from "../utils/functions/reduce-method-arguments.js";
import { ClassConstructorLog } from "../utils/log/log.js";
import { LoggerWorker } from "../worker/main/main-worker.js";
function modernDecoratorGuard(args) {
    return typeof args[1] == "object";
}
function MonitorConstructor() {
    if (new.target == MonitorConstructor) {
        console.log("win");
        throw new Error("cannot be initiated with new keyword");
    }
    return (...args) => {
        if (modernDecoratorGuard(args)) {
            return ((target, context) => {
                console.log("modern decorator called", context.name);
            })(args[0], args[1]);
        }
        return ((target, property, descriptor) => {
            if (typeof descriptor == "number") {
                const message = `cannot decorate parameter in "${property?.toString() ?? target.name}" with Method decorator`;
                const error = new SyntaxError(message);
                delete error.stack;
                throw error;
            }
            else if (property !== undefined) {
                if (descriptor !== undefined)
                    return legacyMethodDecorator(target, property, descriptor);
                const message = `cannot decorate "${property.toString()}" with Method when experimentalDecorators is set to true in ts-config.json`;
                const error = new SyntaxError(message);
                delete error.stack;
                throw error;
            }
            else {
                return ((target) => {
                    const log = new ClassConstructorLog();
                    log.name = target.name.concat("Constructor");
                    log.class = target.name;
                    const params = extractParams(target.toString());
                    return new Proxy(target, {
                        construct(target, targetArguments) {
                            log.date = new Date().toISOString();
                            log.inputs = reduceMethodArguments(params, targetArguments);
                            log.startTime = performance.now();
                            const results = new target(targetArguments);
                            log.endTime = performance.now();
                            log.stack = new Error().stack;
                            log.output = results.toString();
                            LoggerWorker.postLog(log);
                            return results;
                        }
                    });
                })(args[0]);
            }
        })(args[0], args[1], args[2]);
    };
}
export const Monitor = MonitorConstructor;
//# sourceMappingURL=core.js.map