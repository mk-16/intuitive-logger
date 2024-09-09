import { Log } from "../../log/log.js";

export function cleanLog<T extends Log>(log: T): void {
    delete log.source;
    delete log.startTime;
    delete log.endTime;
    delete log.serializedInputs;
    delete log.serializedOutput;
    delete log.serializedData;
    delete log.stack;
}