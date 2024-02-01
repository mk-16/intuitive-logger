// import { decorator } from "./decorator";
// import { Logger } from "./logger";

// interface Log {
//     new <T extends any>(arg: T): T;
//     (...args: Parameters<typeof decorator>): ReturnType<typeof decorator>;
// }

// function _Log<T extends Function>(this: unknown, arg: T, ...args: unknown[]) {
//     if (this instanceof _Log) {
//         if (arg instanceof Function)
//             return (...args: unknown[]) => {
//                 const logger = new Logger(arg, args);
//                 return logger
//                     .createStack()
//                     // .countInvocations()
//                     .handleSync()
//                     .handleAsync()
//                     .print()
//             }
//         return new Logger(arg, args).createStack().print();
//     }
//     args.unshift(arg)
//     return decorator(...args);
// }
// export const log = (function log() {
//     return _Log as Log
// })();

// declare global {
//     var log: Log
// }