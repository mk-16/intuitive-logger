export type Log = {
    readonly name: string | symbol;
};
export interface FunctionLog {
}
export interface ClassLog extends Log {
    readonly classname: string;
}
export declare class ClassLog implements ClassLog {
    readonly name: string | symbol;
    readonly classname: string;
    constructor(name: string | symbol, classname: string);
}
//# sourceMappingURL=log-types.d.ts.map