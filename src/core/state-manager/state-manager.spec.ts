import assert, { deepEqual } from "assert";
import { describe } from "mocha";
import { BaseLog } from "../logs/base-log/base-log";
import { LoggerStateManager } from "./state-manager";

describe('StateManager', () => {
    const mockedLog = new BaseLog(2);

    it("state can be cleared", () => {
        LoggerStateManager.clearState();
        deepEqual(LoggerStateManager.getImmidiateState(), {}, 'state is not empty');
    })

    it("setting a state key, sets the key with an empty array", () => {
        LoggerStateManager.setKey('mock-key');
        deepEqual(LoggerStateManager.getImmidiateStateByUUID('mock-key'), [], 'state key is not empty');
    })

    it("can update the state by providing an existing key and a Log object", () => {
        LoggerStateManager.updateState('mock-key', mockedLog)
        deepEqual(LoggerStateManager.getImmidiateStateByUUID('mock-key'), [mockedLog], 'state update was not as expected');

        LoggerStateManager.updateState('not-a-key', mockedLog)
        deepEqual(LoggerStateManager.getImmidiateState(), { 'mock-key': [mockedLog] }, "state updated key that should not exist");
    })

    it("reading the whole state provides an immutable object", () => {
        LoggerStateManager.setKey('mock-second-key');
        LoggerStateManager.updateState('mock-second-key', mockedLog)
        const state = LoggerStateManager.getImmidiateState();
        assert(Object.isFrozen(state), 'state is not frozen');
        assert(Object.isFrozen(state['mock-key']), 'state item is not frozen');
        assert(Object.isFrozen(state['mock-key'][0]), 'state item array element is not frozen');
    })

    it("reading the state by UUID provides an immutable object", () => {
        const state = LoggerStateManager.getImmidiateStateByUUID('mock-key');
        assert(Object.isFrozen(state), 'state item is not frozen');
        assert(Object.isFrozen(state[0]), 'state item array element is not frozen');
    })
})