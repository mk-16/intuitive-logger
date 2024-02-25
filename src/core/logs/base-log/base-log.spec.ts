import assert, { deepEqual, deepStrictEqual, equal, strictEqual } from "assert";
import { describe } from "mocha";
import expect from 'expect';
import { BaseLog } from "./base-log";

describe("BaseLog", () => {
    const log = new BaseLog(2);
    const currentDate = new Date();
    it("initialized correctly", () => {
        const delta = currentDate.getTime() - log.date.getTime();
        expect(delta).toBeLessThanOrEqual(1000);
        expect(delta).toBeGreaterThanOrEqual(0);
        assert(log.trace.includes('base-log.spec.ts'), 'trace does not show the right location')
    });
})