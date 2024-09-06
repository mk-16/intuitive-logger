import { Context, Done } from "mocha";
import { serializeTarget } from "../serialize-target.js";
import { expect } from "chai";

export const serializeUndefined = (target: undefined) => {
    return function (this: Context, done: Done) {
        expect(serializeTarget(target)).to.include('undefined$');
        done();
    } as Mocha.Func
}