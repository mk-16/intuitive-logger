export function extractParams(stringifiedFunction) {
    const params = stringifiedFunction?.split(`(`)[1]?.split(')')[0];
    return params?.split(',')?.map(param => param.trim()) ?? [];
}
//# sourceMappingURL=extract-params.js.map