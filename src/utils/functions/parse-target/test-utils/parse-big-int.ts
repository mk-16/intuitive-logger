import { expect } from "chai";
import { Context, Done } from "mocha";
import { parseTarget } from "../parse-target.js";

export const parseBigInt = (bigInt: string) => {
    return function (this: Context, done: Done) {
        expect(parseTarget(bigInt)).to.be.a('bigint');
        done();
    } as Mocha.Func
}