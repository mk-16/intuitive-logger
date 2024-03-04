// // export function traverse<T>(target: T, action: (...args: any) => any) {
// //     const map = new Map();
// //     switch (typeof target) {
// //         case 'bigint':
// //         case 'boolean':
// //         case 'function':
// //         case 'number':
// //         case 'string':
// //         case 'symbol':
// //         case 'undefined':
// //             action(target);
// //             break;
// //         case 'object':
// //             if (target === null) {
// //                 action(target);
// //                 break;
// //             }
// //             switch (true) {
// //                 case target?.constructor.name === 'Object':
// //                     for (const [key, value] of Object.entries(target)) {

// //                         traverse(value, (...subAction) => action(...subAction, key as keyof T));
// //                     }
// //                     break;
// //                 case target instanceof Map || target instanceof Set || target instanceof Array:
// //                     for (const [key, value] of target.entries()) {
// //                         traverse(value, (...subAction) => action(...subAction, key as keyof T));
// //                     }
// //                     break;
// //             }
// //             action(target);
// //     }
// // }

// export function traverse(target: unknown, action: (...args: any) => any) {
//     const map = new Map();
//     function recursive(target: Object, action: (...args: any) => any) {
//         for (const [key, value] of Object.entries(target)) {
//             if (typeof value !== 'object')
//                 map.set(key, value);
//             else
//                 traverse(value, action);
//         }
//         return map;
//     }

//     switch (typeof target) {
//         case 'bigint':
//         case 'boolean':
//         case 'function':
//         case 'number':
//         case 'string':
//         case 'symbol':
//         case 'undefined':
//             return action(target);
//         case 'object':
//             if (target === null) return action(target);
//             return recursive(target, action);
//             // for (const [key, value] of Object.entries(target)) {
//             //     if (typeof value !== 'object')
//             //         map.set(key, value);

//             // }
//             return map;
//     }
// }