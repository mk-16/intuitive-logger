import type { LegacyArguments, ModernArguments } from "../types/globals.js";

export function modernDecoratorGuard<T>(args: ModernArguments<T> | LegacyArguments<T>): args is ModernArguments<T> {
    return typeof args[1] == "object"
}