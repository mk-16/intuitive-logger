import { Context, Done } from "mocha";
import { parseTarget } from "../parse-target.js";
import { expect } from "chai";


export const parseSymbol = (symbol: string) => {
    return function (this: Context, done: Done) {
        expect(parseTarget(symbol)).to.be.a('symbol');
        done();
    } as Mocha.Func
}