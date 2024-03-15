import { describe } from "mocha";
import { ObjectTracker } from "./object-tracker.js";
import assert from "assert";
import { LoggerStateManager } from "../../state-manager/state-manager.js";
import { FunctionLog, ObjectLog } from "../../../index.js";

describe("ObjectTracker", function () {
    it("if object property changes, it should log its before and after", function () {
        const person: { name: string | undefined, email: null | string } = { name: undefined, email: null };
        const trackedPerson = ObjectTracker.track(person, { trackByName: 'test', expiresAfter: 2000 });
        person.name = 'tester';
        trackedPerson.email = 'test@test.test';
        assert(Object.values(LoggerStateManager.getFeatureSnapshot('test')!.map).length === 1);
        const emailLog = Object.values(LoggerStateManager.getFeatureSnapshot('test')!.map)[0];
        if (emailLog instanceof ObjectLog) {
            assert(emailLog.previousValue === null && emailLog.newValue === trackedPerson.email);
        }
        trackedPerson.name = 'other tester';
        assert(Object.values(LoggerStateManager.getFeatureSnapshot('test')!.map).length === 2);
        const nameLog = Object.values(LoggerStateManager.getFeatureSnapshot('test')!.map)[1]
        if (nameLog instanceof ObjectLog) {
            assert(nameLog.previousValue === 'tester' && nameLog.newValue === trackedPerson.name);
        }
    })

    it("if object method is called, it should log it as a function log", function () {
        const objectWithMethod: { someMethod(): string } = { someMethod() { return 'called' } };
        const trackedObjectWithMethod = ObjectTracker.track(objectWithMethod, { trackByName: 'test', expiresAfter: 2000 });
        trackedObjectWithMethod.someMethod();
        assert(Object.values(LoggerStateManager.getFeatureSnapshot('test')!.map).length === 1);
        const log = Object.values(LoggerStateManager.getFeatureSnapshot('test')!.map)[0];
        assert(log instanceof FunctionLog)
    })
});