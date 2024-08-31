import { Context, Done } from "mocha";
import { mapParams } from "../map-params.js";

export const objectParams = () => {
    return function (this: Context, done: Done) {
        const params = mapParams([' { a', ' b',' c }']);
        done();
    } as Mocha.Func
}
