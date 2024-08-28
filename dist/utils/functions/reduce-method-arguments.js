export function reduceMethodArguments(params, args) {
    const results = {};
    for (const index of params.keys()) {
        if (params[index].includes('...') && args != undefined)
            results[params[index].split('...')[1]] = JSON.parse('[]');
        else
            try {
                results[params[index]] = args !== undefined ? JSON.parse(args[index]) : undefined;
            }
            catch (e) {
            }
    }
    return Object.keys(results).length > 0 ? results : undefined;
}
//# sourceMappingURL=reduce-method-arguments.js.map