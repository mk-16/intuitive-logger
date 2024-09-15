import { AsyncModes, KeysToHide, PostModes } from "../utils/types/enums.js";
import { Configuration, MonitorVendorOption } from "../utils/types/globals.js";

export class MonitorOptions {
    public level: number = 0;
    public tags: string[] = [];
    public endpoints?: MonitorVendorOption[];
    public mode: keyof typeof PostModes = PostModes.local;
    public environments?: Record<string, string>;
    public extension?: unknown;
    public async: keyof typeof AsyncModes = AsyncModes.both;
    public hide: (keyof typeof KeysToHide)[] = [];
}

const LoggerConfiguration: Configuration = {
    name: "unknown",
    type: "app",
    options: new MonitorOptions(),
    levels: [],
}

for (const [key, value] of Object.entries(LoggerConfiguration.options!)) {
    if (value === undefined && LoggerConfiguration.options) {
        delete LoggerConfiguration.options[key as keyof MonitorOptions]
    }
}

export { LoggerConfiguration }