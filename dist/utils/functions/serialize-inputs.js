export function serializeInputs(inputs) {
    return inputs?.map(element => {
        return typeof element == "function" ?
            element.name == "" || element.name == undefined ?
                "anonymous Function" :
                element.name :
            element instanceof Promise ?
                "Promise" :
                JSON.stringify(element);
    });
}
export function serializeOutput(output) {
    return typeof output == "function" ?
        output.name == "" || output.name == undefined ?
            "anonymous Function" :
            output.name :
        output instanceof Promise ?
            "Promise" :
            JSON.stringify(output);
}
//# sourceMappingURL=serialize-inputs.js.map