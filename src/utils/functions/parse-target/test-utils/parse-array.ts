import { Context, Done } from "mocha";
import { parseTarget } from "../parse-target.js";
import { expect } from "chai";

export const parseArray = (arr: string) => {
    return function (this: Context, done: Done) {
        const results = parseTarget(arr);
        expect(results).to.be.an('array');
        done();
    } as Mocha.Func
}
