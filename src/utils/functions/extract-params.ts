export function extractParams(stringifiedFunction: string) {
    const params = stringifiedFunction?.split(`(`)[1]?.split(')')[0];
    return params?.split(',')?.map(param => param.trim()) ?? [];
}













