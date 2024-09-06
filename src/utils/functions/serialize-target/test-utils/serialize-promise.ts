import { Context, Done } from "mocha";
import { serializeTarget } from "../serialize-target.js";
import { expect } from "chai";

export const serializePromise = (promise: Promise<unknown>) => {
    return function (this: Context, done: Done) {
        expect(serializeTarget(promise)).to.be.a('string').to.include('promise$');
        done();
    } as Mocha.Func
}
