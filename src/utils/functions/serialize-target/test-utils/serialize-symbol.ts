import { Context, Done } from "mocha";
import { serializeTarget } from "../serialize-target.js";
import { expect } from "chai";


export const serializeSymbol = (symbol: Symbol) => {
    return function (this: Context, done: Done) {
        expect(serializeTarget(symbol)).to.be.a('string').and.include('symbol$');
        done();
    } as Mocha.Func
}