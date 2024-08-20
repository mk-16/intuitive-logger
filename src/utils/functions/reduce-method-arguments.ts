export function reduceMethodArguments(params: string[], args: unknown[]) {
    const results: Record<string, unknown> = {};
    for (const key of params.keys()) {
        if (params[key].includes('...'))
            results[params[key].split('...')[1]] = args.slice(key);
        else
            results[params[key]] = args[key];
    }
    return results;
}