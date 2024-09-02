import { Context, Done } from "mocha";
import { reduceParams } from "../reduce-params.js";

export const reduceArrayParams = () => {
    return function (this: Context, done: Done) {
        const params = reduceParams([' [a', ' b ', ' c]']);
        done();
    } as Mocha.Func
}
