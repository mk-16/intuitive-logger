export interface MonitorType {
    (): any;
    new(): any;
}

export type ModernArguments<T> = [T | undefined, DecoratorContext];
export type LegacyArguments<T> = [T, string | symbol, PropertyDescriptor | undefined];

