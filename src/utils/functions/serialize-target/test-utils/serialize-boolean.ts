import { Context, Done } from "mocha";
import { serializeTarget } from "../serialize-target.js";
import { expect } from "chai";

export const serializeBoolean = (bool: boolean) => {
    return function (this: Context, done: Done) {
        expect(serializeTarget(bool)).to.be.a('string').and.oneOf(['boolean$true', 'boolean$false']);
        done();
    } as Mocha.Func
}