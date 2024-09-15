import { DecoratorLogKind, RegularLogKind } from "../types/enums.js";
import { InternalLog, PropertyLog } from "./log.js";

export const functionLogGuard = (log:InternalLog): log is PropertyLog => log.kind == RegularLogKind.Function;
export const objectLogGuard = (log:InternalLog): log is PropertyLog => log.kind == RegularLogKind.Object;
export const propertyLogGuard = (log:InternalLog): log is PropertyLog => log.kind == DecoratorLogKind.Property;