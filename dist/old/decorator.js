import { LegacyDecorator } from "./decorator/legacy/legacy-decorator";
import { ModernDecorator } from "./decorator/modern/modern-decorator";
class Logger {
    static wrapTarget() {
        console.log("logger is printing");
    }
}
class LoggerDecorator extends Logger {
    static _reference;
    static wrapTarget(...args) {
        console.log('wrapping');
        args;
        return LoggerDecorator.decorate;
    }
    static decorate(...args) {
        console.log('decorating');
        if (LoggerDecorator._reference === undefined)
            LoggerDecorator._reference = LoggerDecorator.inferDecoratorVersion(...args);
        LoggerDecorator._reference.validateDecoratorSyntax(...args);
        return LoggerDecorator._reference.executor(...args);
    }
    static isLegacyDecorator(args) {
        return args.length !== 2;
    }
    static inferDecoratorVersion(...args) {
        if (LoggerDecorator.isLegacyDecorator(args)) {
            console.log('legacy decorator');
            return LegacyDecorator;
        }
        console.log('modern decorator');
        return ModernDecorator;
    }
}
class LoggerFactory {
    static create(type) {
        switch (type) {
            case "classic":
                return Logger;
            case "decorator":
                return LoggerDecorator;
        }
    }
}
export const Log = LoggerFactory.create("decorator").wrapTarget;
//# sourceMappingURL=decorator.js.map