import { Console } from "console";
import { AsyncModes, KeysToHide, PostModes } from "../utils/types/enums.js";
import { MonitorOptionContext, MonitorOptions, MonitorVendorOption } from "../utils/types/globals.js";

/**
 * logger's global configuration static class
 */
// export abstract class LoggerConfiguration {
//     public static appName: string = "unknown";
//     public static level: number = 0;
//     public static scope: string = "global";
// }

// interface LoggerConfiguration {
//     appName: string;
//     appLogLevel: number;
//     defaultMonitorLogLevel: number;

// }
// export const LoggerConfiguration: LoggerConfiguration = Object.defineProperties(Object.create(null), {
//     appName: { configurable: false, writable: true, value: "App" },
//     appLogLevel: { configurable: false, writable: true, value: 0 },
//     defaultMonitorLogLevel: { configurable: false, writable: true, value: 0 },
// });

export class LoggerScope implements MonitorOptions {

    #tag = new Set<string>();
    #endpoints = new Map<string, HeadersInit>();
    #keysToHide = new Set<KeysToHide>();
    constructor(public name: string) { }
    level = 0;
    get tag(): string | string[] {
        return "true";
    }; 

    set tag(value: string | string[]) {
        this.#tag = new Set<string>(Array.isArray(value) ? value : [value])
    }

    get tag(): string | string[] {
        return "true";
    };

    set tag(value: string | string[]) {
        this.#tag = new Set<string>(Array.isArray(value) ? value : [value])
    }

    post: MonitorVendorOption[] = [];
    mode: PostModes = PostModes.local;
    environments: Record<string, string> = {};
    extension: unknown;
    async: AsyncModes = AsyncModes.both;
    context: Partial<MonitorOptionContext> = {};
    hide: KeysToHide[] = [];
}