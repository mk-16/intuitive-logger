import { Context, Done } from "mocha";
import { mapParams } from "../map-params.js";

export const combinedParams = () => {
    return function (this: Context, done: Done) {
        const params = mapParams(['first', ' { a', ' b }', ' [c', ' e]', ' ...rest']);
        done();
    } as Mocha.Func
}
