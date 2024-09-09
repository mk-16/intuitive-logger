import { DecoratorLogKind, RegularLogKind } from "../../types/enums.js";

export function setName<T extends { configuration?: { context?: { name?: string } }, serializedData?: string, readonly kind: RegularLogKind | DecoratorLogKind }>(target: T): string {
    const results = target.configuration?.context?.name ?
        target.configuration.context.name :
        target.kind == DecoratorLogKind.Constructor ?
            target.serializedData?.split('class ')[1]?.split(' ')[0] :
            target.serializedData?.split('(')[0];
    if (results == undefined || results == "") {
        return 'anonymous'
    }
    return results;
}