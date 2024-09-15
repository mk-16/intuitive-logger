
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

export enum PostModes {
    local = "local",
    network = "network",
    user = "user",
    both = "both"
}

export enum AsyncModes {
    invocation = "invocation",
    results = "results",
    both = "both"
}

export enum KeysToHide {
    level = "level",
    tag = "tag",
    post = "post",
    mode = "mode",
    environments = "environments",
    extension = "extension",
    async = "async",
    context = "context",
    hide = "hide",

    name = "name",
    date = "date",
    stack = "stack",
    serializedData = "serializedData",
    startTime = "startTime",
    endTime = "endTime",
    serializedInputs = "serializedInputs",
    serializedOutput = "serializedOutput",
    inputs = "inputs",
    output = "output",
    options = "options",
    runtime = "runtime",
    source = "source",

    previousPropertyDescriptor = "previousPropertyDescriptor",
    currentPropertyDescriptor = "currentPropertyDescriptor",

    previousValue = "previousValue",
    currentValue = "currentValue",

    scope = "scope",
}
