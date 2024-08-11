export function inferDecorator(...args: any[]) {
    Reflect.defineMetadata("design:kind",
        args.length == 2 && typeof args[1] == "object" ?
            "modern-decorator" : "legacy-decorator"
        , args[0])
}