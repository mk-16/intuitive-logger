import { traverse } from "../traverse/traverse.js";

// import { recursiveActionPropagation } from "../recursive-action-propagation/recursive-action-propagation.js";
export function deepFreeze<T>(target: T): T {
    return traverse(target, (item, keyProp: keyof T) => {
        switch (true) {
            case item instanceof Map:
                item = Object.fromEntries(item.entries());
                break;
            case item instanceof Set:
                item = Array.from(item.values())
                break;
        }

        // target[keyProp] = Object.freeze(item);
        console.log({ target: target[keyProp], keyProp })
        return item;
    })
}
// export function deepFreeze(target: any): any {
//     return recursiveActionPropagation(target, Object.freeze)
//     // switch (typeof target) {
//     //     case "string":
//     //     case "number":
//     //     case "bigint":
//     //     case "boolean":
//     //     case "symbol":
//     //     case "undefined":
//     //     case "function":
//     //         return target;
//     //     default:
//     //         let output = undefined;
//     //         if (target !== null)
//     //             switch (true) {
//     //                 case target instanceof Map:
//     //                     return deepFreeze(Object.fromEntries(target.entries()))
//     //                 case target instanceof Set:
//     //                     return deepFreeze(Array.from(target))
//     //                 case target instanceof Array:
//     //                     return Object.freeze(target.map((item: unknown) => {
//     //                         return deepFreeze(item)
//     //                     }))
//     //                 default:
//     //                     for (const key in target) {
//     //                         deepFreeze(target[key])
//     //                     }
//     //                     return Object.freeze(target)
//     //             }
//     // }

// }