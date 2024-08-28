import { DecoratorLogKind, RegularLogKind } from "../types/enums.js";

export class Log {
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

    constructor(readonly kind: RegularLogKind | DecoratorLogKind) { }
}

export class FunctionLog extends Log {
    constructor(kind:
        Exclude<RegularLogKind, "object"> |
        Exclude<DecoratorLogKind, "Property"> = RegularLogKind.Function) {
        super(kind)
    }


}

export class ClassConstructorLog extends FunctionLog {
    constructor() {
        super(DecoratorLogKind.Constructor)
    }
}

export class ClassMethodLog extends FunctionLog {
    constructor() {
        super(DecoratorLogKind.Method)
    }
}

export class ObjectLog extends Log {
    previousValue: unknown;
    currentValue: unknown;
    constructor() {
        super(RegularLogKind.Object)
    }
}

export class PropertyLog extends Log {
    serializedPreviousValue: string | undefined;
    serializedCurrentValue: string | undefined;

    previousValue: unknown | undefined;
    currentValue: unknown | undefined;
    
    constructor() {
        super(DecoratorLogKind.Property)
        delete this.inputs;
    }

}