export interface MonitorType {
    (): any;
    new(...args:any[]): any;
}

export type ModernArguments<T extends Function> = [T | undefined, DecoratorContext];
export type LegacyArguments<T> = [T, string | symbol, PropertyDescriptor | undefined];

