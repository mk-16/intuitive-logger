import { serialize } from "v8";

const types = new Map([
    ["bigint", { serialize: <T>(target: T extends Symbol ? T : never) => target.toString().concat('n') }],
    ["boolean", { serialize: <T>(target: T extends boolean ? T : never) => target.toString() }],
    ["function", { serialize: <T>(target: T extends Function ? T : never) => target.toString() }],
    ["number", { serialize: <T>(target: T extends number ? T : never) => target.toString() }],
    ["string", { serialize: <T>(target: T extends string ? T : never) => target }],
    ["symbol", { serialize: <T>(target: T extends Symbol ? T : never) => target.toString() }],
    ["undefined", { serialize: <T>(target: T extends undefined ? T : never) => "undefined" }],
    ["array", { serialize: <T>(target: T extends Array<unknown> ? T : never) => JSON.stringify(target.map((element: unknown) => serializeTarget(element))) }],
    ["promise", { serialize: <T>(target: T extends Promise<unknown> ? T : never) => "Promise" }]
] as [string, { serialize: Function }][]);

export function serializeTarget(target: unknown | undefined): string {
    const typesKey = types.has(typeof target) ? typeof target : Array.isArray(target) ? "array" : target instanceof Promise ? "promise" : "object";
    if (types.has(typesKey)) return types.get(typesKey)!.serialize(target);
    try {
        const keys = Object.keys(target ?? {});
        const results: Record<string, unknown> = {};
        if (keys.length > 0) {
            for (const key of keys) {
                results[key] = serializeTarget(target![key as keyof typeof target]);
            }
            return JSON.stringify(results)
        }
        return JSON.stringify(target);
    }
    catch (error) {
        return `cannot serialize target object`;
    }
}