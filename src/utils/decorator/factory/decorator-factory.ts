import { legacyMonitorDecorator, modernMonitorDecorator } from "../monitor/monitor-decorator-factory.js";

type DecoratorBuilder = {
    build(kind: "legacy-decorator" | "modern-decorator"): any;
}
class ClassDecoratorBuilder implements DecoratorBuilder {
    build(kind: "legacy-decorator" | "modern-decorator") {
        return kind == "legacy-decorator" ? legacyMonitorDecorator : modernMonitorDecorator
    };
}


export abstract class DecoratorFactory {
    static create(type: "class-decorator" | "property-decorator" | "method-decorator"): DecoratorBuilder {
        return new ClassDecoratorBuilder();
        switch (type) {
            case "class-decorator": return new ClassDecoratorBuilder();
            // case "property-decorator": return DecoratorBuilder;
            // case "method-decorator": return DecoratorBuilder;
        }
    }
}

export const MonitorDecorator: DecoratorBuilder = DecoratorFactory
    .create("class-decorator")
    // .build("legacy-decorator");