"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
// import "source-map-support/register";
/**
 * If the class decorator returns a value, it will replace the class declaration with the provided constructor function.
 * If the method decorator returns a value, it will be used as the Property Descriptor for the method.
 * If the accessor decorator returns a value, it will be used as the Property Descriptor for the member.
 * If the property decorator returns a value,it will be ignored
 * If the parameter decorator returns a value,it will be ignored
 */
// import { LoggerDecorator as LoggerDecoratorType } from './types/types';
const legacy_decorator_1 = require("./decorator/legacy/legacy-decorator");
const modern_decorator_1 = require("./decorator/modern/modern-decorator");
class Logger {
    static wrapTarget() {
        console.log("logger is printing");
    }
}
class LoggerDecorator extends Logger {
    static _reference;
    static wrapTarget(...args) {
        console.log('wrapping');
        args; //TODO MAYBE I DO NEED AN INSTANCE 
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
            return legacy_decorator_1.LegacyDecorator;
        }
        console.log('modern decorator');
        return modern_decorator_1.ModernDecorator;
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
exports.Log = LoggerFactory.create("decorator").wrapTarget;
//# sourceMappingURL=decorator.js.map