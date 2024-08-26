export function serializeInputs(inputs: unknown[] | undefined) {
    return inputs?.map(element => {
        try {
            return typeof element == "function" ?
                element.name == "" || element.name == undefined ?
                    "anonymous Function" :
                    element.name :
                element instanceof Promise ?
                    "Promise" :
                    JSON.stringify(element, (key, value: unknown) => {
                        console.log({ key, value, element })
                        if (element == value) { 
                        }
                    });
        }
        catch (error: unknown) {
            return "non Serializable and inferable object"
        }
    })
}