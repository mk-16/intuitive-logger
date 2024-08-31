import { Context, Done } from "mocha";
import { extractParams } from "../extract-params.js";

export const constructorParams = () => {
    return function (this: Context, done: Done) {

        const anonymousClassExpression = class {
            set setter(value: string) { }
            getter(param2: 3) { }
            constructor(first: any, { a, b }: { a: any, b: any }, [c, e]: any[], ...rest: any[]) { }
            method(param: 1) { }
        }
        const params = extractParams(anonymousClassExpression.toString());
        done();
    } as Mocha.Func
}
