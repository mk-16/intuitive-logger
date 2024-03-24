import { UUID } from "crypto";
import { BaseLog } from "../models/logs/base-log/base-log.js";

export type BaseContextType<T extends readonly any[]> =
    T extends [infer I, ...infer R] ?
    R extends readonly any[] ? [I, ...BaseContextType<R>] : 1 : [];
export type KeysFromObject<T extends {}> = T extends { [P in infer K]: any } ? K : never;
export type PartialKeys<Target, Key extends keyof Target> = Omit<Target, Key> & Partial<Pick<Target, Key>>
export interface Context {
    
    trace?: ((trace: string) => boolean) | boolean;
    date?: ((date: string) => boolean) | boolean;
    inputs?: ((...inputs: any[]) => boolean) | boolean;
    output?: ((output: any) => boolean) | boolean;
    scopeName?: ((scopeName: string) => boolean) | boolean;//to change it to match the key
    featureName?: ((featureName: string) => boolean) | boolean;//to change it to match the key
    propertyChanged?: ((propertyChanged: string | symbol | number) => boolean) | boolean;//to change it to match the key
    executionTime?: ((executionTime: string) => boolean) | boolean;
    previousValue?: ((previousValue: any) => boolean) | boolean;
    newValue?: ((newValue: any) => boolean) | boolean;
    environment: ((environment: string) => boolean) | boolean;//needs to match env
}

export type WithExpiration = { expiresAfter: number; }
export interface Feature extends WithExpiration { logsMap: Map<UUID, BaseLog>; }
export type FeaturesMap = Map<string, Feature>;
export type LoggerState = Map<string, FeaturesMap>;
export interface FeatureMetadata extends WithExpiration {
    featureName: string;
    relatedTo: string;
}

export type DigestorInput = [string, string, BaseLog];
export type DigestedLog = [UUID, Feature];

export interface FeatureSnapshot extends WithExpiration {
    logsMap: { [key: UUID]: BaseLog };
}


export interface ScopeSnapshot {
    [key: string]: FeatureSnapshot;
}



export interface Snapshot {
    [key: string]: ScopeSnapshot
};

// export type TrackingOption = PartialKeys<FeatureMetadata, 'expiresAfter' | 'relatedTo'>;
export type TrackingOption = Partial<FeatureMetadata>;
