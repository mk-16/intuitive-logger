import { LegacyArguments, ModernArguments } from "../types/globals.js";
export declare function DecoratorHandler<T extends new (...args: unknown[]) => any>(...args: ModernArguments<T> | LegacyArguments<T>): void | T;
//# sourceMappingURL=decorator-handler.d.ts.map