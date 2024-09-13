import { Log, ObjectLog, PropertyLog } from "../log/log.js";
import { AsyncModes, KeysToHide, PostModes } from "./enums.js";

export type KeyofLog = Exclude<keyof Log | keyof PropertyLog | keyof ObjectLog, "serializedData" | "source" |
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
export type MonitorVendorOption = {
    url: string | URL | Request;
    headers?: HeadersInit;
}
export type MonitorOptionContext = {
    scope: string;
    name: string;
    source?: "method" | "function";
}


export type MonitorOptions = {
    level: number;
    tag: string | Set<string>;
    post: Map<string | URL | Request, HeadersInit>// MonitorVendorOption[];
    mode: PostModes;
    environments: Record<string, string>;
    extension: unknown;
    async: AsyncModes;
    context: Partial<MonitorOptionContext>;
    hide: KeysToHide[]
}
