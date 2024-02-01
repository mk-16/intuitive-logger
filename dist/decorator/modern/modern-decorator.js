"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModernDecorator = void 0;
const legacy_decorator_1 = require("../legacy/legacy-decorator");
class ModernDecorator extends legacy_decorator_1.LegacyDecorator {
    static target;
    static context;
    static modernClassGuard(target) {
        return target instanceof Function && target['constructor'] !== undefined;
    }
    static modernContextGuard(context) {
        return context instanceof Object && context.hasOwnProperty('kind');
    }
    static validateDecoratorSyntax(context) {
        if (context.kind === "field") {
            const syntaxError = new SyntaxError();
            syntaxError.cause = "Log decorator was placed on a property";
            syntaxError.message = "Log decorator cannot be placed on a property \n at:";
            syntaxError.stack = `${syntaxError.name}: \n ${syntaxError.message} ${syntaxError.stack?.split('\n').filter(str => str.includes('.ts')).pop()?.split('(')[1]?.slice(0, -1)}`;
            throw syntaxError;
        }
    }
    ;
    static executor(...args) {
        const target = args.shift();
        const context = args.pop();
        console.log({ target, context });
        if (ModernDecorator.modernContextGuard(context) && context.kind !== 'class') {
            // context.value = (...methodArguments: unknown[]) => {
            //     //todo log functionality
            //     const res = originalMethod(methodArguments);
            //     return res;
            // }
        }
        else
            return class extends target {
                constructor(...ctorArguments) {
                    //todo log functionality
                    console.log('wi wi instance created');
                    super(...ctorArguments);
                }
            };
    }
}
exports.ModernDecorator = ModernDecorator;
//# sourceMappingURL=modern-decorator.js.map