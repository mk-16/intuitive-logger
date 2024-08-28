export function extractParams(stringifiedFunction: string | undefined) {
    if(stringifiedFunction == null)
        return []
    const params = stringifiedFunction?.includes('class') ?
        stringifiedFunction?.split(`constructor(`)[1]?.split(')')[0] :
        stringifiedFunction?.split('(')[1]?.split(')')[0];
    return params?.split(',')?.map(param => param.trim()) ?? [stringifiedFunction];
}


























