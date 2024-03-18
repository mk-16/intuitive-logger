import { UUID } from "crypto";
import { CONTEXT } from "../models/enums/log-level/log-level.js";
import { BaseLog } from "../models/logs/base-log/base-log.js";

export interface LogsMetadata {
    context: CONTEXT;
    expiresAfter: number;
    persist: boolean;
}

export interface ScopeMetadata extends LogsMetadata {
    scopeName: string;
}

export interface FeatureMetadata extends LogsMetadata {
    featureName: string;
}

export type DigestorInput = [string, string, BaseLog];
export type DigestedLog = [Map<UUID, BaseLog>, UUID, number];

export type BaseLogMap = Map<UUID, BaseLog>;
export interface Feature extends Omit<FeatureMetadata, 'featureName'> {
    map: BaseLogMap;
}
export interface FeatureSnapshot extends Omit<FeatureMetadata, "featureName"> {
    map: { [key: UUID]: BaseLog };

}

export type FeaturesMap = Map<string, Feature>;

export interface Scope extends ScopeMetadata {
    map: FeaturesMap;
}

export interface ScopeSnapshot extends Omit<ScopeMetadata, "scopeName"> {
    map: { [key: string]: FeatureSnapshot };
}


export type LoggerState = Map<string, Omit<Scope, 'scopeName'>>;

export type Snapshot = { [key: string]: ScopeSnapshot };

export type TrackingOption = {
    feature: Partial<FeatureMetadata>;
    scope?: Partial<ScopeMetadata>;
};
