import { Context, Done } from "mocha";
import { serializeTarget } from "../serialize-target.js";
import { expect } from "chai";


export const serializeNumber = (num: number) => {
    return function (this: Context, done: Done) {
        expect(serializeTarget(num)).to.be.a('string');
        done();
    } as Mocha.Func
}