import { Context, Done } from "mocha";
import { extractParams } from "../extract-params.js";

export const lambdaParams = () => {
    return function (this: Context, done: Done) {

        const lambdaExpression = (first: any, { a, b }: { a: any, b: any }, [c, e]: any[], ...rest: any[]) => { }
        const params = extractParams(lambdaExpression.toString());

        done();
    } as Mocha.Func
}
