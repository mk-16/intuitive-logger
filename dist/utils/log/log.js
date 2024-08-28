import { DecoratorLogKind, RegularLogKind } from "../types/enums.js";
export class Log {
    kind;
    name;
    date;
    stack;
    serializedData;
    startTime;
    endTime;
    serializedInputs;
    serializedOutput;
    inputs;
    output;
    runtime;
    constructor(kind) {
        this.kind = kind;
    }
}
export class FunctionLog extends Log {
    constructor(kind = RegularLogKind.Function) {
        super(kind);
    }
}
export class ClassConstructorLog extends FunctionLog {
    constructor() {
        super(DecoratorLogKind.Constructor);
    }
}
export class ClassMethodLog extends FunctionLog {
    constructor() {
        super(DecoratorLogKind.Method);
    }
}
export class ObjectLog extends Log {
    previousValue;
    currentValue;
    constructor() {
        super(RegularLogKind.Object);
    }
}
export class PropertyLog extends Log {
    serializedPreviousValue;
    serializedCurrentValue;
    previousValue;
    currentValue;
    constructor() {
        super(DecoratorLogKind.Property);
        delete this.inputs;
    }
}
//# sourceMappingURL=log.js.map