
export function mapParamsToValues(params: string[], values: unknown) {
    const results: Record<string, unknown> = {}
    if (Array.isArray(values)) {
        params.forEach((param, index) => {
            if (param)
                results[param] = values[index];
        });
        if (params.length < values.length) {
            results[params.pop()!] = values.splice(params.length);
        }
    }
    return results
}