export function extractParams(stringifiedFunction: string | undefined) {
    const params = stringifiedFunction?.split(`(`)[1]?.split(')')[0];
    return params?.split(',')?.map(param => param.trim()) ?? [];
}













