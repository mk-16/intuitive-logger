export function exceptionThrowTimer<T extends object>(target: T, message: string) {
    const timers: Parameters<typeof clearTimeout> = Reflect.getMetadata('error:timer', target) ?? [];
    const timer = setTimeout(() => {
        const error = new Error(message);
        delete error.stack;
        throw error;
    }, 0)

    timers.push(timer);
    Reflect.defineMetadata('error:timer', timers, target);
}

export function clearExceptionTimers<T extends object>(target: T) {
    const timers: number[] = Reflect.getMetadata('error:timer', target) ?? [];
    for (const timer of timers) {
        clearTimeout(timer);
    }
}