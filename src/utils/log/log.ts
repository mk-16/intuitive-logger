import { MonitorOptions } from "../../core/logger.js";
import { DecoratorLogKind, RegularLogKind } from "../types/enums.js";

export class InternalLog {
    name: string | symbol | undefined;
    date: string | undefined;
    stack: string | undefined;
    serializedData: string | undefined;
    startTime: number | undefined;
    endTime: number | undefined;
    serializedInputs: string | undefined;
    serializedOutput: string | undefined;
    inputs: Record<string, unknown> | undefined;
    output: unknown;
    options: Partial<MonitorOptions> | undefined;
    runtime: `${number}ms` | undefined;
    source: "intuitive-logger-worker" | undefined = "intuitive-logger-worker";
    constructor(readonly kind: RegularLogKind | DecoratorLogKind) { }
}

export class Log {
    name: string | symbol | undefined;
    date: string | undefined;
    stack: string | undefined;
    startTime: number | undefined;
    endTime: number | undefined;
    inputs: Record<string, unknown> | undefined;
    output: unknown;
    options: Partial<MonitorOptions | { level: string }> | undefined;
    runtime: `${number}ms` | undefined;
    source: "intuitive-logger-worker" | undefined = "intuitive-logger-worker";
    constructor(readonly kind: RegularLogKind | DecoratorLogKind) { }
}

export class FunctionLog extends InternalLog {
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

export class ObjectLog extends InternalLog {
    previousValue: unknown;
    currentValue: unknown;
    constructor() {
        super(RegularLogKind.Object)
    }
}

export class PropertyLog extends InternalLog {
    serializedPreviousValue: string | undefined;
    serializedCurrentValue: string | undefined;

    previousPropertyDescriptor: unknown | undefined;
    currentPropertyDescriptor: unknown | undefined;

    constructor() {
        super(DecoratorLogKind.Property)
        delete this.inputs;
    }

}