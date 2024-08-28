import { DecoratorLogKind, RegularLogKind } from "../types/enums.js";
export declare class Log {
    readonly kind: RegularLogKind | DecoratorLogKind;
    name: string | symbol | undefined;
    date: string | undefined;
    stack: string | undefined;
    serializedData: string | undefined;
    startTime: number | undefined;
    endTime: number | undefined;
    serializedInputs: string[] | undefined;
    serializedOutput: string | undefined;
    inputs: Record<string, unknown> | undefined;
    output: unknown;
    runtime: `${number}ms` | undefined;
    constructor(kind: RegularLogKind | DecoratorLogKind);
}
export declare class FunctionLog extends Log {
    constructor(kind?: Exclude<RegularLogKind, "object"> | Exclude<DecoratorLogKind, "Property">);
}
export declare class ClassConstructorLog extends FunctionLog {
    constructor();
}
export declare class ClassMethodLog extends FunctionLog {
    constructor();
}
export declare class ObjectLog extends Log {
    previousValue: unknown;
    currentValue: unknown;
    constructor();
}
export declare class PropertyLog extends Log {
    serializedPreviousValue: string | undefined;
    serializedCurrentValue: string | undefined;
    previousValue: unknown | undefined;
    currentValue: unknown | undefined;
    constructor();
}
//# sourceMappingURL=log.d.ts.map