import { UUID, randomUUID } from "crypto";
import { describe } from "mocha";
import { Subject, of, takeUntil } from "rxjs";
import { BaseLog } from "../../models/logs/base-log/base-log.js";
import { FunctionLog } from "../../models/logs/function-log/function-log.js";
import { DigestedLog } from "../../types/types.js";
import { digestedLogHandler } from "./digested-log-handler.js";
import assert from "assert";

describe("DigestedLogHandler", function () {
    it("handles digested logs", function (done) {
        const mockedLogID = randomUUID();
        const mockLog = new FunctionLog('mock time', [], undefined);
        const mockedLogsMap = new Map<UUID, BaseLog>().set(mockedLogID, mockLog);
        const mockedInput: DigestedLog = [mockedLogsMap, mockedLogID, 1000];
        this.slow(2050);
        const stop$ = new Subject<void>();
        of(mockedInput).pipe(digestedLogHandler, takeUntil(stop$)).subscribe(() => {
            assert(!mockedLogsMap.has(mockedLogID));
            stop$.next();
            done();
        })
    })
});