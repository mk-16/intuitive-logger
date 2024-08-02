import { describe } from "mocha";
import { Tracker } from "./tracker.js";

describe("Tracker", function () {
    it("tracks", function () {
        // const symbol = Symbol('')
        // const objectToTrack = { a: 1, b: 2, [symbol]: 3 };
        // const tracker = new Tracker(objectToTrack);
        // // const trackedObject = tracker.track(objectToTrack);

    })

    it("check proxy", function () {
        const tracked = Tracker.track({});
        
        // const foo = new Proxy(function (..._: any[]) {
        //     console.log("wtf")
        // }, {
        //     apply(target, thisArg, argArray) {
        //         console.log(arguments)
        //     },
        //     construct(target, argArray, newTarget) {
        //         console.log(arguments)
        //         return target
        //     },
        // })
        // foo.bind(this)(1, 2, 3,);
    
    })
})