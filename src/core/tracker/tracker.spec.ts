import assert, { deepEqual } from "assert";
import { describe } from "mocha";
import { LoggerStateManager } from "../state-manager/state-manager";
import { Tracker } from "./tracker";

describe('Tracker', function () {
    before(function () {
        LoggerStateManager.clearState();
    });
    it('tracks objects', function (done) {
        const objectToTrack = { a: 1, b: 2, c: 3 };
        const trackedObject = Tracker.trackObject(objectToTrack, { uuid: 'mocked-key' });
        trackedObject.a = 2;
        trackedObject.b = 3;
        trackedObject.c = 4;
        deepEqual(trackedObject, objectToTrack);
        LoggerStateManager.getStateByUUID('mocked-key').then((state) => {
            assert.equal(state.length, 3)
            done();
        })
    });

    it('tracks sync functions', function (done) {
        function syncFunc(a: string, b: boolean, c: number) {
            return { a, b, c };
        }
        const trackedFunction = Tracker.trackFunction(syncFunc);
        trackedFunction('1', true, 3);
        LoggerStateManager.getStateByUUID(syncFunc.name).then(state => {
            assert.equal(state.length, 1)
            done();
        })
    });

    it('tracks async functions', function (done) {
        this.slow(3100);
        this.timeout(4000);
        async function asyncFunc(a: string, b: boolean, c: number) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ a, b, c });
                }, 1500);
            });
        }
        const trackedFunction = Tracker.trackFunction(asyncFunc);
        trackedFunction('1', true, 3);
        trackedFunction('1', true, 3);
        LoggerStateManager.getStateByUUID(asyncFunc.name).then(state => {
            // assert.equal(state.length, 2)
            console.log(state)
            done();
        })
    });
});