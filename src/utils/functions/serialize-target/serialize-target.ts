const types = new Map([
    ["bigint", { serialize: <T>(target: T extends Symbol ? T : never) => "bigint$".concat(target.toString()) }],
    ["boolean", { serialize: <T>(target: T extends boolean ? T : never) => "boolean$".concat(target.toString()) }],
    ["function", { serialize: <T>(target: T extends Function ? T : never) => "function$".concat(target.toString()) }],
    ["number", { serialize: <T>(target: T extends number ? T : never) => "number$".concat(target.toString()) }],
    ["string", { serialize: <T>(target: T extends string ? T : never) => "string$".concat(target) }],
    ["symbol", { serialize: <T>(target: T extends Symbol ? T : never) => "symbol$".concat(target.description ?? 'undefined') }],
    ["undefined", { serialize: <T>(target: T extends undefined ? T : never) => "undefined$".concat("undefined") }],
    ["array", { serialize: <T>(target: T extends Array<unknown> ? T : never) => "array$".concat(JSON.stringify(target.map((element: unknown) => serializeTarget(element)))) }],
    ["promise", { serialize: <T>(target: T extends Promise<unknown> ? T : never) => "promise$".concat("Promise") }],
    ["object", {
        serialize: <T extends Record<string, unknown>>(target: T) => {
            try {
                const keys: (keyof T)[] = Object.keys(target ?? {});
                const results: Partial<Record<keyof T, unknown>> = {};
                if (target) {
                    if (keys.length > 0) {
                        for (const key of keys) {
                            results[key] = serializeTarget(target![key as keyof typeof target]);
                        }
                        return "object$".concat(JSON.stringify(results));
                    }
                    return "object$".concat(JSON.stringify(target));
                }
                return "null$".concat(JSON.stringify(target));
            }
            catch (error) {
                return `cannot serialize target object`;
            }
        }
    }]

] as [string, { serialize: Function }][]);

export function serializeTarget(target: unknown | undefined): string {
    const typesKey = Array.isArray(target) ? "array" : target instanceof Promise ? "promise" : typeof target;
    return types.get(typesKey)?.serialize(target);
}