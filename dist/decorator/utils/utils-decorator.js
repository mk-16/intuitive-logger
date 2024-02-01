"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModernClassDecoratorGuards = exports.LegacyDecoratorUtils = void 0;
class LegacyDecoratorUtils {
    static classGuard(target) {
        return target !== null && typeof target === "function" && target['constructor'] !== undefined;
    }
    static methodGuard(context) {
        const contextMock = {
            configurable: false,
            enumerable: false,
            writable: false,
            value: () => { },
        };
        const contextKeys = Object.keys(context ?? {});
        const lenghtCondition = contextKeys.length === 4;
        const entriesCondition = contextKeys.filter(key => {
            return !!context && typeof contextMock[key] === typeof context[key];
        }).length === 4;
        return lenghtCondition && entriesCondition;
    }
}
exports.LegacyDecoratorUtils = LegacyDecoratorUtils;
class ModernClassDecoratorGuards {
}
exports.ModernClassDecoratorGuards = ModernClassDecoratorGuards;
// function modernDecoratoClassGuard(target: unknown): target is ClassDecorator {
//     target;
//     return true;
// }
//# sourceMappingURL=utils-decorator.js.map