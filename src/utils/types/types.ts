import { UUID } from "crypto";
import { LOG_LEVEL } from "../models/enums/log-level/log-level.js";
import { BaseLog } from "../models/logs/base-log/base-log.js";
import { TimeUnitStrategy } from "../to-new-lib/time-units/utils/types.js";

export interface LogsMetadata {
    logContext: LOG_LEVEL;
    expiresAfter: TimeUnitStrategy;
}

export interface TrackOptions extends LogsMetadata {
    trackByName: string;
}


export type DigestorInput = [string, BaseLog];
export type DigestedLog = [Map<UUID, BaseLog>, UUID, TimeUnitStrategy]; 
export type LoggerState = Map<string, LogsMetadata & { map: Map<UUID, BaseLog> }>;