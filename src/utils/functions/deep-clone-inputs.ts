export function deepCloneInputs(inputs: unknown[]) {
    return inputs.map(element => {
        try {
            return typeof element == "function" ?
                element.name == "" || element.name == undefined ?
                    "anonymous Function" :
                    element.name :
                element instanceof Promise ?
                    "Promise" :
                    structuredClone(element);
        }
        catch (error: unknown) {
            try {
                return JSON.parse(JSON.stringify(element));
            }
            catch (error: unknown) {
                return "non Serializable and inferable object"
            }
        }
    })
}