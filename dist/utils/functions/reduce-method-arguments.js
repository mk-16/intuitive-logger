export function reduceMethodArguments(params, args) {
    const results = {};
    for (const key of params.keys()) {
        if (params[key].includes('...'))
            results[params[key].split('...')[1]] = args.slice(key);
        else
            results[params[key]] = args[key];
    }
    return results;
}
//# sourceMappingURL=reduce-method-arguments.js.map