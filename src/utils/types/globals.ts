import { MonitorOptions } from "../../core/logger.js";
import { InternalLog, ObjectLog, PropertyLog } from "../log/log.js";

export type KeyofLog = Exclude<keyof InternalLog | keyof PropertyLog | keyof ObjectLog, "serializedData" | "source" |
    "serializedOutput" | "serializedInput" | "startTime" | "endTime" | "serializedPreviousValue" |
    "serializedCurrentValue"
>

export interface MonitorType {
    (options?: Partial<MonitorOptions>): any;
    new <T extends object>(...args: [T, Partial<MonitorOptions>?]): T;
}
export type Configuration = {
    name: string;
    type: "app" | "service" | "server" | "gateway";
    options: MonitorOptions;
    levels: string[];
}
export type Data = { log: InternalLog, config: Configuration }
export type ModernArguments<T extends Function> = [T, DecoratorContext];
export type LegacyArguments<T> = [T, string | symbol, PropertyDescriptor | undefined];
export type LogScope = string | symbol;
export type LogContext = string | symbol;
export type MonitorVendorOption = {
    url: string | URL | Request;
    headers?: HeadersInit;
}