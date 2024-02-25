import { deepEqual, equal } from "assert";
import { describe } from "mocha";

import { FunctionLog } from "./function-log";

describe("FunctionLog", () => {
    const log = new FunctionLog(1000, 3000, [1, 'hello', false], null);
    it("initialized correctly", () => {
        equal(log.executionTime, '2000.0000 ms', 'execution time is not the same as the one passed');
        deepEqual(log.inputs, [1, 'hello', false], 'input is not the same as the one passed');
        equal(log.output, null, 'output is not the same as the one passed');
    });
})