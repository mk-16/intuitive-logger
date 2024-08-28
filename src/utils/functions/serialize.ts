import { RegularLogKind } from "../types/enums.js";

export function serialize<T extends Object>(target: T, kind: RegularLogKind): string | T {
    if (kind == RegularLogKind.Function)
        return target.toString();
    try {
        return structuredClone(target);
    }
    catch (cloningError) {
        return JSON.stringify(target);
    }
}