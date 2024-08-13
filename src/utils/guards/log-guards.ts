import { MethodLog, Log, ObjectLog, ClassLog } from "../log.js";

export function methodLogGuard(log: Log): log is MethodLog {
    return log.kind == "method";
}
export function classLogGuard(log: Log): log is ClassLog {
    return log.kind == "class";
}

// export function functionLogGuard(log: Log): log is FunctionLog {
//     return log.kind == "function";
// }
export function objectLogGuard(log: Log): log is ObjectLog {
    return log.kind == "object";
}