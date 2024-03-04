export function traverse<T>(target: T, action: (...args: any) => any) {
    switch (typeof target) {
        case 'bigint':
        case 'boolean':
        case 'function':
        case 'number':
        case 'string':
        case 'symbol':
        case 'undefined':
            return action(target);
        case 'object':
            if (target === null) return action(target);
            switch (true) {
                case target.constructor.name === 'Object':
                    for (const [key, value] of Object.entries(target)) {
                        traverse(value, (...subAction) => action(...subAction, key as keyof T));
                    }
                    return action(target);
                case target instanceof Map || target instanceof Set || target instanceof Array:
                    for (const value of target.values()) {
                        traverse(value, action);
                    }
                    return action(target);
            }
    }
}