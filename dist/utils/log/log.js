export class Log {
    name;
    date;
    stack;
    kind = "default";
}
export class FunctionLog extends Log {
    startTime;
    endTime;
    inputs;
    class;
    output;
    runtime;
    kind = "function";
}
export class ClassConstructorLog extends FunctionLog {
    kind = "class";
}
export class ClassMethodLog extends FunctionLog {
    kind = "method";
}
export class ObjectLog extends Log {
    previousValue;
    currentValue;
    kind = "object";
}
export class PropertyLog extends Log {
    kind = "property";
}
//# sourceMappingURL=log.js.map