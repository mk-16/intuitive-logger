// import { describe } from "mocha";
// import { Tracker } from "../tracker/tracker.js";

// describe("Object Tracker", function () {
//     it("tracks", function () {
//         const symbol = Symbol('key')
//         const symbol2 = Symbol('key')
//         const objectToTrack = { [0]: 1, b: 3, a: 1, [symbol]: 3, [2]: 'f' };
//         const objectTracker = new Tracker();
//         const trackedObject = objectTracker
//             .track(objectToTrack)
//             .track_keys('a')
//             .track_by_condition(() => true)
//         trackedObject.a;
//         trackedObject.a = 3;
//         console.log({trackedObject})
//     })
// })