import { expect } from "chai";
import { Context, Done } from "mocha";
import { serializeTarget } from "../serialize-target.js";

export const serializeFunction = (Fn: Function) => {
    return function (this: Context, done: Done) {
        expect(serializeTarget(Fn)).to.be.a('string').and.includes.oneOf(['function', '=>']);
        done();
    } as Mocha.Func
}