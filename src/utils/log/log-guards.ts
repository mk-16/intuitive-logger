import { Log, FunctionLog, ClassMethodLog, ObjectLog } from "./log.js";

export function functionLogGuard(log: Log): log is FunctionLog {
    return log.kind == "method" || log.kind == "class" || log.kind == "function";
}

// export function functionLogGuard(log: Log): log is FunctionLog {
//     return log.kind == "function";
// }
export function objectLogGuard(log: Log): log is ObjectLog {
    return log.kind == "object";
}