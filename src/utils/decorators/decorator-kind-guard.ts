import type { LegacyArguments, ModernArguments } from "../types/globals.js";

export function modernDecoratorGuard<T extends Function>(args: ModernArguments<T> | LegacyArguments<T>): args is ModernArguments<T> {
    return typeof args[1] == "object"
}