import { kind } from "../../../constants/kind.js";
import { DecoratorBuilder } from "../../../types/decorator-builder.js";

class ClassDecoratorBuilder {
    static build(kind: "legacy-decorator" | "modern-decorator") {
        // return kind == "legacy-decorator" ? l : modernMonitorDecorator
    };
}

export const classDecorator = ClassDecoratorBuilder.build(kind)