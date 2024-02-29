// import assert, { deepEqual } from "assert";
// import { describe } from "mocha";
// import { LoggerStateManager } from "./state-manager";

import { describe } from "mocha";
import { LoggerStateManager } from "./state-manager";

describe('StateManager', function () {
    it('initiate logs map', function () {
        const mockedKey = 'mock-key'
        LoggerStateManager.newMap(mockedKey);
    });
})
// describe('StateManager', function () {
//     // const mockedLog = new BaseLog(2);
//     // this.timeout(45 * 1000);
//     // this.slow(20 * 1000)
//     // it("state can be cleared", function (done) {
//     //     LoggerStateManager.clearState();
//     //     LoggerStateManager.getState().then((state) => {
//     //         deepEqual(state, {}, 'state is not empty');
//     //     }).then(done);
//     // })

//     it("setting a state key, sets the key with an empty array", function (done) {
//         LoggerStateManager.setKey('mock-key');
//         LoggerStateManager.getStateByUUID('mock-key').then((state) => {
//             deepEqual(state, [], 'state key is not empty');
//         }).then(done);
//     })

//     it("can update the state by providing an existing key and a Log object", function (done) {
//         LoggerStateManager.updateState('mock-key', mockedLog)
//         LoggerStateManager.getStateByUUID('mock-key').then((state) => {
//             deepEqual(state, [mockedLog], 'state update was not as expected');
//         }).then(done);
//         LoggerStateManager.updateState('not-a-key', mockedLog)
//         LoggerStateManager.getStateByUUID('not-a-key').then((state) => {
//             deepEqual(state, [mockedLog], 'state updated key that should not exist');
//         }).then(done);
//     })

//     it("reading the whole state provide nested frozen objects", function (done) {
//         LoggerStateManager.setKey('mock-second-key');
//         LoggerStateManager.updateState('mock-second-key', mockedLog)
//         LoggerStateManager.getState().then((state) => {
//             assert(Object.isFrozen(state), 'logs map is not frozen');
//             assert(Object.isFrozen(state['mock-key']), 'logs container is not frozen');
//             assert(Object.isFrozen(state['mock-key'][0]), 'log in container is not frozen');
//         }).then(done);
//     })

//     it("reading the state by UUID provides a frozen logs container with frozen logs", function (done) {
//         LoggerStateManager.getStateByUUID('mock-key').then((state) => {
//             assert(Object.isFrozen(state), 'logs container is not frozen');
//             assert(Object.isFrozen(state[0]), 'log in container is not frozen');
//         }).then(done);
//     })
// })