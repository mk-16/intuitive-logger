export function functionLogGuard(log) {
    return log.kind == "method" || log.kind == "class" || log.kind == "function";
}
export function objectLogGuard(log) {
    return log.kind == "object";
}
//# sourceMappingURL=log-guards.js.map