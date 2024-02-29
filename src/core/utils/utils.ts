export const freezeObject = (obj: any) => {
    if (obj instanceof Object) {
        for (const key in obj) {
            if (obj[key] instanceof Object) {
                freezeObject(obj[key]);
            }
            // Object.freeze(obj[key]);
        }
    }
    return Object.freeze(obj);
}