// import { Logger } from "./logger";

// export function decorator(...args: unknown[]) {
//     console.log({args})
//     return function (target: Object, key?: string | symbol, descriptor?: PropertyDescriptor) {
//         console.log({target})
 
//         if (descriptor) {
//             const originalMethod = descriptor.value;
//             descriptor.value = function (this: any, ...descriptorArgs: unknown[]) {
//                 // console.log({ targe: target['constructor'].name, key, descriptor })
//                 return new Logger(originalMethod, descriptorArgs)
//                     .createStack()
//                     .handleSync()
//                     .handleAsync()
//                     .print(target.constructor.name)
//             }
//         } else if (key) {
//             //ITS A Property FOR NOW DO NOTHING
//         }
//         else {
//             if (target instanceof Function) {
//                 if (target instanceof Object) {
//                     // const init = target['constructor']
//                     // const a = new Logger(init, args)

//                     // console.log({a})
//                     //ITS A CLASS FOR NOW DO NOTHING
//                 }
//             }
//         }
//         const originalMethod = descriptor ? key ?? target : target;
//         originalMethod
//         // .createStack()
//         // .countInvocations()
//         // .handleSync()
//         // .handleAsync()
//         // .print()
//         // a;

//         // console.log({ target });
//         target; key; descriptor;
//         target;
//     }
// }