import { Context, Done } from "mocha";
import { mapParams } from "../map-params.js";

export const restParams = () => {
    return function (this: Context, done: Done) {
        const params = mapParams([" ...rest"]);
        done();
    } as Mocha.Func
}
