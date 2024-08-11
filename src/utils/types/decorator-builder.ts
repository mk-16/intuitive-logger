export type DecoratorBuilder = {
    build(kind: "legacy-decorator" | "modern-decorator"): any;
}