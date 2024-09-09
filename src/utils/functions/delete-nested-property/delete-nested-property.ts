export function deleteNestedProperty<T extends object>(target: T, key: string) {
    if (typeof target !== 'object' || target === null) {
        return;
    }
    for (const property in target) {
        if (property === key) {
            delete target[property];
            return;
        } else if (typeof target[property] === 'object' && target[property] !== null) {
            deleteNestedProperty(target[property], key);
        }
    }
}