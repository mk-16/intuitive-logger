export function findFileInStack(stack: string | undefined, ref?: string) {
    const iterator = stack?.split("\n").slice(1).values();
    let results = iterator?.next() ?? { done: true, value: '' };
    // console.log(stack?.split("\n"))
    // while (!results.done) {
    //     if (!results.value?.includes('node_modules') &&
    //         !results.value.includes('node'))
    //         return results.value.split(' ').pop()?.replace(/\(|\)/g, "");
    //     results = iterator?.next() ?? { done: true, value: '' };
    // }
    return undefined;
}