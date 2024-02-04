/**
 * If the class decorator returns a value, it will replace the class declaration with the provided constructor function.
 * If the method decorator returns a value, it will be used as the Property Descriptor for the method.
 * If the accessor decorator returns a value, it will be used as the Property Descriptor for the member.
 * If the property decorator returns a value,it will be ignored
 * If the parameter decorator returns a value,it will be ignored
 */
// import { LoggerDecorator as LoggerDecoratorType } from './types/types';
import { LegacyDecorator } from "./decorator/legacy/legacy-decorator";
import { ModernDecorator } from "./decorator/modern/modern-decorator";
class Logger {
    static wrapTarget(): any {
        console.log("logger is printing")
    }
}


class LoggerDecorator extends Logger {
    private static _reference: typeof LegacyDecorator;

    static override wrapTarget(...args: any) {
        console.log('wrapping')
        args;//TODO MAYBE I DO NEED AN INSTANCE 
        return LoggerDecorator.decorate;
    }

    private static decorate(...args: unknown[]) {
        console.log('decorating')
        if (LoggerDecorator._reference === undefined)
            LoggerDecorator._reference = LoggerDecorator.inferDecoratorVersion(...args);
        LoggerDecorator._reference.validateDecoratorSyntax(...args);
        return LoggerDecorator._reference.executor(...args);
    }

    private static isLegacyDecorator(args: unknown[]) {
        return args.length !== 2;
    }

    private static inferDecoratorVersion(...args: unknown[]) {
        if (LoggerDecorator.isLegacyDecorator(args)) {
            console.log('legacy decorator')
            return LegacyDecorator;
        }
        console.log('modern decorator')
        return ModernDecorator;
    }
}

abstract class LoggerFactory {
    public static create(type: "classic" | "decorator") {
        switch (type) {
            case "classic":
                return Logger;
            case "decorator":
                return LoggerDecorator;
        }
    }
}

export interface LoggerDecoratorType {
    new(): void;
    (...args: any[]): any;
}
export const Log: LoggerDecoratorType = LoggerFactory.create("decorator").wrapTarget as LoggerDecoratorType;