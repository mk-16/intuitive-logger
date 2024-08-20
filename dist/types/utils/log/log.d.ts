export declare class Log {
    name: string | symbol | undefined;
    date: string | undefined;
    stack: string | undefined;
    readonly kind: "class" | "method" | "property" | "function" | "object" | "default";
}
export declare class FunctionLog extends Log {
    startTime: number | undefined;
    endTime: number | undefined;
    inputs: Record<string, unknown> | undefined;
    class: string | undefined;
    output: unknown;
    runtime: `${number}ms` | undefined;
    readonly kind: "class" | "method" | "function";
}
export declare class ClassConstructorLog extends FunctionLog {
    readonly kind = "class";
}
export declare class ClassMethodLog extends FunctionLog {
    readonly kind = "method";
}
export declare class ObjectLog extends Log {
    previousValue: unknown;
    currentValue: unknown;
    readonly kind = "object";
}
export declare class PropertyLog extends Log {
    readonly kind = "property";
}
//# sourceMappingURL=log.d.ts.map