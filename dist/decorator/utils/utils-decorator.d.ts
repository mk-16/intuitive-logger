import type { LegacyContext, Class } from '../../types/types';
export declare abstract class LegacyDecoratorUtils {
    static classGuard(target: unknown): target is Class;
    static methodGuard(context: unknown): context is LegacyContext;
}
export declare abstract class ModernClassDecoratorGuards {
}
//# sourceMappingURL=utils-decorator.d.ts.map