import { DecoratorLogKind, RegularLogKind } from "../types/enums.js";
export const functionLogGuard = (log) => log.kind == RegularLogKind.Function;
export const objectLogGuard = (log) => log.kind == RegularLogKind.Object;
export const propertyLogGuard = (log) => log.kind == DecoratorLogKind.Property;
//# sourceMappingURL=log-guards.js.map