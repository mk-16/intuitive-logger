import { parseTarget } from "../parse-target/parse-target.js";

export function mapParamsToValues(params: string[], values: string[]) {
    const results: Record<string, unknown> = {}
    params.forEach((param, index) => {
        results[param] = values[index];
    });
    if (params.length < values.length) {
        results[params.pop()!] = values.splice(params.length);
    }
    return results
}