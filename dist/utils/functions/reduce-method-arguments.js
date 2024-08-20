export function reduceMethodArguments(params, args) {
    return args.reduce((acc, curr, index) => {
        acc[params[index]] = curr instanceof Function ?
            curr.toString() :
            curr instanceof Promise ? "Promise" : curr;
        return acc;
    }, {});
}
//# sourceMappingURL=reduce-method-arguments.js.map