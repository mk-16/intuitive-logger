export function reduceMethodArguments(params: string[], args: undefined | string[]) {
    const results: Record<string, unknown> = {};
    for (const index of params.keys()) {
        if (params[index].includes('...') && args != undefined){
            const  fs = args.slice(index)
            results[params[index].split('...')[1]] = args.slice(index).map(element => JSON.parse(element)); //args.slice[index]
        }
        else
            try {
                results[params[index]] = args !== undefined ? JSON.parse(args[index]) : undefined;
            } catch (e) {

            }
    }
    return Object.keys(results).length > 0 ? results : undefined;
}