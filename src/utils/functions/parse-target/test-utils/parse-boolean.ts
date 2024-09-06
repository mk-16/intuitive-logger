import { Context, Done } from "mocha";
import { parseTarget } from "../parse-target.js";
import { expect } from "chai";

export const parseBoolean = (bool: string) => {
    return function (this: Context, done: Done) {
        expect(parseTarget(bool)).to.be.a('boolean').and.oneOf([true, false]);
        done();
    } as Mocha.Func
}