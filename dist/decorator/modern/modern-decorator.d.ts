import { Class } from "../../types/types";
import { LegacyDecorator } from "../legacy/legacy-decorator";
export declare abstract class ModernDecorator extends LegacyDecorator {
    protected static target: ClassDecorator | MethodDecorator;
    protected static context: ClassDecoratorContext | ClassMethodDecoratorContext;
    static modernClassGuard(target: unknown): target is Class;
    static modernContextGuard(context: unknown): context is DecoratorContext;
    static validateDecoratorSyntax(context: DecoratorContext): void;
    static executor<T extends new (...args: any[]) => any>(...args: unknown[]): T | void;
}
//# sourceMappingURL=modern-decorator.d.ts.map