export function findFileInStack(stack, step = false) {
    const stackArray = stack?.split("\n") ?? [];
    return stackArray[2]?.includes('anonymous') ?
        stackArray[3]?.split(' ').pop()?.replace(/\(|\)/g, "") :
        stackArray[2]?.split(' ').pop()?.replace(/\(|\)/g, "");
}
//# sourceMappingURL=find-file-in-stack.js.map