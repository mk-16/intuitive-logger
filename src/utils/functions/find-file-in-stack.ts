export function findFileInStack(stack: string) {
    const stackArray = stack.split("\n");
    return stackArray[2].split(' ').pop()?.replace(/\(|\)/g, "");
}