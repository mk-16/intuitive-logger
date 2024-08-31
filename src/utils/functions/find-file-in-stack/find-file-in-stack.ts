export function findFileInStack(stack: string | undefined, step: boolean = false) {
    const stackArray = stack?.split("\n") ?? [];
    return stackArray[2]?.includes('anonymous') ?
        stackArray[3]?.split(' ').pop()?.replace(/\(|\)/g, "") :
        stackArray[2]?.split(' ').pop()?.replace(/\(|\)/g, "");
}