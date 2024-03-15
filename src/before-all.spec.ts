import { after, before, beforeEach } from "mocha";
import { LoggerStateManager } from "./core/state-manager/state-manager.js";

beforeEach(function() {
    LoggerStateManager.cleanse()
});
afterEach(function() {
    LoggerStateManager.cleanse()
})
