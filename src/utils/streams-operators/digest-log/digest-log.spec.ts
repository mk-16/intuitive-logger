import { UUID, randomUUID } from "crypto";
import { describe } from "mocha";
import { of } from "rxjs";
import { LOG_LEVEL } from "../../models/enums/log-level/log-level.js";
import { BaseLog } from "../../models/logs/base-log/base-log.js";
import { FunctionLog } from "../../models/logs/function-log/function-log.js";
import { DigestedLog, DigestorInput, LoggerState } from "../../types/types.js";
import { digestLog } from "./digest-log.js";
import { expect } from "expect";
import assert from "assert";

describe("DigestLog", function () {
    it("digests logs", function () {
        const mockedLoggerState: LoggerState = new Map();
        mockedLoggerState.set('mocked-feature-key', { map: new Map(), expiresAfter: 5000, logContext: LOG_LEVEL.INFO });
        const mockedLog = new FunctionLog('mock time', [], undefined);
        of<DigestorInput>(['mocked-feature-key', mockedLog])
            .pipe(digestLog(mockedLoggerState))
            .subscribe(digestedLog => {
                if (digestedLog !== null) {
                    const [map, id, time] = digestedLog;
                    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
                    expect(id).toMatch(uuidPattern);
                    expect(time).toBe(5000);
                    expect(map.has(id)).toBeTruthy();
                    expect(map.get(id)).toEqual(mockedLog);
                }
            })

    })
});