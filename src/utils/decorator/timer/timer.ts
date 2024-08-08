export function exceptionThrowTimer(message: string) {
    return setTimeout(() => {
        const error = new Error(message);
        delete error.stack;
        throw error;
    }, 0);
}