import { DecoratorArguments } from "./decorator-arguments.js";
import { MonitoringOptions } from "./monitoring-options.js";
export interface Monitor {
    new <T extends object>(target: T, options?: MonitoringOptions): T
    <T extends object>(options?: MonitoringOptions): (target: T, context?: ClassDecoratorContext, descriptor?: number) => T
}
