import type { LegacyContext, Class } from '../../types/types'

export abstract class LegacyDecoratorUtils {
    static classGuard(target: unknown): target is Class {
        return target !== null && typeof target === "function" && target['constructor'] !== undefined;
    }
    static methodGuard(context: unknown): context is LegacyContext {
        const contextMock = {
            configurable: false,
            enumerable: false,
            writable: false,
            value: () => { },
        }
        const contextKeys = Object.keys(context ?? {});
        const lenghtCondition = contextKeys.length === 4;
        const entriesCondition = contextKeys.filter(key => {
            return !!context && typeof contextMock[key as keyof typeof contextMock] === typeof (context as keyof typeof context)[key];
        }).length === 4;

        return lenghtCondition && entriesCondition;
    }
}

export abstract class ModernClassDecoratorGuards {
    // static classGuard(target: unknown): target is ClassDecorator {
    //     return true;
    // }

    // static methodGuard(context: unknown): context is LegacyContext {
    //     const contextMock = {
    //         configurable: false,
    //         enumerable: false,
    //         writable: false,
    //         value: () => { },
    //     }
    //     const contextKeys = Object.keys(context ?? {});
    //     const lenghtCondition = contextKeys.length === 4;
    //     const entriesCondition = contextKeys.filter(key => {
    //         return !!context && typeof contextMock[key as keyof typeof contextMock] === typeof (context as keyof typeof context)[key];
    //     }).length === 4;

    //     return lenghtCondition && entriesCondition;
    // }
}
// function modernDecoratoClassGuard(target: unknown): target is ClassDecorator {
//     target;
//     return true;
// }
