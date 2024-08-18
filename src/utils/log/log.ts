export class Log {
    name: string | symbol | undefined;
    date: string | undefined;
    stack: string | undefined;
    readonly kind: "class" | "method" | "property" | "function" | "object" | "default" = "default";
}

export class FunctionLog extends Log {
    startTime: number | undefined;
    endTime: number | undefined;
    inputs: Record<string, unknown> | undefined;
    class: string | undefined;
    output: unknown;
    runtime: number | undefined;
    override readonly kind: "class" | "method" | "function" = "function";
}

export class ClassConstructorLog extends FunctionLog {
    override readonly kind = "class";
}

export class ClassMethodLog extends FunctionLog {
    override readonly kind = "method";
}

export class ObjectLog extends Log {
    previousValue: unknown;
    currentValue: unknown;
    override readonly kind = "object";
}

export class PropertyLog extends Log {
    override readonly kind = "property";
}