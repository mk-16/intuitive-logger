import { Context, Done } from "mocha";
import { parseTarget } from "../parse-target.js";
import { expect } from "chai";

export const parseString = (str: string) => {
    return function (this: Context, done: Done) {
        expect(parseTarget(str)).to.be.a('string');
        done();
    } as Mocha.Func
}