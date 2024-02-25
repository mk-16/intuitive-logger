import { deepEqual } from "assert";
import { describe } from "mocha";

import { ObjectLog } from "./object-log";

describe("ObjectLog", () => {
    const log = new ObjectLog(33, 44);
    it("initialized correctly", () => {
        deepEqual(log.previousValue, 33, 'previous value not as expected');
        deepEqual(log.updatedValue, 44, 'updated value is not as expected');
    });
})