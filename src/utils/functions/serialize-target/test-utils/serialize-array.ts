import { Context, Done } from "mocha";
import { serializeTarget } from "../serialize-target.js";
import { expect } from "chai";

export const serializeArray = (arr: unknown[]) => {
    return function (this: Context, done: Done) {
        const results = serializeTarget(arr);
        // console.log({ results })
        expect(results).to.be.a('string').and.to.include('array$');
        // expect(JSON.parse(results)).to.be.an('array');
        // expect(JSON.parse(results)).to.have.lengthOf(arr.length);
        // expect(JSON.parse(results)).to
        //     .satisfy((array: unknown[]) => array.every(element => expect(element).to.be.a('string')))
        done();
    } as Mocha.Func
}
