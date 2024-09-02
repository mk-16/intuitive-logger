import { Context, Done } from "mocha";
import { reduceParams } from "../reduce-params.js";

export const reduceCombinedParams = () => {
    return function (this: Context, done: Done) {
        const params = reduceParams(['first', ' { a', ' b }', ' [c', ' e]', ' ...rest']);
        done();
    } as Mocha.Func
}
