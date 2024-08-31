import { Context, Done } from "mocha";
import { extractParams } from "../extract-params.js";

export const functionExpressionParams = () => {
    return function (this: Context, done: Done) {

        const functionExpression = function (first: any, { a, b }: { a: any, b: any }, [c, e]: any[], ...rest: any[]) { }
        const params = extractParams(functionExpression.toString());
        done();
    } as Mocha.Func
}
