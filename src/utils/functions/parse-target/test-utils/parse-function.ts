import { expect } from "chai";
import { Context, Done } from "mocha";
import { parseTarget } from "../parse-target.js";

export const parseFunction = (Fn: string) => {
    return function (this: Context, done: Done) {
        expect(parseTarget(Fn)).to.be.a('string').and.includes.oneOf(['function', '=>']);
        done();
    } as Mocha.Func
}