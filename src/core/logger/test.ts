import { Logger } from "./logger.js";

class TEST {
    public a: number = 1;
    public b: number = 2;
    public c: number = 3;
    /**
     * name
     */
    public name() {

    }
}

const functionToTrack = (a: number, b: number) => { return a + b };

const tracked = Logger.track(functionToTrack)