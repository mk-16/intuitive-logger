import { Context, Done } from "mocha";
import { reduceParams } from "../reduce-params.js";

export const reduceRestParams = () => {
    return function (this: Context, done: Done) {
        const params = reduceParams([" ...rest"]);
        done();
    } as Mocha.Func
}
