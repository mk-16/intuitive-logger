import { before, beforeEach } from "mocha";
import { LoggerStateManager } from "./core/state-manager/state-manager.js";

before(() => {
    console.log('before all test files')
})
beforeEach(() => {
    LoggerStateManager.cleanse()
})