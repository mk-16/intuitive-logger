export function findFileInStack(stack) {
    const stackArray = stack.split("\n");
    return stackArray[2].split(' ').pop()?.replace(/\(|\)/g, "");
}
//# sourceMappingURL=findFileInStack.js.map