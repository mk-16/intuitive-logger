import { describe } from "mocha";
import { LoggerStateManager } from "../state-manager/state-manager";
import { Logger } from "./logger";

describe('Logger', function () {
    it('logs function calls', function (done) {
        LoggerStateManager.clearState();
        function syncFunc(a: string, b: boolean, c: number) {
            return { a, b, c };
        }
        const syncFunction = Logger.track(syncFunc);
        syncFunction('1', true, 3);
        LoggerStateManager.getStateByUUID(syncFunc.name).then(state => {
            const log = state[0];
            // console.log({ functionLog: log instanceof FunctionLog, baseLog: log instanceof BaseLog, objectLog: log instanceof ObjectLog })
            // assert(state[0] instanceof FunctionLog)
            done();
        })
    })
});