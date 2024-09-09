export function setRuntime<T extends { endTime?: number, startTime?: number }>(target: T): `${number}ms` {
    return `${parseFloat(((target.endTime ?? 0) - (target.startTime ?? 0)).toFixed(4))}ms`;
}