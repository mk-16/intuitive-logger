export interface MonitorType {
    (...args: any[]): any;
    new <T extends object>(...args: [T, LogScope?, LogContext?, ...any]): T;
}

export type ModernArguments<T extends Function> = [T, DecoratorContext];
export type LegacyArguments<T> = [T, string | symbol, PropertyDescriptor | undefined];
export type LogScope = string | symbol;
export type LogContext = string | symbol 
