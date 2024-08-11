import { kind } from "../../utils/constants/kind.js";
import { LogMethodDecorator } from "../../utils/decorator/builder/method/method-decorator-builder.js";
import { LogPropertyDecorator } from "../../utils/decorator/builder/property/property-decorator-builder.js";
import { legacyLogMethodDecorator, legacyLogProperyDecorator, modernLogMethodDecorator, modernLogProperyDecorator } from "../../utils/decorator/log/log-decorators.js";
import { exceptionThrowTimer } from "../../utils/decorator/timer/timer.js";
import { DecoratorArguments, LegacyDecoratorProperty } from "../../utils/types/decorator-arguments.js";
import { MonitoringOptions } from "../../utils/types/monitoring-options.js";

function LogConstructorGuard<T>(target: unknown, args: unknown): args is T {
    return target === LogConstructor
}

function legacyGuard(target: unknown): target is LegacyDecoratorProperty {
    return kind == "legacy-decorator";
}

function LogConstructor(options: MonitoringOptions) {
    return <T extends object>(...args: DecoratorArguments<T>): any => {
        const [target, context, descriptor] = args;
        console.log({ tik: new.target })
        const test = LogMethodDecorator.bind(options);
        return legacyGuard(context) ?
            descriptor ?
                legacyLogMethodDecorator.call(options, target, context, descriptor)
                : legacyLogProperyDecorator.call(options, target, context)
            : context.kind == "method" ?
                modernLogMethodDecorator.call(options, target, context)
                : modernLogProperyDecorator.call(options, target, context)
    };
};

const Log = LogConstructor as any;
export { Log };

