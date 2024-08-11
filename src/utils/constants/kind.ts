import { inferDecorator } from "../decorator/infer/infer-decorator.js";
@inferDecorator
class Defer { }
export const kind: "modern-decorator" | "legacy-decorator" = Reflect.getMetadata("design:kind", Defer);
