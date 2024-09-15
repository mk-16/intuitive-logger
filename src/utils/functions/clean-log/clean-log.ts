import { MonitorOptions } from "../../../core/logger.js";
import { InternalLog } from "../../log/log.js";
import { deleteNestedProperty } from "../delete-nested-property/delete-nested-property.js";

export function cleanLog<T extends InternalLog>(log: T): void {
    delete log.source;
    delete log.startTime;
    delete log.endTime;
    delete log.serializedInputs;
    delete log.serializedOutput;
    delete log.serializedData;
    delete log.stack;
    log.options?.hide?.forEach((key) => {
        deleteNestedProperty(log, key as string);
    })
}