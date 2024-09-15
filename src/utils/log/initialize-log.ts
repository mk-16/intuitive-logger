import { DecoratorLogKind, RegularLogKind } from "../types/enums.js";
import { ClassConstructorLog, ClassMethodLog, FunctionLog, InternalLog, ObjectLog, PropertyLog } from "./log.js";

export function createLog(kind: RegularLogKind | DecoratorLogKind): InternalLog {
    switch (kind) {
        case RegularLogKind.Function:
            return new FunctionLog();

        case RegularLogKind.Object:
            return new ObjectLog();

        case DecoratorLogKind.Method:
            return new ClassMethodLog();

        case DecoratorLogKind.Property:
            return new PropertyLog();

        case DecoratorLogKind.Constructor:
            return new ClassConstructorLog();
    }
}