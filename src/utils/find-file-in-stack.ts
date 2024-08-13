export function fileFileInStack(stack: string, filenameToIgnore: string) {
    const stackArray = stack.split('\n');
    const index = stackArray.findIndex(str => str.includes(filenameToIgnore));
    return 'file:///'.concat(stackArray[index + 1].split('file:///')[1].split(')')[0]);
} 
