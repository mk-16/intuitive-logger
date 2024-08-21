export interface MonitorType {
    (): any;
    new(): any;
}

export type ModernArguments<T extends Function> = [T | undefined, DecoratorContext];
export type LegacyArguments<T> = [T, string | symbol, PropertyDescriptor | undefined];

