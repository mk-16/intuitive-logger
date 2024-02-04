export interface LoggerDecorator {
    new(): void;
    (...args: any[]): any;
}

export type Class = new (...args: any[]) => any;
export type LegacyContext = {
    value: Function;
    writable: boolean;
    enumerable: boolean;
    configurable: boolean
};