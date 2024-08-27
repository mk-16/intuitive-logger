export function reduceMethodArguments(params: string[], args: undefined | string[]) {
    const results: Record<string, unknown> = {};
    for (const index of params.keys()) {
        if (params[index].includes('...') && args != undefined)
            results[params[index].split('...')[1]] = JSON.parse('[]'); //args.slice[index]
        else
            try {
                results[params[index]] = args !== undefined ? JSON.parse(args[index]) : undefined;
            } catch (e) {

            }
    }
    return Object.keys(results).length > 0 ? results : undefined;
}