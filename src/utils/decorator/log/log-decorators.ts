import { prototype } from "mocha";
import { DecoratorArguments } from "../../types/decorator-arguments.js";
import { MonitoringOptions } from "../../types/monitoring-options.js";
import { exceptionThrowTimer } from "../timer/timer.js";

export function legacyLogProperyDecorator<T extends object>(this: MonitoringOptions, target: T, property: string | symbol) {
    console.log({ kind: "legacy", arguments: arguments, this: this });
    exceptionThrowTimer(target.constructor, `target`);
}

export function modernLogProperyDecorator<T extends object>(this: MonitoringOptions, target: T, context: ClassFieldDecoratorContext) {
    console.log({ kind: "modern", arguments: arguments })
    exceptionThrowTimer(target.constructor, `target`);
}

export function legacyLogMethodDecorator<T extends object>(this: MonitoringOptions, target: T, property: string | symbol, descriptor: PropertyDescriptor) {
    console.log({ name: legacyLogMethodDecorator.name, kind: "legacy", arguments: arguments, this: this });
    exceptionThrowTimer(target.constructor, `target`);
}

export function modernLogMethodDecorator<T extends object>(this: any, target: T, context: any) {
    context.metadata = 3;
    console.log({ this: new.target, target: context })
    Reflect.defineMetadata("test", 1, context);
    // (context.metadata ?? {})[context.name] = () => { return []; };
    // console.log({ name: modernLogMethodDecorator.name, kind: "modern", arguments: arguments });
    // Reflect.defineMetadata("context", 3, target)
    // console.log({ target, context: context.addInitializer, this: this, static: context.static });
    console.log(this)
    // console.log({ target: Object.getOwnPropertyDescriptors((target as any).constructor) });

    // console.log({ target, ntext, initializer:  })
    // exceptionThrowTimer(target.constructor, `target`);
}