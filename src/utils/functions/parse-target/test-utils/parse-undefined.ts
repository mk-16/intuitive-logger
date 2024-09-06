import { Context, Done } from "mocha";
import { parseTarget } from "../parse-target.js";
import { expect } from "chai";

export const parseUndefined = (target: string) => {
    return function (this: Context, done: Done) {
        expect(parseTarget(target)).to.be.equal(undefined);
        done();
    } as Mocha.Func
}