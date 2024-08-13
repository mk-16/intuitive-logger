export function reduceFunctionArguments(params: string[], args: unknown[]) {
    return args.reduce((acc: Record<string, unknown>, curr, index) => {
        acc[params[index]] = curr instanceof Function ?
            curr.toString() :
            curr instanceof Promise ? "Promise" : curr;
        return acc;
    }, {} as Record<string, unknown>);
}