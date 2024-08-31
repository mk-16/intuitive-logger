import { expect } from "chai";
import { afterEach, beforeEach, Context, describe, Done, it } from "mocha";
import { LoggerWorker } from "../../../worker/main/main-worker.js";
import { applyHandler } from "./apply-handler.js";


export const emptyLambdaMochaFn = <T>(...args: any[]) => {
    return function (this: Context, done: Done) {
        LoggerWorker.logStream.subscribe(log => {
            expect(log).to.be.an('object');
            expect(log).to.have.property('kind').equal('function');
            expect(log).to.have.property('stack').to.be.a('string').and.to.include(import.meta.filename.split("\\").pop());
            expect(log).to.have.property('startTime').to.be.a('number');
            expect(log).to.have.property('endTime').to.be.a('number');
            done();
        })
        applyHandler(args[0], {}, args[1]);
    } as Mocha.Func
}
function suitFn(this: Mocha.Suite) {

    beforeEach('cleaning', function (this: Context, done: Done) {
        done()
    });
    afterEach('cleaning', function (this: Context, done: Done) {
        done();
    });
    it('Generate the expected log for lambda function:     const target = () => {}', emptyLambdaMochaFn((param: 1) => 3,  [1, 3, 2]))
}

export const applyHandlerSpec = () => describe('Apply handler', suitFn);
