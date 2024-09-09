export enum RegularLogKind {
    Function = "function",
    Object = "object",
}
export enum DecoratorLogKind {
    Method = "method",
    Property = "property",
    Constructor = "constructor"
}

export enum LogType {
    decorator = "decorator",
    regular = "regular"
}

export enum Errors {
    noPostCause = `MonitorOptions missing "post" property`,
    noPostMessage = `Add "post" property or set mode to: "local" or remove it entirely in MonitorOptions`,
}