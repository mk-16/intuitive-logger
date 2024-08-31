import { Context, Done } from "mocha";
import { mapParams } from "../map-params.js";

export const regularParams = () => {
    return function (this: Context, done: Done) {
        const params = mapParams(["first"]);
        done();
    } as Mocha.Func
}
