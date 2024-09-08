export interface MonitorType {
    (options?: Partial<MonitorOptions>): any;
    new <T extends object>(...args: [T, ...any]): T;
}

export type ModernArguments<T extends Function> = [T, DecoratorContext];
export type LegacyArguments<T> = [T, string | symbol, PropertyDescriptor | undefined];
export type LogScope = string | symbol;
export type LogContext = string | symbol;
export type MonitorVendorHeadersOption = Record<string, string | number>;
export type MonitorVendorOption = {
    url: string;
    headers: MonitorVendorHeadersOption;
}
export type MonitorOptionContext = {
    scope: string;
    name: string;
}
export type MonitorOptions = {
    level: number;
    tag: string;
    vendor: Partial<MonitorVendorOption>[];
    environments: Record<string, string | undefined>;
    extension: unknown;
    async: "invocation" | "results" | "both";
    context?: Partial<MonitorOptionContext>;
}