// import assert from "assert";
// import { describe, it } from "mocha";
// import { LOG_LEVEL } from "../../utils/models/enums/log-level/log-level.js";
// import { FunctionLog } from "../../utils/models/logs/function-log/function-log.js";
// import { DigestorInput, LogsFeature } from "../../utils/types/types.js";
// import { LoggerStateManager } from "./state-manager.js";
// import { expect } from "expect";

// describe("StateManager", function () {
//     const mockedLogsFeature: Required<LogsFeature> = { trackByName: "test", expiresAfter: 1000, logContext: LOG_LEVEL.INFO };
//     it("can set the log's context", function () {
//         LoggerStateManager.addFeature(mockedLogsFeature);
//         const settedState = LoggerStateManager["state"].get("test");
//         assert(settedState?.expiresAfter === 1000);
//         assert(settedState?.logContext === LOG_LEVEL.INFO);
//         assert(settedState.map.size === 0);
//     });

//     it("provides a readonly state map", function () {
//         LoggerStateManager.addFeature({ trackByName: "test", expiresAfter: 3000, logContext: LOG_LEVEL.INFO });
//         const log = new FunctionLog("test time", [{ a: 1 }], undefined);
//         const log2 = new FunctionLog("test time", [], undefined);
//         LoggerStateManager.digestor$.next(["test", log]);
//         LoggerStateManager.digestor$.next(["test", log2]);
//         const stateLog = LoggerStateManager.snapshot;
//         assert(Object.getOwnPropertyNames(stateLog['test'].map).length === 2);
//         assert(Object.isFrozen(stateLog));
//         assert(Object.isFrozen(stateLog['test'].map));
//         Object.values(stateLog['test'].map).forEach(log => {
//             assert(Object.isFrozen(log));
//             assert(log instanceof FunctionLog);
//         })
//     });
//     it("provides a readonly logs (by feature name)", function () {
//         LoggerStateManager.addFeature({ trackByName: "test", expiresAfter: 3000, logContext: LOG_LEVEL.INFO });
//         const log = new FunctionLog("test time", [{ a: 1 }], undefined);
//         const log2 = new FunctionLog("test time", [], undefined);
//         LoggerStateManager.digestor$.next(["test", log]);
//         LoggerStateManager.digestor$.next(["test", log2]);
//         const featureLogs = LoggerStateManager.getFeatureSnapshot('test');
//         const invalidFeature = LoggerStateManager.getFeatureSnapshot('invalid');
//         expect(invalidFeature).toBeFalsy();
//         expect(featureLogs).toBeTruthy();
//         if (featureLogs) {
//             assert(Object.isFrozen(featureLogs));
//             assert(Object.isFrozen(featureLogs.expiresAfter));
//             assert(Object.isFrozen(featureLogs.logContext));
//             assert(Object.isFrozen(featureLogs.map));
//             Object.values(featureLogs.map).forEach(log => {
//                 assert(Object.isFrozen(log));
//                 assert(log instanceof FunctionLog)
//             })
//         }
//     });

//     it("cleanse itself after a set period of time", function (done) {
//         this.slow(2050)
//         LoggerStateManager.addFeature(mockedLogsFeature);
//         const mockedLog = new FunctionLog("test time", [], undefined);
//         const mockedDigestorInput: DigestorInput = ["test", mockedLog];
//         LoggerStateManager.digestor$.next(mockedDigestorInput);
//         assert(LoggerStateManager["state"].get("test")?.map.size === 1);
//         setTimeout(() => {
//             assert(LoggerStateManager["state"].get("test")?.map.size === 0);
//             done();
//         }, 1000);
//     })
//     it("it can be cleansed explicitly", function () {
//         LoggerStateManager.addFeature(mockedLogsFeature);
//         assert(LoggerStateManager.cleanse() === 0);
//     })
//     it("it can remove feature explicitly", function () {
//         const anotherMockedLogsFeature = { ...mockedLogsFeature, trackByName: "test2" };
//         LoggerStateManager.addFeature(mockedLogsFeature);
//         LoggerStateManager.addFeature(anotherMockedLogsFeature);
//         assert(LoggerStateManager.removeFeature("test") === 1);
//     })
// });