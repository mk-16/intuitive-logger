import { MethodLog, Log, ObjectLog } from "../log.js";

export function functionLogGuard(log: Log): log is MethodLog {
    return log.kind == "method";
}

// export function functionLogGuard(log: Log): log is FunctionLog {
//     return log.kind == "function";
// }
export function objectLogGuard(log: Log): log is ObjectLog {
    return log.kind == "object";
}