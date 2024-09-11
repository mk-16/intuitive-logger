import { KeyofLog, MonitorOptionContext, MonitorOptions, MonitorVendorOption } from "../utils/types/globals.js";
//TODO USE ALL THE DATA FROM HERE IN CONDITIONS AND OVERRIDE,
//TODO REFACTOR CODE
//TODO SET CODE IN RIGHT LOCATION
//TODO TESTS
//TODO README
//TODO Separate library
//TODO add types 
//TODO add descriptions
export abstract class LoggerConfiguration {
    public static appName?: string;
    public static logLevel: number = 0;
    public static tag?: string;
    public static post: MonitorVendorOption[] = [];
    public static mode: "local" | "network" | "both" = "local";
    public static environments?: Record<string, string | undefined>;
    public static extension?: unknown;
    public static async: "both" | "invocation" | "results" = "both";
    public static context?: Partial<MonitorOptionContext> | undefined;
    public static hide: (keyof MonitorOptions | KeyofLog)[] = []
}