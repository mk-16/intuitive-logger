import { ClassConstructorLog, ClassMethodLog, FunctionLog, Log, ObjectLog, PropertyLog } from "../log/log.js";

type KeyofLog = Omit<keyof Log | keyof PropertyLog | keyof ObjectLog |
    keyof ClassConstructorLog | keyof ClassMethodLog | keyof FunctionLog, "serializedData" | "source" |
    "serializedOutput" | "serializedInput" | "startTime" | "endTime" | "serializedPreviousValue" |
    "serializedCurrentValue"
>

export interface MonitorType {
    (options?: Partial<MonitorOptions>): any;
    new <T extends object>(...args: [T, Partial<MonitorOptions>]): T;
}

export type ModernArguments<T extends Function> = [T, DecoratorContext];
export type LegacyArguments<T> = [T, string | symbol, PropertyDescriptor | undefined];
export type LogScope = string | symbol;
export type LogContext = string | symbol;
export type MonitorVendorHeadersOption = HeadersInit;
export type MonitorVendorOption = {
    url: string | URL | Request;
    headers?: MonitorVendorHeadersOption;
}
export type MonitorOptionContext = {
    scope: string;
    name: string;
    source?: "method" | "function";
}


export type MonitorOptions = {
    level: number;
    tag: string;
    post: MonitorVendorOption[];
    mode: "local" | "network" | "both";
    environments: Record<string, string | undefined>;
    extension: unknown;
    async: "invocation" | "results" | "both";
    context?: Partial<MonitorOptionContext>;
    hide: (keyof MonitorOptions | KeyofLog)[]
}
