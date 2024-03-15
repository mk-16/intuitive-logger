import { Func, describe } from "mocha";
import { FunctionTracker } from "./function-tracker.js";
import { LoggerStateManager } from "../../state-manager/state-manager.js";
import { FunctionLog, LOG_LEVEL } from "../../../index.js";
import assert from "assert";
import { BaseLog } from "../../../utils/models/logs/base-log/base-log.js";

describe("FunctionTracker", function () {
    const inputs = [1, 3, ['hello', { name: 'world' }, new Map().set('key', 'item')]];
    function mockSyncFunction(..._: any) {
        return { someOutput: 'test output' };
    }

    function mockAsyncFunction(..._: any) {
        return new Promise<{ someOutput: string }>((resolve) => {
            setTimeout(() => {
                resolve({ someOutput: 'test output' });
            }, 500)
        })
    }

    function hasExpectedInstance(target: BaseLog): target is FunctionLog {
        return target instanceof FunctionLog;
    }

    function stringifyedInputsMatch(target: FunctionLog) {
        return JSON.stringify(target.inputs) === JSON.stringify(inputs);
    }
    function inputsDoNotMatch(log: FunctionLog) {
        return inputs !== log.inputs;
    }
    function hasExecutionTime(log: FunctionLog) {
        return log.executionTime.includes('ms');
    }
    function tracesTheRightFile(log: BaseLog) {
        return log.trace.includes('function-tracker.spec.ts');
    }

    it("tracks functions inputs", function () {
        const trackedSyncFunction = FunctionTracker.track(mockSyncFunction, { trackByName: 'sync mock', expiresAfter: 2000, logContext: LOG_LEVEL.DEBUG });
        trackedSyncFunction(...inputs);
        const functionLog = Object.values(LoggerStateManager.getFeatureSnapshot('sync mock')!.map)[0];
        assert(hasExpectedInstance(functionLog));
        assert(stringifyedInputsMatch(functionLog));
        assert(inputsDoNotMatch(functionLog));
    })

    it("tracks functions ouput", function () {
        const trackedSyncFunction = FunctionTracker.track(mockSyncFunction, { trackByName: 'sync mock', expiresAfter: 2000, logContext: LOG_LEVEL.DEBUG });
        const output = trackedSyncFunction(inputs);
        const functionLog = Object.values(LoggerStateManager.getFeatureSnapshot('sync mock')!.map)[0];
        assert(functionLog instanceof FunctionLog && JSON.stringify(functionLog.output) === JSON.stringify(output));
        assert(hasExpectedInstance(functionLog));
        const stringifyedOutputMatch = JSON.stringify(functionLog.output) === JSON.stringify(output);
        const outputsDoNotMatch = inputs !== functionLog.inputs;
        assert(stringifyedOutputMatch && outputsDoNotMatch);
    })

    it("tracks functions execution time", function () {
        const trackedSyncFunction = FunctionTracker.track(mockSyncFunction, { trackByName: 'sync mock', expiresAfter: 2000, logContext: LOG_LEVEL.DEBUG });
        trackedSyncFunction(inputs);
        const functionLog = Object.values(LoggerStateManager.getFeatureSnapshot('sync mock')!.map)[0];
        assert(hasExpectedInstance(functionLog));
        assert(hasExecutionTime(functionLog));
    });

    it("tracks functions invocation location", function () {
        const trackedSyncFunction = FunctionTracker.track(mockSyncFunction, { trackByName: 'sync mock', expiresAfter: 2000, logContext: LOG_LEVEL.DEBUG });
        trackedSyncFunction(inputs);
        const functionLog = Object.values(LoggerStateManager.getFeatureSnapshot('sync mock')!.map)[0];
        assert(tracesTheRightFile(functionLog));
    })

    it("does all previous test with an async function", function (done) {
        this.slow(1250)
        const trackedAsyncFunction = FunctionTracker.track(mockAsyncFunction, { trackByName: 'async mock', expiresAfter: 2000, logContext: LOG_LEVEL.DEBUG });
        const output = trackedAsyncFunction(...inputs);
        const noneExistantLog = Object.values(LoggerStateManager.getFeatureSnapshot('async mock')!.map)[0];
        assert(noneExistantLog === undefined);
        if (output instanceof Promise) {
            output.then(result => {
                const functionLog = Object.values(LoggerStateManager.getFeatureSnapshot('async mock')!.map)[0]
                assert(hasExpectedInstance(functionLog));
                assert(stringifyedInputsMatch(functionLog));
                assert(inputsDoNotMatch(functionLog));
                assert(hasExecutionTime(functionLog));
                const stringifyedOutputMatch = JSON.stringify(functionLog.output) === JSON.stringify(result);
                const outputsDoNotMatch = result !== functionLog.output;
                assert(stringifyedOutputMatch && outputsDoNotMatch);
                done();
            })
        }
    })
});