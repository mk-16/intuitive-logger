import { Context, Done } from "mocha";
import { reduceParams } from "../reduce-params.js";

export const reduceRegularParams = () => {
    return function (this: Context, done: Done) {
        const params = reduceParams(["first"]);
        done();
    } as Mocha.Func
}
