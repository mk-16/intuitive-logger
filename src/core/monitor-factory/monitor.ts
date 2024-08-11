import { kind } from "../../utils/constants/kind.js";
import { legacyClassDecorator, modernClassDecorator } from "../../utils/decorator/monitor/monitor-decorators.js";
// import { MonitorDecorator } from "../../utils/decorator/builder/class/class-decorator-builder.js";
import type { Monitor } from "../../utils/types/monitor.js";
import { MonitoringOptions } from "../../utils/types/monitoring-options.js";

function MonitorConstructorGuard<T>(target: unknown, args: unknown): args is T {
    return target === MonitorConstructor
}

function MonitorConstructor<T extends object>(arg_0: T | MonitoringOptions, arg_1?: MonitoringOptions) {
    if (MonitorConstructorGuard<T>(new.target, arg_0)) {
        //todo add handler
        const proxy = new Proxy<T>(arg_0, {});
        return proxy;
    }
    return kind == "legacy-decorator" ? legacyClassDecorator.bind(arg_0) : modernClassDecorator.bind(arg_0);
};

const Monitor = MonitorConstructor as Monitor;
export { Monitor }