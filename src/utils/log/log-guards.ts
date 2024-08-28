import { DecoratorLogKind, RegularLogKind } from "../types/enums.js";
import { Log, PropertyLog } from "./log.js";

export const functionLogGuard = (log:Log): log is PropertyLog => log.kind == RegularLogKind.Function;
export const objectLogGuard = (log:Log): log is PropertyLog => log.kind == RegularLogKind.Object;
export const propertyLogGuard = (log:Log): log is PropertyLog => log.kind == DecoratorLogKind.Property;