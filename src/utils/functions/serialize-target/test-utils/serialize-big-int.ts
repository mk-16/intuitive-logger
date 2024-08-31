import { expect } from "chai";
import { Context, Done } from "mocha";
import { serializeTarget } from "../serialize-target.js";

export const serializeBigInt = (bigInt: bigint) => {
    return function (this: Context, done: Done) {
        expect(serializeTarget(bigInt)).to.be.a('string').and.to.include('n');
        done();
    } as Mocha.Func
}