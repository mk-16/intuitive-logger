import { Context, Done } from "mocha";
import { extractParams } from "../extract-params.js";

export const generatorFunctionExpressionParams = () => {
    return function (this: Context, done: Done) {

        const generatorFunctionExpression = function* (first: any, { a, b }: { a: any, b: any }, [c, e]: any[], ...rest: any[]) { }
        const params = extractParams(generatorFunctionExpression.toString());
        done();
    } as Mocha.Func
}
