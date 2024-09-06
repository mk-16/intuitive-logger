import { Context, Done } from "mocha";
import { parseTarget } from "../parse-target.js";
import { expect } from "chai";

export const parsePromise = (promise: string) => {
    return function (this: Context, done: Done) {
        expect(parseTarget(promise)).to.be.a('string').and.equal('Promise');
        done();
    } as Mocha.Func
}
