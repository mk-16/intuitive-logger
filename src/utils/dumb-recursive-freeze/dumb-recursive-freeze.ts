export function dumbRecursiveFreeze<T extends { [key: string]: any }>(target: T) {
    Object.keys(target).forEach(key => {
        if (typeof target[key] === 'object') {
            dumbRecursiveFreeze(target[key]);
        }
        Object.freeze(target[key]);
    })
    Object.freeze(target);
}