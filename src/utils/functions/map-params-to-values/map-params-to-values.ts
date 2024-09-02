// function mergeKeysToValueAsObject (keys: string[], values: ) {}
// function mergeKeysToValueAsArray () {}
export function mapParamsToValues(params: string[], args: string[]) {
    const rest = args.length > params.length ? args.splice(params.length - 1) : null;
    const results: Record<string, unknown> = {};
    for (const [index, param] of params.entries()) {
        try {
            const value = JSON.parse(args[index]);
            console.log({ value })
            results[param] = typeof value == "object" ?
                mapParamsToValues(Object.keys(value), Object.values(value)) :
                value;
        }
        catch (error) {
            console.log({ error_value: args[index] })
            results[param] = args[index]
        }
    }
    console.log({ results })
    return results;
}

//     console.log({ params, args })
//     // const results: Record<string, unknown> = {};
//     const rest = args.length > params.length ? args.splice(params.length - 1) : null;
//     for (const [index, param] of params.entries()) {
//         // if(params.length - 1 && index == args.length - 1 )
//         try {
//             const value = JSON.parse(args[index]);
//             results[param] = typeof value == "object" ?
//                 Array.isArray(value) ? null :
//                     mapParamsToValues(Object.keys(value), Object.values(value)) :
//                     rest ? mapParamsToValues()
//                 value;
//             //     if (typeof value == "object") {
//             //         if (Array.isArray(value)) {
//             //             console.log({ ARRAY: value })
//             //             results[param] = value.map(element => JSON.parse(element))
//             //         }
//             //         else {
//             //             results[param] = mapParamsToValues(Object.keys(value), Object.values(value));
//             //         }
//             //         // return;
//             //     }
//         } catch (e) {
//             results[param] = args[index]
//         }
//         // if (!results[param])
//         //     results[param] = args[index];
//     }
//     console.log({ results })
//     return results;
//     // const paramsIterable = params.values();
//     // let paramsIterator = paramsIterable.next();
//     // while (!paramsIterator.done) {
//     //     console.log({ value: paramsIterator.value, paramsIterator })
//     //     paramsIterator = paramsIterable.next();
//     // }
//     // console.log({ params, args })
//     // const results: Record<string, unknown> = {};
//     // for (const index of params.keys()) {
//     //     if (index == params.length - 1 && (args?.length ?? 0) > params.length) {
//     //         results[params[index]] = args?.slice(index).map(element => {
//     //             const parsedElement = JSON.parse(element);
//     //             console.log({ parsedElement })
//     //             if (typeof parsedElement == "object") {
//     //                 if (Array.isArray(parsedElement)) {
//     //                     const targ = [...args].splice(index, parsedElement.length);
//     //                     return mapParamsToValues(parsedElement, targ);
//     //                 }
//     //                 // const parsedElementKeys = Array.isArray(parsedElement) ? parsedElement : Object.keys(parsedElement);
//     //                 // const parsedElementArgs = [...args].splice(index, parsedElementKeys.length);
//     //                 // console.log({ parsedElementArgs, parsedElementKeys })
//     //                 // return mapParamsToValues(parsedElementKeys, parsedElementArgs);
//     //             }
//     //             // for (const element in parsedElement) {
//     //             //     parsedElement[element] = JSON.parse(parsedElement[element])
//     //             // }
//     //             // return parsedElement;
//     //         });
//     //     }
//     //     else
//     //         try {
//     //             const parsedElement = args ? JSON.parse(args[index]) : undefined;
//     //             if (typeof parsedElement == "object") {
//     //                 // for (const element in parsedElement) {
//     //                 //     parsedElement[element] = JSON.parse(parsedElement[element])
//     //                 // }
//     //                 const parsedElementKeys = Object.keys(parsedElement);
//     //                 // const parsedElementArgs = [...args].splice(index, parsedElementKeys.length);
//     //                 // return mapParamsToValues(parsedElementKeys, parsedElementArgs);
//     //             }
//     //             console.log({ parsedElement })
//     //             // results[params[index]] = parsedElement;//args !== undefined ? JSON.parse(args[index]) : undefined;
//     //         } catch (e) {
//     //             console.log('ERROR WHILE MAPPING VALUES')
//     //         }
//     // }
//     // return Object.keys(results).length > 0 ? results : undefined;
//     return undefined;
// }