var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const config = {};
config.env = typeof window != "undefined" && window.document ? "client" : "server";
export const Monitor = MonitorConstructor;
class Calculator {
    property = 1;
    constructor(param) { }
    sum(left, right) {
        console.time("[method-time]");
        const results = Promise.resolve(1);
        console.timeEnd("[method-time]");
        return results;
    }
    multiply(a, b) {
        return this.sum(a, b);
    }
}
__decorate([
    Monitor()
], Calculator.prototype, "sum", null);
const test = new Calculator(1);
test.multiply(3, 4);
//# sourceMappingURL=core.js.map