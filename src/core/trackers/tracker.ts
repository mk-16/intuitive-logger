// import { TrackerOptions, TrackingConfig } from "../interfaces/asd.js";
// import { ITracker } from "../interfaces/tracker.interface.js";

import { ITracker } from "../interfaces/tracker.interface.js"

// export class Tracker<T extends object> implements ITracker {
//     private getter<T>(target: T, property: keyof T, reciever: T) {

//     }
//     private setter<T>(target: T, property: keyof T, newValue: any, receiver: T) {
//         return target[property] = newValue;
//     }

//     // private target!: T;
//     // private config!: TrackingConfig; //add other places to get config?
//     // private keysToTrack = new Set<keyof T>();
//     constructor(target: T);
//     constructor(target: T, config?: TrackingConfig | undefined);
//     constructor(target: T, ...KeysToTrack: (keyof T)[]);
//     constructor(target: T, config: TrackingConfig, ...KeysToTrack: (keyof T)[]);
//     constructor(target: T, options?: unknown, ...rest: unknown[]) {
//         // this.target = target;
//         // return new Proxy(target, {
//         //     get: this.getter.bind(this),
//         //     set: this.setter.bind(this),
//         // })
//     }
// }
const c = new Proxy({ a: 4 }, {})
c.a = 3
// export class Tracker<T extends object> {
//     constructor(target: T) {
//         return target
//     }
// }
export class Tracker {
    static track<T extends object>(target: T): T {
        return new Proxy(target, {})
    }
}
// export function Tracker<T extends object>(): T {

// }