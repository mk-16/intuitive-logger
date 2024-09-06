import { Context, Done } from "mocha";
import { serializeTarget } from "../serialize-target.js";
import { expect } from "chai";

export const serializeString = (str: string) => {
    return function (this: Context, done: Done) {
        expect(serializeTarget(str)).to.be.a('string').and.to.include('string$');
        done();
    } as Mocha.Func
}