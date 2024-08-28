import { RegularLogKind } from "../types/enums.js";
export function serialize(target, kind) {
    if (kind == RegularLogKind.Function)
        return target.toString();
    try {
        return structuredClone(target);
    }
    catch (cloningError) {
        return JSON.stringify(target);
    }
}
//# sourceMappingURL=serialize.js.map