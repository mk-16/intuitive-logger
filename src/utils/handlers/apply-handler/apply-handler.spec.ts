import { afterEach, beforeEach, Context, describe, Done, it } from "mocha";
import { LoggerWorker } from "../../../worker/main/main-worker.js";
import { applyHandler } from "./apply-handler.js";


export const emptyLambdaMochaFn = <T>(...args: any[]) => {
    return function (this: Context, done: Done) {
        LoggerWorker.logStream.subscribe(log => {
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
    it('Generate the expected log for lambda function: const target = () => {}', emptyLambdaMochaFn((param: { a: 1, b: 3 }, anotherParam: { something: any }, ...rest: any[]) => 3, [{ a: 1, b: 3 }, { something: new Promise(() => { }) }, 2, [1, 2, 3]]))
}

export const applyHandlerSpec = () => describe('Apply handler', suitFn);
