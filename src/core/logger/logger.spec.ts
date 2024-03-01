import { describe } from "mocha";
import { expect } from "expect";
import { Logger } from "./logger.js";


describe("Logger", () => {
    it("open creates a worker", () => {
        const functionToTrack = (a: number, b: number) => { return a + b };
        Logger.track(functionToTrack)
        // expect().toBe(true);
    })
});