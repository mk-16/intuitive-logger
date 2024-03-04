import { UUID } from "crypto";
import { LOG_LEVEL } from "../models/enums/log-level/log-level.js";
import { BaseLog } from "../models/logs/base-log/base-log.js";

export interface LogsMetadata {
    logContext: LOG_LEVEL;
    expiresAfter: number;
}

export interface LogsFeature extends LogsMetadata {
    trackByName: string;
}


export type DigestorInput = [string, BaseLog];
export type DigestedLog = [Map<UUID, BaseLog>, UUID, number]; 
export type LoggerState = Map<string, LogsMetadata & { map: Map<UUID, BaseLog> }>;
export type LoggerSnapshot = { [key: string]: LogsMetadata & { map: { [key: UUID]: BaseLog } } };