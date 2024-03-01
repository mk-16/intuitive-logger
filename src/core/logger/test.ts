import { Logger } from "./logger.js";

class TEST {
    public a: number = 1;
    public b: number = 2;
    public c: number = 3;
    /**
     * name
     */
    @Logger.decorate()
    public name() {

    }
}

const functionToTrack = (a: number, b: number) => { return a + b };

functionToTrack(1, 2)