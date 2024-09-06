import { Context, Done } from "mocha";
import { parseTarget } from "../parse-target.js";
import { expect } from "chai";


export const parseNumber = (num: string) => {
    return function (this: Context, done: Done) {
        expect(parseTarget(num)).to.be.a('number');
        done();
    } as Mocha.Func
}