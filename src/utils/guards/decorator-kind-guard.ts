import { LegacyArguments, ModernArguments } from "../types.js";

export function modernDecoratorGuard<T>(args: ModernArguments<T> | LegacyArguments<T>): args is ModernArguments<T> {
    return typeof args[1] == "object"
}