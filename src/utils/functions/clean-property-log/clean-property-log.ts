import { PropertyLog } from "../../log/log.js";

export function cleanPropertyLog<T extends PropertyLog>(log: T): void {
    delete log.serializedPreviousValue;
    delete log.serializedCurrentValue;
}