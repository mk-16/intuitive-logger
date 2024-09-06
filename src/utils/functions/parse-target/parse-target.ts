
const types = new Map([
    ["bigint", { parse: (target: string) => BigInt(target) }],
    ["boolean", { parse: (target: string) => target == "true" ? true : false }],
    ["function", { parse: (target: string) => target }],
    ["number", { parse: (target: string) => parseFloat(target) }],
    ["string", { parse: (target: string) => target }],
    ["symbol", { parse: (target: string) => Symbol(target) }],
    ["undefined", { parse: (target: string) => undefined }],
    ["array", {
        parse: (target: string): unknown[] => {
            const results: string[] = JSON.parse(target);
            return results.map(element => parseTarget(element));
        }
    }],
    ["promise", { parse: (target: string) => target }],
    ["null", { parse: (target: string) => null }],
    ["object", {
        parse: (target: string) => {
            const results: Record<string, unknown> = {};
            const parsedTarget = JSON.parse(target);
            for (const [key, value] of Object.entries(parsedTarget)) {
                results[key] = parseTarget(value as string);
            }
            return results;
        }
    }]
] as [string, { parse: Function }][]);

export function parseTarget(target: string | undefined) {
    if (target == undefined)
        return {};
    if (typeof target == "string") {
        const index = target.indexOf("$");
        const type = target.substring(0, index);
        const rest = target.substring(index + 1);
        return types.get(type)?.parse(rest);
    }
}